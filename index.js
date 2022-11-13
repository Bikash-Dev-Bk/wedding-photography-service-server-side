const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nfyjflh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const serviceCollection = client.db("weddingPhotography").collection("services");
    const teamCollection = client.db("weddingPhotography").collection("team");
    const photoGalleryCollection = client.db("weddingPhotography").collection("gallery");
    const reviewCollection = client.db("weddingPhotography").collection("reviews");

    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    app.post("/services", async (req, res) => {
      const service = req.body;
      const result = await serviceCollection.insertOne(service);
      service._id = result.insertedId;
      res.send(service);
    });

    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await serviceCollection.findOne(query);
      res.send(service);
    });

    app.get("/team", async (req, res) => {
      const query = {};
      const cursor = teamCollection.find(query);
      const team = await cursor.toArray();
      res.send(team);
    });

    app.get("/gallery", async (req, res) => {
      const query = {};
      const cursor = photoGalleryCollection.find(query);
      const photoGallery = await cursor.toArray();
      res.send(photoGallery);
    });

    app.get("/reviews", async (req, res) => {
      const query = {};
      const cursor = reviewCollection.find(query);
      const reviews = await cursor.toArray();
      res.send(reviews);
    });

    app.get('/reviews/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const user = await reviewCollection.findOne(query);
      res.send(user);
  })

    app.post("/reviews", async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      review._id = result.insertedId;
      res.send(review);
    });

    app.delete('/reviews/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const result = await reviewCollection.deleteOne(query);
      res.send(result);

  });

  } 

  finally {

  }
}

run().catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Service review server running");
});

app.listen(port, () => {
  console.log(`Service review server running on port ${port}`);
});
