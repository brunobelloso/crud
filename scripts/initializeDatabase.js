require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const initializeDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Check if an admin user already exists
    const existingAdminUser = await User.findOne({ username: 'admin' });
    if (!existingAdminUser) {
      // Create an admin user
      const adminUsername = 'admin';
      const adminPassword = '0000'; // Change this to a secure password
      const hashedPassword = await bcrypt.hash(adminPassword, 10); // Use the same cost factor as in your registration route

      const adminUser = new User({
        username: adminUsername,
        password: hashedPassword,
        fullName: 'Admin User',
        role: 'admin',
        area: '1'
      });

      await adminUser.save();
      console.log('Admin user created.');
    } else {
      console.log('Admin user already exists. Skipping creation.');
    }

    console.log('Database initialization completed.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
};

initializeDatabase();
