import mongoose from "mongoose";
import ProductModel from "../models/Product.js";
import dotenv from "dotenv";
dotenv.config();

const demoProducts = [
  {
    name: "Classic White T-Shirt",
    description: "Soft cotton, crew neck, everyday essential",
    price: 19.99,
    imageUrl: [
      "https://images.pexels.com/photos/1002637/pexels-photo-1002637.jpeg",
    ],
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Black Hoodie",
    description: "Cozy fleece hoodie with front pocket",
    price: 39.99,
    imageUrl: [
      "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg",
    ],
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Women’s Floral Dress",
    description: "Lightweight floral summer dress",
    price: 29.99,
    imageUrl: [
      "https://images.pexels.com/photos/3756371/pexels-photo-3756371.jpeg",
    ],
    category: "Women",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Denim Jacket",
    description: "Classic blue denim jacket, unisex style",
    price: 49.99,
    imageUrl: [
      "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg",
    ],
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Women’s Black Blazer",
    description: "Tailored blazer for office or formal wear",
    price: 59.99,
    imageUrl: [
      "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg",
    ],
    category: "Women",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Kids’ Graphic Tee",
    description: "Fun graphic tee for kids",
    price: 14.99,
    imageUrl: [
      "https://images.pexels.com/photos/2065201/pexels-photo-2065201.jpeg",
    ],
    category: "Kids",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Women’s Jeans",
    description: "Slim fit stretch denim",
    price: 34.99,
    imageUrl: [
      "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg",
    ],
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Men’s Chinos",
    description: "Casual chino pants",
    price: 32.99,
    imageUrl: [
      "https://images.pexels.com/photos/2983463/pexels-photo-2983463.jpeg",
    ],
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Women’s Hoodie",
    description: "Soft hoodie in pastel colors",
    price: 39.99,
    imageUrl: [
      "https://images.pexels.com/photos/4397836/pexels-photo-4397836.jpeg",
    ],
    category: "Women",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Kids’ Hoodie",
    description: "Warm hoodie for kids",
    price: 24.99,
    imageUrl: [
      "https://images.pexels.com/photos/3850371/pexels-photo-3850371.jpeg",
    ],
    category: "Kids",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Women’s Skirt",
    description: "A-line mid-length skirt",
    price: 27.99,
    imageUrl: [
      "https://images.pexels.com/photos/2983462/pexels-photo-2983462.jpeg",
    ],
    category: "Women",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Men’s Polo Shirt",
    description: "Cotton polo, casual and smart",
    price: 22.99,
    imageUrl: [
      "https://images.pexels.com/photos/4041688/pexels-photo-4041688.jpeg",
    ],
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Women’s Tank Top",
    description: "Lightweight cotton tank top",
    price: 15.99,
    imageUrl: [
      "https://images.pexels.com/photos/424917/pexels-photo-424917.jpeg",
    ],
    category: "Women",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Kids’ Shorts",
    description: "Comfortable shorts for kids",
    price: 17.99,
    imageUrl: [
      "https://images.pexels.com/photos/296887/pexels-photo-296887.jpeg",
    ],
    category: "Kids",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Women’s Cardigan",
    description: "Soft knit open cardigan",
    price: 31.99,
    imageUrl: [
      "https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg",
    ],
    category: "Women",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Men’s Sweatpants",
    description: "Comfortable jogger sweatpants",
    price: 29.99,
    imageUrl: [
      "https://images.pexels.com/photos/4041694/pexels-photo-4041694.jpeg",
    ],
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    name: "Women’s Blouse",
    description: "Elegant blouse for office wear",
    price: 26.99,
    imageUrl: [
      "https://images.pexels.com/photos/2983461/pexels-photo-2983461.jpeg",
    ],
    category: "Women",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Kids’ Dress",
    description: "Cute floral dress for kids",
    price: 22.99,
    imageUrl: [
      "https://images.pexels.com/photos/2065203/pexels-photo-2065203.jpeg",
    ],
    category: "Kids",
    sizes: ["S", "M", "L"],
  },
  {
    name: "Unisex Beanie",
    description: "Warm knit beanie hat",
    price: 12.99,
    imageUrl: [
      "https://images.pexels.com/photos/1584711/pexels-photo-1584711.jpeg",
    ],
    category: "Men",
    sizes: [],  // sizes may be empty (one-size)
  },
];

async function seedProducts() {
  try {
    // Connect to MongoDB (adjust URI)
    await mongoose.connect(process.env.MONGO_URL , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB for seeding");

    // Optionally clear existing products
    await ProductModel.deleteMany({});
    console.log("Cleared existing products");

    // Insert demo products
    const inserted = await ProductModel.insertMany(demoProducts);
    console.log(`Inserted ${inserted.length} demo products`);

    process.exit(0);
  } catch (err) {
    console.error("Error seeding products:", err);
    process.exit(1);
  }
}

seedProducts();
