import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce-shops";

// Shop Schema
const shopSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    logo: String,
    banner: String,
    category: {
      type: String,
      enum: [
        "ELECTRONICS",
        "FASHION",
        "HOME",
        "SPORTS",
        "BEAUTY",
        "BOOKS",
        "TOYS",
        "FOOD",
        "OTHER",
      ],
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "SUSPENDED", "PENDING"],
      default: "ACTIVE",
    },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    totalProducts: { type: Number, default: 0 },
    totalOrders: { type: Number, default: 0 },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String,
    },
    contact: {
      email: String,
      phone: String,
    },
    socialMedia: {
      facebook: String,
      instagram: String,
      twitter: String,
    },
  },
  { timestamps: true }
);

const Shop = mongoose.model("Shop", shopSchema);

// Sample shops data
const sampleShops = [
  {
    name: "TechHub Electronics",
    description:
      "Your one-stop shop for cutting-edge electronics and gadgets. We offer the latest smartphones, laptops, and accessories.",
    category: "ELECTRONICS",
    rating: 4.8,
    totalProducts: 150,
    totalOrders: 2500,
    address: {
      street: "123 Tech Street",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      zipCode: "94102",
    },
    contact: {
      email: "info@techhub.com",
      phone: "+1-555-0101",
    },
    logo: "https://via.placeholder.com/200x200?text=TechHub",
    banner: "https://via.placeholder.com/1200x400?text=TechHub+Electronics",
  },
  {
    name: "Fashion Forward",
    description:
      "Trendy clothing and accessories for men and women. Stay ahead of the fashion curve with our curated collections.",
    category: "FASHION",
    rating: 4.6,
    totalProducts: 300,
    totalOrders: 3200,
    address: {
      street: "456 Fashion Ave",
      city: "New York",
      state: "NY",
      country: "USA",
      zipCode: "10001",
    },
    contact: {
      email: "hello@fashionforward.com",
      phone: "+1-555-0202",
    },
    logo: "https://via.placeholder.com/200x200?text=Fashion",
    banner: "https://via.placeholder.com/1200x400?text=Fashion+Forward",
  },
  {
    name: "HomeStyle Living",
    description:
      "Beautiful home decor and furniture to transform your living spaces. Quality products at affordable prices.",
    category: "HOME",
    rating: 4.7,
    totalProducts: 200,
    totalOrders: 1800,
    address: {
      street: "789 Home Blvd",
      city: "Chicago",
      state: "IL",
      country: "USA",
      zipCode: "60601",
    },
    contact: {
      email: "support@homestyleliving.com",
      phone: "+1-555-0303",
    },
    logo: "https://via.placeholder.com/200x200?text=HomeStyle",
    banner: "https://via.placeholder.com/1200x400?text=HomeStyle+Living",
  },
  {
    name: "Global Imports",
    description:
      "Premium imported goods from around the world. Discover unique products you won't find anywhere else.",
    category: "OTHER",
    rating: 4.9,
    totalProducts: 180,
    totalOrders: 2100,
    address: {
      street: "321 International Way",
      city: "Los Angeles",
      state: "CA",
      country: "USA",
      zipCode: "90001",
    },
    contact: {
      email: "contact@globalimports.com",
      phone: "+1-555-0404",
    },
    logo: "https://via.placeholder.com/200x200?text=Global",
    banner: "https://via.placeholder.com/1200x400?text=Global+Imports",
  },
];

async function seedShops() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB - Shop Database");

    // Create a default owner (you'll need to create actual users later)
    const defaultOwnerId = new mongoose.Types.ObjectId();
    console.log("📝 Using placeholder owner ID:", defaultOwnerId);

    // Clear existing shops
    const deleteResult = await Shop.deleteMany({});
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing shops`);

    // Add ownerId to each shop
    const shopsWithOwner = sampleShops.map((shop) => ({
      ...shop,
      ownerId: defaultOwnerId,
    }));

    // Insert sample shops
    const createdShops = await Shop.insertMany(shopsWithOwner);
    console.log(`✅ Created ${createdShops.length} shops:`);

    createdShops.forEach((shop, index) => {
      console.log(`   ${index + 1}. ${shop.name} (ID: ${shop._id})`);
    });

    console.log("\n📋 Shop IDs for reference:");
    console.log("Copy these IDs to update your products:\n");
    createdShops.forEach((shop) => {
      console.log(`${shop.name}: ${shop._id}`);
    });

    await mongoose.connection.close();
    console.log("\n✅ Database connection closed");
    console.log("\n⚠️  Next steps:");
    console.log(
      "   1. Run the update-products-with-shops.ts script to assign products to shops"
    );
    console.log("   2. Create actual users and update shop ownerId fields");

    return createdShops;
  } catch (error) {
    console.error("❌ Error seeding shops:", error);
    process.exit(1);
  }
}

seedShops();
