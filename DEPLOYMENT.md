# Deployment Guide — Concept Cafe

Static site built with Next.js → exported to `out/` → uploaded to VPS via SFTP.

---

## Prerequisites

- Node.js + npm installed locally
- [FileZilla](https://filezilla-project.org/) (or any SFTP client) installed
- VPS SFTP credentials: host, port (default: 22), username, password or SSH key

---

## 1. Build

Run locally to produce the `out/` folder:

```bash
npm run build
```

Confirm `out/` contains: `index.html`, `_next/`, `menu/`, `404.html`, `icon.svg`, `icon.png`, `apple-icon.png`.

> `out/` is gitignored — it only exists locally after a build.

---

## 2. First Deploy

### 2a. Upload files via FileZilla

1. Open FileZilla → **File → Site Manager → New Site**
2. Set Protocol: **SFTP – SSH File Transfer Protocol**
3. Fill in Host, Port (22), Username, and Password/Key → **Connect**
4. In the **remote panel** (right side), navigate to `/var/www/`
5. Right-click → **Create directory** → name it `concept-cafe`
6. Navigate into `/var/www/concept-cafe/`
7. In the **local panel** (left side), navigate to your project's `out/` folder
8. Select all contents of `out/` (**Ctrl+A**) → drag to remote panel or right-click → **Upload**
9. Wait for all transfers to complete

### 2b. Configure nginx

SSH into your VPS and create/edit the nginx site config:

```bash
sudo nano /etc/nginx/sites-available/concept-cafe
```

Paste this config (replace `your-subdomain.example.com` with your actual subdomain):

```nginx
server {
    listen 80;
    server_name your-subdomain.example.com;

    root /var/www/concept-cafe;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site and reload nginx:

```bash
sudo ln -s /etc/nginx/sites-available/concept-cafe /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 2c. Enable HTTPS with Certbot

```bash
sudo certbot --nginx -d your-subdomain.example.com
```

Certbot patches the nginx config to add `listen 443 ssl`, inserts certificate paths, and adds an HTTP→HTTPS redirect. Renewal runs automatically.

---

## 3. Re-deploy After Changes

1. Edit source files locally
2. Run `npm run build` — fresh `out/` is generated
3. Open FileZilla, connect to VPS
4. In the **remote panel**, navigate to `/var/www/concept-cafe/`
5. Select **all** files and folders → right-click → **Delete**
   *(Clears stale `_next/` hashed chunks from previous builds)*
6. In the **local panel**, navigate to `out/`, select all → **Upload**
7. Wait for transfer to complete → verify in browser

---

## 4. Verify

- Open `https://your-subdomain.example.com` — confirm padlock (HTTPS)
- Navigate to `/menu/` — confirm menu page loads
- Open browser DevTools → Network tab → confirm `_next/static/` assets return **200**
