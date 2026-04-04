/**
 * Regenerates BlakeUI demo fields in public/data/orders-ecommerce-1000.json:
 * customer names, purchased titles, emails, notes, assignees, tracking, card last-4.
 * Run: node scripts/normalize-orders-demo-data.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "../public/data/orders-ecommerce-1000.json");

const TEAM = [
  "Avery Blake",
  "Jordan Hale",
  "Sam Rivera",
  "Casey Moore",
  "Morgan Reid",
];

const FIRST = [
  "Alex", "Sam", "Jordan", "Riley", "Casey", "Morgan", "Taylor", "Jamie",
  "Quinn", "Reese", "Drew", "Skyler", "Avery", "Cameron", "Emery", "Finley",
  "Harper", "Logan", "Parker", "Rowan", "Sage", "Blake", "River", "Phoenix",
  "Marlowe", "Ellis", "Indigo", "Remy", "Noel", "Jules", "Charlie", "Eden",
  "Hayden", "Kendall", "Lane", "Monroe", "Nico", "Oakley", "Peyton", "Reagan",
];

const LAST = [
  "Ashford", "Bennett", "Caldwell", "Donovan", "Ellison", "Fletcher", "Grayson",
  "Hollis", "Iverson", "Jennings", "Kensington", "Langford", "Mercer", "North",
  "Oakley", "Prescott", "Quincy", "Redmond", "Sterling", "Thatcher", "Underwood",
  "Vance", "Whitaker", "Yates", "Zimmer", "Abbott", "Briggs", "Conrad", "Dalton",
  "Easton", "Fairchild", "Gallagher", "Hayworth", "Ingram", "Jarvis", "Kingsley",
  "Lancaster", "Montgomery", "Nash", "Ortega", "Pembroke",
];

const ADJECTIVES = [
  "Studio", "Travel", "Everyday", "Essential", "Premium", "Compact", "Modular",
  "Wireless", "Ergonomic", "Heritage", "Urban", "Alpine", "Coastal", "Desert",
];

const PRODUCTS = [
  "Desk Mat", "Monitor Arm", "USB-C Hub", "Laptop Stand", "Keycap Set",
  "Mechanical Keyboard", "Noise-Canceling Headphones", "Webcam Cover", "Desk Lamp",
  "Cable Organizer", "Portable SSD", "Laptop Sleeve", "Tablet Stand", "Phone Grip",
  "Running Shoes", "Wool Beanie", "Packable Jacket", "Canvas Tote", "Leather Wallet",
  "Stainless Bottle", "Ceramic Mug", "Glass Carafe", "Bamboo Tray", "Linen Apron",
  "Yoga Block", "Resistance Bands", "Foam Roller", "Jump Rope", "Gym Towel",
  "Throw Blanket", "Accent Pillow", "Area Rug", "Wall Clock", "Table Runner",
  "Plant Stand", "Ceramic Planter", "Watering Can", "Garden Shears", "Seed Kit",
  "Chef Knife", "Cutting Board", "Cast Iron Pan", "Mixing Bowl", "Measuring Set",
  "Bluetooth Speaker", "Smart Plug", "Power Strip", "Surge Protector", "HDMI Cable",
  "DisplayPort Cable", "Ethernet Adapter", "Card Reader", "Docking Station",
  "Drawing Tablet", "Stylus Pen", "Screen Protector", "Lens Cloth", "Tripod",
  "Ring Light", "Mic Boom", "Audio Interface", "Studio Chair", "Foot Rest",
  "Bookshelf", "File Cabinet", "Whiteboard", "Cork Board", "Desk Drawer",
  "Paper Shredder", "Label Maker", "Stapler Set", "Binder Pack", "Pen Refill",
  "Notebook Set", "Sticky Notes", "Index Cards", "Clipboard", "Document Tray",
  "Backpack", "Duffel Bag", "Weekender", "Packing Cubes", "Luggage Tag",
  "Passport Holder", "Travel Pillow", "Eye Mask", "Earplugs Pack", "Adapter Kit",
  "Rain Shell", "Fleece Pullover", "Base Layer", "Hiking Socks", "Belt Pack",
  "Sunglasses", "Watch Band", "Leather Belt", "Card Holder", "Key Organizer",
  "Tool Roll", "Flashlight", "Multi-Tool", "First Aid Kit", "Emergency Blanket",
];

function customerName(i) {
  /** Spread first/last pairs (no long runs of the same surname). */
  const fi = Math.imul(i, 11) % FIRST.length;
  const li = Math.imul(i, 17) % LAST.length;
  return `${FIRST[fi]} ${LAST[li]}`;
}

function purchasedTitle(i) {
  const adj = ADJECTIVES[Math.imul(i, 17) % ADJECTIVES.length];
  const prod = PRODUCTS[i % PRODUCTS.length];
  return `${adj} ${prod}`;
}

function hashDigits(seed, len) {
  let n = Math.imul(seed, 1103515245) + 12345;
  let out = "";
  for (let k = 0; k < len; k++) {
    n = Math.imul(n ^ (n >>> 13), 1540483477);
    out += String((n >>> 0) % 10);
  }
  return out.slice(0, len);
}

function firstName(fullName) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  return parts[0] ?? "Customer";
}

function emailFromName(name, counts) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = (parts[0] ?? "user").toLowerCase().replace(/[^a-z]/g, "");
  const last = (parts.length > 1 ? parts[parts.length - 1] : "customer")
    .toLowerCase()
    .replace(/[^a-z]/g, "");
  const baseKey = `${first}.${last}`;
  const n = (counts.get(baseKey) ?? 0) + 1;
  counts.set(baseKey, n);
  if (n === 1) return `${baseKey}@blakeui.com`;
  return `${baseKey}${n}@blakeui.com`;
}

const raw = fs.readFileSync(filePath, "utf8");
const data = JSON.parse(raw);
const counts = new Map();

const out = data.map((row, i) => {
  const customer = customerName(i);
  const email = emailFromName(customer, counts);
  const purchased = purchasedTitle(i);
  const assignee = TEAM[i % TEAM.length];
  const fn = firstName(customer);

  const shipPhrase = row.shipping_service ?? "Standard Ground";
  const notes = `${fn} prefers ${shipPhrase.toLowerCase()}.`;

  return {
    ...row,
    id: row.id,
    purchased,
    items: row.items,
    customer,
    customer_email: email,
    customer_segment: row.customer_segment,
    fulfillment_channel: row.fulfillment_channel,
    shipping_service: row.shipping_service,
    warehouse: row.warehouse,
    order_status: row.order_status,
    payment_status: row.payment_status,
    payment_method: `****${hashDigits(i * 9973, 4)}`,
    tracking_number: `TRK${hashDigits(i * 7919, 10)}`,
    assigned_to: assignee,
    return_status: row.return_status,
    coupon_code: row.coupon_code,
    gift: row.gift,
    notes,
  };
});

fs.writeFileSync(filePath, `${JSON.stringify(out, null, 2)}\n`);
