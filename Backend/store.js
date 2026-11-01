// Data access layer. Uses MongoDB when connected, otherwise falls back to the
// bundled sample data so the site keeps working (e.g. local demos, previews).
const mongoose = require('mongoose');
const Mess = require('./models/Mess');
const ContactMessage = require('./models/ContactMessage');
const seedMesses = require('./data/seedMesses');

const memoryMesses = seedMesses.map((m) => ({ ...m, _id: m.slug }));
const memoryContacts = [];

const useDb = () => mongoose.connection.readyState === 1;

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const matches = (mess, q) => {
  const needle = q.toLowerCase();
  const haystack = [
    mess.name,
    mess.area,
    mess.address,
    ...(mess.tags || []),
    ...Object.values(mess.menu || {}).flat(),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return haystack.includes(needle);
};

async function listMesses({ q, type } = {}) {
  if (useDb()) {
    const filter = {};
    if (type) filter.type = type;
    if (q) {
      const rx = new RegExp(escapeRegex(q), 'i');
      filter.$or = [
        { name: rx },
        { area: rx },
        { address: rx },
        { tags: rx },
        { 'menu.breakfast': rx },
        { 'menu.lunch': rx },
        { 'menu.dinner': rx },
      ];
    }
    return Mess.find(filter).sort({ rating: -1 }).lean();
  }
  return memoryMesses
    .filter((m) => (!type || m.type === type) && (!q || matches(m, q)))
    .sort((a, b) => b.rating - a.rating);
}

async function getMess(idOrSlug) {
  if (useDb()) {
    const query = mongoose.isValidObjectId(idOrSlug)
      ? { $or: [{ _id: idOrSlug }, { slug: idOrSlug }] }
      : { slug: idOrSlug };
    return Mess.findOne(query).lean();
  }
  return memoryMesses.find((m) => m._id === idOrSlug || m.slug === idOrSlug) || null;
}

async function saveContact(data) {
  if (useDb()) return ContactMessage.create(data);
  const entry = { ...data, createdAt: new Date() };
  memoryContacts.push(entry);
  return entry;
}

async function seedIfEmpty() {
  if (!useDb()) return 0;
  const count = await Mess.estimatedDocumentCount();
  if (count > 0) return 0;
  await Mess.insertMany(seedMesses);
  return seedMesses.length;
}

module.exports = { listMesses, getMess, saveContact, seedIfEmpty, useDb };
