const Joi = require('joi');
const Product = require('../models/Product');

const productSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().max(500).allow('').optional(),
  price: Joi.number().positive().required(),
  category: Joi.string().max(50).allow('').optional(),
});

const productUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  description: Joi.string().max(500).allow(''),
  price: Joi.number().positive(),
  category: Joi.string().max(50).allow(''),
}).min(1);

exports.getAll = async (req, res) => {
  try {
    const products = await Product.findAll({ order: [['createdAt', 'DESC']] });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { error, value } = productSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const product = await Product.create(value);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { error, value } = productUpdateSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await product.update(value);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const seedProducts = [
  { name: 'Wireless Bluetooth Headphones', description: 'Noise-cancelling over-ear headphones with 30hr battery life.', price: 79.99, category: 'Electronics' },
  { name: 'Organic Cotton T-Shirt', description: 'Soft, eco-friendly unisex t-shirt available in 6 colors.', price: 24.99, category: 'Clothing' },
  { name: 'Stainless Steel Water Bottle', description: 'Double-wall insulated, keeps drinks cold for 24 hours.', price: 18.50, category: 'Home' },
  { name: 'JavaScript: The Good Parts', description: 'A deep dive into the best features of JavaScript.', price: 29.99, category: 'Books' },
  { name: 'Yoga Mat Premium', description: 'Extra thick, non-slip surface with carrying strap.', price: 45.00, category: 'Sports' },
];

exports.seed = async (req, res) => {
  try {
    await Product.destroy({ where: {}, truncate: true });
    await Product.sequelize.query("DELETE FROM sqlite_sequence WHERE name='products'");
    const products = await Product.bulkCreate(seedProducts);
    res.status(201).json({ message: 'Database seeded with 5 products', products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await product.destroy();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
