import mongoose from 'mongoose';
import { menuItems } from './menu';
import MenuItem from '../models/MenuItem';
import config from '../config/config';

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || config.mongoUri);
    console.log('Connected to MongoDB Atlas for seeding menu');
    
    // Clear existing menu items (optional - remove if you want to keep existing data)
    console.log('Clearing existing menu items...');
    await MenuItem.deleteMany({});
    console.log('Existing menu items cleared');
    
    console.log(`Starting to seed ${menuItems.length} menu items...`);
    
    for (const m of menuItems) {
      const doc = new MenuItem({
        name: m.name,
        description: m.description,
        price: m.price,
        category: m.category,
        isVegetarian: m.isVegetarian,
        imageId: undefined,
        image: m.image,
      });
      await doc.save();
      console.log(`✓ Seeded: ${m.name} - $${m.price}`);
    }
    
    console.log(`\n🎉 Successfully seeded ${menuItems.length} menu items!`);
    console.log('Categories included:');
    const categories = [...new Set(menuItems.map(item => item.category))];
    categories.forEach(cat => {
      const count = menuItems.filter(item => item.category === cat).length;
      console.log(`  - ${cat}: ${count} items`);
    });
    
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed');
  }
}

if (require.main === module) {
  seed().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
