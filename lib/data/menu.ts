import type { Bi } from './content'

export type TagKey = 'best' | 'new' | 'spicy' | 'veg' | 'sweet'

export const TAG_META: Record<TagKey, Bi & { variant: 'tomato' | 'teal' | 'gold' }> = {
  best:  { en: 'Bestseller', id: 'Terlaris',  variant: 'tomato' },
  new:   { en: 'New',        id: 'Baru',       variant: 'teal' },
  spicy: { en: 'Spicy',      id: 'Pedas',      variant: 'tomato' },
  veg:   { en: 'Veg',        id: 'Vegetarian', variant: 'teal' },
  sweet: { en: 'Sweet',      id: 'Manis',      variant: 'gold' },
}

export type MenuItem = {
  name: Bi
  desc: Bi
  price: string
  tags?: TagKey[]
  feat?: true
}

export type MenuCategory = {
  key: string
  name: Bi
  note: Bi
  feature: number
  items: MenuItem[]
}

export const menu: MenuCategory[] = [
  {
    key: 'coffee', name: { en: 'Coffee', id: 'Kopi' },
    note: { en: 'Single-origin beans, roasted in Bandung.', id: 'Biji single-origin, di-roasting di Bandung.' },
    feature: 851555,
    items: [
      { name: { en: 'Es Kopi Susu Gula Aren', id: 'Es Kopi Susu Gula Aren' }, desc: { en: 'Espresso, fresh milk & house palm-sugar syrup', id: 'Espresso, susu segar & sirup gula aren rumahan' }, price: '28K', tags: ['best'], feat: true },
      { name: { en: 'Cappuccino',    id: 'Cappuccino' },    desc: { en: 'Double shot, silky steamed milk',            id: 'Double shot, steamed milk lembut' },             price: '30K' },
      { name: { en: 'Caffè Latte',   id: 'Caffè Latte' },   desc: { en: 'Smooth, milky, hot or iced',                 id: 'Lembut, milky, panas atau dingin' },             price: '30K' },
      { name: { en: 'Americano',     id: 'Americano' },     desc: { en: 'Long black, clean finish',                   id: 'Long black, after-taste bersih' },               price: '25K' },
      { name: { en: 'V60 Single Origin', id: 'V60 Single Origin' }, desc: { en: 'Ask the barista what is brewing today', id: 'Tanya barista lagi seduh apa hari ini' }, price: '35K', tags: ['new'] },
    ],
  },
  {
    key: 'noncoffee', name: { en: 'Non-Coffee', id: 'Tanpa Kopi' },
    note: { en: 'For the no-caffeine crew.', id: 'Buat yang anti kafein.' },
    feature: 6802983,
    items: [
      { name: { en: 'Matcha Latte',        id: 'Matcha Latte' },       desc: { en: 'Ceremonial-grade matcha, hot or iced',   id: 'Matcha grade upacara, panas atau dingin' }, price: '33K', feat: true },
      { name: { en: 'Hot Chocolate',       id: 'Cokelat Panas' },      desc: { en: 'Rich Belgian chocolate',                 id: 'Cokelat Belgia yang pekat' },               price: '30K' },
      { name: { en: 'Teh Tarik',           id: 'Teh Tarik' },          desc: { en: 'Pulled milk tea, frothy & sweet',        id: 'Teh susu tarik, berbusa & manis' },         price: '22K' },
      { name: { en: 'Lychee Iced Tea',     id: 'Es Teh Leci' },        desc: { en: 'Refreshing, fruity, not too sweet',      id: 'Segar, buah, nggak terlalu manis' },        price: '24K' },
      { name: { en: 'Strawberry Smoothie', id: 'Smoothie Stroberi' },  desc: { en: 'Real fruit, blended with yoghurt',       id: 'Buah asli, diblender dengan yoghurt' },     price: '32K' },
    ],
  },
  {
    key: 'breakfast', name: { en: 'Breakfast', id: 'Sarapan' },
    note: { en: 'Served 07.00 – 11.00.', id: 'Tersedia 07.00 – 11.00.' },
    feature: 1153369,
    items: [
      { name: { en: 'Smashed Avocado Toast', id: 'Roti Alpukat' },    desc: { en: 'Sourdough, avocado, poached egg, chili',     id: 'Sourdough, alpukat, telur poached, cabai' }, price: '42K', tags: ['veg'], feat: true },
      { name: { en: 'Big Breakfast Plate',   id: 'Sarapan Komplit' }, desc: { en: 'Eggs, sausage, beans, toast, greens',         id: 'Telur, sosis, kacang, roti, sayur' },        price: '55K' },
      { name: { en: 'Nasi Uduk Komplit',     id: 'Nasi Uduk Komplit' },desc: { en: 'Coconut rice, fried chicken, tempe, egg',   id: 'Nasi uduk, ayam goreng, tempe, telur' },     price: '38K' },
      { name: { en: 'Pancake Stack',         id: 'Pancake Stack' },   desc: { en: 'Three fluffy pancakes, maple & butter',      id: 'Tiga pancake tebal, maple & mentega' },      price: '40K', tags: ['sweet'] },
    ],
  },
  {
    key: 'mains', name: { en: 'Mains', id: 'Makanan Berat' },
    note: { en: 'All day, every day.', id: 'Sepanjang hari, tiap hari.' },
    feature: 1267320,
    items: [
      { name: { en: 'Chicken Katsu Curry',  id: 'Kari Katsu Ayam' },   desc: { en: 'Crispy katsu over Japanese curry & rice',           id: 'Katsu renyah dengan kari Jepang & nasi' },              price: '45K', feat: true },
      { name: { en: 'Concept Fried Rice',   id: 'Nasi Goreng Konsep' }, desc: { en: 'Smoky fried rice, fried egg & house sambal',        id: 'Nasi goreng smoky, telur ceplok & sambal rumahan' },     price: '38K', tags: ['spicy'] },
      { name: { en: 'Beef Rice Bowl',       id: 'Beef Rice Bowl' },     desc: { en: 'Sliced beef, teriyaki glaze, rice',                 id: 'Irisan daging sapi, saus teriyaki, nasi' },              price: '52K' },
      { name: { en: 'Aglio e Olio',         id: 'Aglio e Olio' },       desc: { en: 'Garlic, chili, olive oil — add chicken +12K',       id: 'Bawang putih, cabai, minyak zaitun — tambah ayam +12K' },price: '44K', tags: ['veg'] },
      { name: { en: 'Mie Goreng Spesial',   id: 'Mie Goreng Spesial' }, desc: { en: 'Wok-fried noodles, egg, greens, kerupuk',           id: 'Mie goreng, telur, sayur, kerupuk' },                    price: '36K', tags: ['spicy'] },
    ],
  },
  {
    key: 'snacks', name: { en: 'Snacks', id: 'Camilan' },
    note: { en: 'Best shared.', id: 'Enak buat sharing.' },
    feature: 461198,
    items: [
      { name: { en: 'Loaded Fries',       id: 'Kentang Goreng Spesial' },desc: { en: 'Cheese sauce, beef, jalapeño',           id: 'Saus keju, daging sapi, jalapeño' },        price: '32K', feat: true },
      { name: { en: 'Chicken Wings (6)',  id: 'Sayap Ayam (6)' },        desc: { en: 'Honey-garlic or spicy buffalo',          id: 'Honey-garlic atau buffalo pedas' },         price: '38K', tags: ['spicy'] },
      { name: { en: 'Pisang Goreng Keju',id: 'Pisang Goreng Keju' },    desc: { en: 'Fried banana, cheese & condensed milk', id: 'Pisang goreng, keju & susu kental' },      price: '26K' },
      { name: { en: 'Spring Rolls',      id: 'Lumpia Sayur' },           desc: { en: 'Crispy veggie rolls, sweet chili dip',  id: 'Lumpia sayur renyah, cocolan saus manis' }, price: '28K', tags: ['veg'] },
    ],
  },
  {
    key: 'sweets', name: { en: 'Sweets', id: 'Manis' },
    note: { en: 'Save room for these.', id: 'Sisain tempat buat ini.' },
    feature: 2074130,
    items: [
      { name: { en: 'Butter Croissant',  id: 'Croissant Mentega' }, desc: { en: 'Baked fresh every morning',       id: 'Dipanggang fresh tiap pagi' },              price: '26K', feat: true },
      { name: { en: 'Basque Cheesecake', id: 'Basque Cheesecake' }, desc: { en: 'Burnt-top, creamy centre',         id: 'Permukaan gosong, tengah creamy' },         price: '38K', tags: ['best'] },
      { name: { en: 'Es Cendol',         id: 'Es Cendol' },         desc: { en: 'Pandan jelly, palm sugar, coconut milk', id: 'Cendol pandan, gula aren, santan' },  price: '24K' },
      { name: { en: 'Brownie Sundae',    id: 'Brownie Sundae' },    desc: { en: 'Warm brownie, vanilla ice cream', id: 'Brownie hangat, es krim vanila' },          price: '34K', tags: ['sweet'] },
    ],
  },
]
