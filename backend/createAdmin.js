const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminEmail = 'admin@lumina.com';
    const adminPassword = 'adminpassword123';

    // Check if admin already exists
    const adminExists = await User.findOne({ email: adminEmail });

    if (adminExists) {
      console.log('Admin user already exists!');
      process.exit();
    }

    const admin = await User.create({
      name: 'Lumina Admin',
      email: adminEmail,
      password: adminPassword,
      address: 'System Admin Office',
      contact_number: '0000000000',
      isAdmin: true,
    });

    console.log('Admin User Created Successfully!');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    process.exit();
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
