export type Bi = { en: string; id: string }

export type FeaturedItem = {
  img: number
  tag: Bi
  tagVariant: 'tomato' | 'teal' | 'gold'
  name: Bi
  desc: Bi
  price: string
}

export type DaypartItem = {
  img: number
  time: string
  name: Bi
  desc: Bi
  accent: 'gold' | 'teal' | 'tomato'
}

export type GallerySlide = { img: number; caption: Bi }

export type Review = { img: number; name: string; role: Bi; quote: Bi }

export const marqueeItems: string[] = [
  'Kopi fresh tiap hari', 'Wifi kenceng', 'Live music Jum–Sab',
  '100% Halal', 'Pet friendly', 'Colokan di tiap meja',
  'Buka sampai tengah malam', 'Ada rooftop',
]

export const featured: FeaturedItem[] = [
  { img: 851555,  tag: { en: 'Signature',   id: 'Andalan' },      tagVariant: 'tomato', name: { en: 'Palm Sugar Iced Latte', id: 'Es Kopi Susu Gula Aren' }, desc: { en: 'Espresso, fresh milk & house palm-sugar syrup.',    id: 'Espresso, susu segar & sirup gula aren rumahan.' },   price: '28K' },
  { img: 312418,  tag: { en: 'Hot',         id: 'Panas' },        tagVariant: 'gold',   name: { en: 'Cappuccino',            id: 'Cappuccino' },             desc: { en: 'Double shot with silky steamed milk.',             id: 'Double shot dengan steamed milk lembut.' },           price: '30K' },
  { img: 6802983, tag: { en: 'Non-coffee',  id: 'Tanpa kopi' },   tagVariant: 'teal',   name: { en: 'Matcha Latte',          id: 'Matcha Latte' },           desc: { en: 'Ceremonial-grade matcha, hot or iced.',            id: 'Matcha grade upacara, panas atau dingin.' },           price: '33K' },
  { img: 3171134, tag: { en: 'Kitchen',     id: 'Dapur' },        tagVariant: 'tomato', name: { en: 'Concept Fried Rice',    id: 'Nasi Goreng Konsep' },     desc: { en: 'Smoky fried rice, fried egg & house sambal.',      id: 'Nasi goreng smoky, telur ceplok & sambal rumahan.' }, price: '38K' },
  { img: 1267320, tag: { en: 'Mains',       id: 'Makanan' },      tagVariant: 'gold',   name: { en: 'Chicken Katsu Curry',   id: 'Kari Katsu Ayam' },        desc: { en: 'Crispy katsu over Japanese curry & rice.',         id: 'Katsu renyah dengan kari Jepang & nasi.' },           price: '45K' },
  { img: 2074130, tag: { en: 'Bakery',      id: 'Roti' },         tagVariant: 'teal',   name: { en: 'Butter Croissant',      id: 'Croissant Mentega' },      desc: { en: 'Baked fresh every morning. Flaky, buttery.',       id: 'Dipanggang fresh tiap pagi. Renyah, gurih.' },        price: '26K' },
]

export const dayparts: DaypartItem[] = [
  { img: 2074130, time: '07.00 – 11.00', name: { en: 'Morning',   id: 'Pagi' },  desc: { en: 'Breakfast & your first brew', id: 'Sarapan & kopi pertama' },  accent: 'gold' },
  { img: 5379707, time: '11.00 – 17.00', name: { en: 'Afternoon', id: 'Siang' }, desc: { en: 'Lunch & laptop hours',        id: 'Makan siang & jam kerja' }, accent: 'teal' },
  { img: 1058277, time: '17.00 – 23.00', name: { en: 'Evening',   id: 'Malam' }, desc: { en: 'Dinner & live music',         id: 'Makan malam & live music' },accent: 'tomato' },
]

export const gallery: GallerySlide[] = [
  { img: 1307698, caption: { en: 'Main hall',       id: 'Ruang utama' } },
  { img: 5379707, caption: { en: 'The green corner', id: 'Pojok hijau' } },
  { img: 2074130, caption: { en: 'Breakfast table',  id: 'Meja sarapan' } },
  { img: 851555,  caption: { en: 'The coffee bar',   id: 'Bar kopi' } },
  { img: 1058277, caption: { en: 'Weekend nights',   id: 'Malam minggu' } },
  { img: 1153369, caption: { en: 'Fresh plates',     id: 'Menu sehat' } },
  { img: 6802983, caption: { en: 'A cozy nook',      id: 'Sudut santai' } },
]

export const reviews: Review[] = [
  { img: 887827,  name: 'Dinda P.',       role: { en: 'Regular', id: 'Pelanggan tetap' }, quote: { en: 'My favorite work spot. Killer coffee and seriously fast wifi — I get more done here than at the office.',             id: 'Tempat favorit buat kerja. Kopinya juara, wifinya kenceng banget — malah lebih produktif di sini daripada di kantor.' } },
  { img: 7438099, name: 'Rangga S.',      role: { en: 'Foodie',  id: 'Pencinta kuliner' },quote: { en: 'The fried rice is addictive and the price is still easy on the wallet. My go-to dinner now.',                        id: 'Nasi gorengnya bikin nagih dan harganya masih masuk akal buat kantong. Sekarang langganan makan malam.' } },
  { img: 6802983, name: 'Aisyah & Tomi', role: { en: 'Family',  id: 'Keluarga' },        quote: { en: 'Perfect for families. The kids are happy, the staff are lovely, and there is something for everyone.',                id: 'Cocok banget buat keluarga. Anak-anak betah, stafnya ramah, dan menunya lengkap buat semua.' } },
]
