const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;
let propertiesCollection;

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ MongoDB Connected Successfully!");

    db = client.db("DeshiDwellDB"); // Database name
    propertiesCollection = db.collection("properties");

    // Create indexes for better query performance
    await propertiesCollection.createIndex({ location: 1 });
    await propertiesCollection.createIndex({ price: 1 });
    await propertiesCollection.createIndex({ createdAt: -1 });
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
}

// Routes

// GET all properties with optional filters
app.get("/api/properties", async (req, res) => {
  try {
    const { search, minPrice, maxPrice, location, propertyType } = req.query;

    // Build query filter
    const filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } },
      ];
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (propertyType) {
      filter.propertyType = propertyType;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const properties = await propertiesCollection
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    res.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET single property by ID
app.get("/api/properties/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid property ID" });
    }

    const property = await propertiesCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ error: error.message });
  }
});

// POST create new property
app.post("/api/properties", async (req, res) => {
  try {
    const propertyData = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Validate required fields
    const requiredFields = [
      "title",
      "shortDescription",
      "fullDescription",
      "price",
      "location",
      "userId",
    ];
    const missingFields = requiredFields.filter(
      (field) => !propertyData[field]
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const result = await propertiesCollection.insertOne(propertyData);
    const newProperty = await propertiesCollection.findOne({
      _id: result.insertedId,
    });

    res.status(201).json(newProperty);
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(400).json({ error: error.message });
  }
});

// PUT update property
app.put("/api/properties/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid property ID" });
    }

    const updateData = {
      ...req.body,
      updatedAt: new Date(),
    };

    // Remove _id from update data if present
    delete updateData._id;

    const result = await propertiesCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: "after" }
    );

    if (!result.value) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.json(result.value);
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(400).json({ error: error.message });
  }
});

// DELETE property
app.delete("/api/properties/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid property ID" });
    }

    const result = await propertiesCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.json({
      message: "Property deleted successfully",
      deletedId: id,
    });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET properties by user ID
app.get("/api/properties/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const properties = await propertiesCollection
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    res.json(properties);
  } catch (error) {
    console.error("Error fetching user properties:", error);
    res.status(500).json({ error: error.message });
  }
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "DeshiDwell API is running",
    timestamp: new Date(),
  });
});

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 API: http://localhost:${PORT}/api`);
  });
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down gracefully...");
  await client.close();
  process.exit(0);
});
