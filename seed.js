const sequelize = require('./src/config/database');
const Product = require('./src/models/Product');

const products = [
  { name: 'Wireless Bluetooth Headphones', description: 'Noise-cancelling over-ear headphones with 30hr battery life.', price: 79.99, category: 'Electronics' },
  { name: 'Organic Cotton T-Shirt', description: 'Soft, eco-friendly unisex t-shirt available in 6 colors.', price: 24.99, category: 'Clothing' },
  { name: 'Stainless Steel Water Bottle', description: 'Double-wall insulated, keeps drinks cold for 24 hours.', price: 18.50, category: 'Home' },
  { name: 'JavaScript: The Good Parts', description: 'A deep dive into the best features of JavaScript.', price: 29.99, category: 'Books' },
  { name: 'Yoga Mat Premium', description: 'Extra thick, non-slip surface with carrying strap.', price: 45.00, category: 'Sports' },
];

async function seed() {
  await sequelize.sync({ force: true });
  await Product.bulkCreate(products);
  console.log('Seeded 5 products successfully.');
  await sequelize.close();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
