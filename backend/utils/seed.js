const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Destination = require('../models/Destination');
const Hotel = require('../models/Hotel');
const TourPackage = require('../models/TourPackage');
const Booking = require('../models/Booking');
const Review = require('../models/Review');
const Inquiry = require('../models/Inquiry');
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('MongoDB connected for seeding');
};

const seedData = async () => {
  try {
    await connectDB();
    await Promise.all([
      User.deleteMany(),
      Destination.deleteMany(),
      Hotel.deleteMany(),
      TourPackage.deleteMany(),
      Booking.deleteMany(),
      Review.deleteMany(),
      Inquiry.deleteMany(),
    ]);

    const hashedPassword = await bcrypt.hash('password123', 10);

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@travel.com',
      password: hashedPassword,
      phone: '+1-555-0100',
      role: 'admin',
    });

    const agent = await User.create({
      name: 'Travel Agent',
      email: 'agent@travel.com',
      password: hashedPassword,
      phone: '+1-555-0101',
      role: 'agent',
    });

    const customer = await User.create({
      name: 'John Doe',
      email: 'customer@travel.com',
      password: hashedPassword,
      phone: '+1-555-0102',
      role: 'customer',
    });

    const destinations = await Destination.insertMany([
      {
        name: 'Bali Paradise',
        country: 'Indonesia',
        city: 'Bali',
        description: 'Tropical island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
        highlights: ['Beaches', 'Temples', 'Rice Terraces', 'Water Sports'],
        bestTimeToVisit: 'April to October',
        climate: 'Tropical',
        isPopular: true,
      },
      {
        name: 'Swiss Alps',
        country: 'Switzerland',
        city: 'Zermatt',
        description: 'Majestic mountain range offering world-class skiing, hiking, and breathtaking alpine scenery.',
        image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800',
        highlights: ['Skiing', 'Hiking', 'Matterhorn', 'Alpine Villages'],
        bestTimeToVisit: 'December to March (skiing), June to September (hiking)',
        climate: 'Alpine',
        isPopular: true,
      },
      {
        name: 'Santorini',
        country: 'Greece',
        city: 'Santorini',
        description: 'Stunning Greek island with whitewashed buildings, blue-domed churches, and spectacular sunsets.',
        image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
        highlights: ['Sunsets', 'Wine Tasting', 'Volcanic Beaches', 'Ancient Ruins'],
        bestTimeToVisit: 'April to November',
        climate: 'Mediterranean',
        isPopular: true,
      },
      {
        name: 'Tokyo Explorer',
        country: 'Japan',
        city: 'Tokyo',
        description: 'Vibrant metropolis blending ultramodern and traditional, from neon-lit skyscrapers to historic temples.',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
        highlights: ['Temples', 'Cherry Blossoms', 'Sushi', 'Technology'],
        bestTimeToVisit: 'March to May, September to November',
        climate: 'Temperate',
        isPopular: false,
      },
    ]);

    const hotels = await Hotel.insertMany([
      {
        name: 'Bali Beach Resort',
        destination: destinations[0]._id,
        description: 'Luxury beachfront resort with infinity pool and spa.',
        address: 'Jl. Pantai Kuta, Bali',
        starRating: 5,
        pricePerNight: 250,
        amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Beach Access'],
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
        totalRooms: 50,
        availableRooms: 45,
      },
      {
        name: 'Alpine Lodge Zermatt',
        destination: destinations[1]._id,
        description: 'Cozy mountain lodge with Matterhorn views.',
        address: 'Bahnhofstrasse 5, Zermatt',
        starRating: 4,
        pricePerNight: 320,
        amenities: ['Ski Storage', 'Sauna', 'Restaurant', 'WiFi'],
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
        totalRooms: 30,
        availableRooms: 28,
      },
      {
        name: 'Santorini Blue Domes Hotel',
        destination: destinations[2]._id,
        description: 'Boutique hotel perched on caldera cliffs.',
        address: 'Oia, Santorini',
        starRating: 5,
        pricePerNight: 400,
        amenities: ['Infinity Pool', 'Sunset Terrace', 'Breakfast', 'WiFi'],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        totalRooms: 20,
        availableRooms: 18,
      },
    ]);

    const packages = await TourPackage.insertMany([
      {
        title: 'Bali Adventure Week',
        destination: destinations[0]._id,
        description: '7-day adventure exploring Bali\'s best beaches, temples, and rice terraces.',
        duration: 7,
        price: 1299,
        maxGroupSize: 15,
        difficulty: 'moderate',
        category: 'adventure',
        itinerary: [
          { day: 1, title: 'Arrival & Ubud', description: 'Arrive in Bali, transfer to Ubud, welcome dinner.' },
          { day: 2, title: 'Temple Tour', description: 'Visit Tanah Lot and Uluwatu temples.' },
          { day: 3, title: 'Rice Terraces', description: 'Tegallalang rice terrace trek and local cooking class.' },
          { day: 4, title: 'Beach Day', description: 'Nusa Dua beach and water sports.' },
          { day: 5, title: 'Volcano Trek', description: 'Mount Batur sunrise trek.' },
          { day: 6, title: 'Free Day', description: 'Spa day or optional activities.' },
          { day: 7, title: 'Departure', description: 'Transfer to airport.' },
        ],
        inclusions: ['Accommodation', 'Breakfast', 'Transport', 'Guide', 'Entrance Fees'],
        exclusions: ['Flights', 'Lunch & Dinner', 'Personal Expenses'],
        images: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800'],
        hotel: hotels[0]._id,
        startDates: [new Date('2026-07-01'), new Date('2026-08-01'), new Date('2026-09-01')],
        rating: 4.8,
        reviewCount: 24,
        isFeatured: true,
        createdBy: agent._id,
      },
      {
        title: 'Swiss Alps Ski Experience',
        destination: destinations[1]._id,
        description: '5-day skiing adventure in the heart of the Swiss Alps.',
        duration: 5,
        price: 2199,
        maxGroupSize: 10,
        difficulty: 'challenging',
        category: 'adventure',
        itinerary: [
          { day: 1, title: 'Arrival', description: 'Arrive in Zermatt, equipment fitting.' },
          { day: 2, title: 'Beginner Slopes', description: 'Ski lessons on beginner slopes.' },
          { day: 3, title: 'Advanced Runs', description: 'Explore advanced ski trails.' },
          { day: 4, title: 'Matterhorn Views', description: 'Scenic ski tour with Matterhorn views.' },
          { day: 5, title: 'Departure', description: 'Morning ski, afternoon departure.' },
        ],
        inclusions: ['Accommodation', 'Ski Pass', 'Equipment Rental', 'Instructor'],
        exclusions: ['Flights', 'Meals', 'Insurance'],
        images: ['https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800'],
        hotel: hotels[1]._id,
        startDates: [new Date('2026-12-15'), new Date('2027-01-15')],
        rating: 4.9,
        reviewCount: 18,
        isFeatured: true,
        createdBy: agent._id,
      },
      {
        title: 'Santorini Romantic Getaway',
        destination: destinations[2]._id,
        description: '4-day romantic escape with wine tasting and sunset cruises.',
        duration: 4,
        price: 1599,
        maxGroupSize: 8,
        difficulty: 'easy',
        category: 'luxury',
        itinerary: [
          { day: 1, title: 'Arrival in Oia', description: 'Check in and sunset dinner.' },
          { day: 2, title: 'Wine Tour', description: 'Visit local wineries and taste Assyrtiko.' },
          { day: 3, title: 'Catamaran Cruise', description: 'Sailing around the caldera.' },
          { day: 4, title: 'Departure', description: 'Morning at leisure, departure.' },
        ],
        inclusions: ['Luxury Hotel', 'Breakfast', 'Wine Tour', 'Catamaran Cruise'],
        exclusions: ['Flights', 'Lunch & Dinner'],
        images: ['https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800'],
        hotel: hotels[2]._id,
        startDates: [new Date('2026-06-01'), new Date('2026-07-15')],
        rating: 4.7,
        reviewCount: 31,
        isFeatured: true,
        createdBy: agent._id,
      },
      {
        title: 'Tokyo Cultural Immersion',
        destination: destinations[3]._id,
        description: '6-day deep dive into Japanese culture, cuisine, and traditions.',
        duration: 6,
        price: 1899,
        maxGroupSize: 12,
        difficulty: 'easy',
        category: 'cultural',
        itinerary: [
          { day: 1, title: 'Arrival', description: 'Arrive in Tokyo, Shibuya exploration.' },
          { day: 2, title: 'Temples & Gardens', description: 'Senso-ji Temple and Imperial Palace.' },
          { day: 3, title: 'Tsukiji & Akihabara', description: 'Fish market tour and electronics district.' },
          { day: 4, title: 'Day Trip to Nikko', description: 'UNESCO World Heritage shrines.' },
          { day: 5, title: 'Traditional Crafts', description: 'Tea ceremony and calligraphy workshop.' },
          { day: 6, title: 'Departure', description: 'Last-minute shopping, departure.' },
        ],
        inclusions: ['Hotel', 'JR Pass', 'Guided Tours', 'Some Meals'],
        exclusions: ['Flights', 'Personal Expenses'],
        images: ['https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800'],
        startDates: [new Date('2026-04-01'), new Date('2026-10-01')],
        rating: 4.6,
        reviewCount: 15,
        isFeatured: false,
        createdBy: agent._id,
      },
    ]);

    await Booking.create({
      user: customer._id,
      tourPackage: packages[0]._id,
      travelDate: new Date('2026-07-01'),
      numberOfTravelers: 2,
      totalAmount: 2598,
      status: 'confirmed',
      paymentStatus: 'paid',
      travelers: [
        { name: 'John Doe', age: 35, passportNumber: 'AB1234567' },
        { name: 'Jane Doe', age: 32, passportNumber: 'AB7654321' },
      ],
      handledBy: agent._id,
    });

    await Review.create({
      user: customer._id,
      tourPackage: packages[0]._id,
      rating: 5,
      title: 'Amazing Bali Experience!',
      comment: 'The tour was perfectly organized. Our guide was knowledgeable and friendly. Highly recommend!',
    });

    await Inquiry.create({
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      phone: '+1-555-0199',
      subject: 'Group booking inquiry',
      message: 'I would like to book a group tour for 20 people to Santorini in August.',
      tourPackage: packages[2]._id,
      status: 'new',
    });

    console.log('Database seeded successfully!');
    console.log('\nDemo Accounts (password: password123):');
    console.log('  Admin:    admin@travel.com');
    console.log('  Agent:    agent@travel.com');
    console.log('  Customer: customer@travel.com');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
