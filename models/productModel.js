const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name'],
    unique: true,
    trim: true
  },
  slug: String,
  category: {
    type: String,
    required: [true, 'A product must have a category'],
    enum: ['Inline Fan', 'Wall Fan', 'Roof Fan', 'Air Handling Unit', 'Ducting', 'Rotors']
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A product must have a summary']
  },
  description: String,
  imageCover: {
    type: String,
    required: [true, 'A product must have a cover image']
  },
  images: [String],
  technicalSpecs: {
    airFlow: String,
    pressure: String,
    power: String,
    soundLevel: String,
    weight: String
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  }
});

// FIX: Updated to Async function without 'next' parameter
productSchema.pre('save', async function() {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true });
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;