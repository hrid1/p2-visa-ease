const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

// middleware

app.use(express.json());
app.use(cors());

// connect mongodb

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.54rjrr8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // ------------------------Connect MongoDB---------------------
    const visasCollection = client.db("visaDB").collection("visaRecords");
    const visaApplications = client.db("visaDB").collection("visaApplications");

    // -------------------FOR ALL VISAS------------------

    // CREATE
    app.post("/visas", async (req, res) => {
      const newVisa = req.body;
      const result = await visasCollection.insertOne(newVisa);
      // console.log(result);
      res.send(result);
    });

    // READ
    app.get("/visas", async (req, res) => {
      // const result = await visasCollection.find().toArray();
      // res.send(result);
      const allVisa = visasCollection.find().sort({ createdAt: -1 });
      const result = await allVisa.toArray();
      res.send(result);
    });

    // READ SingleVisa
    app.get("/visa/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await visasCollection.findOne(query);
      res.send(result);
    });

    // --------------- FOR MY VISAS based on Email-------------

    // CREATE
    app.get("/myvisa", async (req, res) => {
      const email = req.query.email;
      const userVisas = await visasCollection
        .find({ useremail: email })
        .toArray();

      res.send(userVisas);
    });

    // READ
    app.delete("/myvisa/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await visasCollection.deleteOne(query);
      res.send(result);
    });
    // UPDATE
    app.put("/myvisa/:id", async (req, res) => {
      const filter = { _id: new ObjectId(req.params.id) };
      const options = { upsert: true };
      const updatedVisa = req.body;
      const visa = {
        $set: {
          ...updatedVisa,
        },
      };
      const result = await visasCollection.updateOne(filter, visa, options);
      res.send(result);
    });
    // --------------- for visa applications--------------
    // CREATE
    app.post("/visa/application", async (req, res) => {
      const visa = req.body;
      const result = await visaApplications.insertOne(visa);
      // console.log(result);
      res.send(result);
    });
    // READ
    app.get("/application", async (req, res) => {
      const { searchParams } = req.query;
      // console.log(searchParams);

      let query = {};

      if (searchParams) {
       query = { "visaInfo.country": { $regex: searchParams, $options: "i" } };
      }

      // const result = await visaApplications.find(query).toArray();

      const allVisaApplication = await visaApplications.find(query).toArray();
      res.send(allVisaApplication);
      // console.log(allVisaApplication)
    });
    // DELETE Application
    app.delete("/application/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await visaApplications.deleteOne(query);
      res.send(result);
    });

    // -------------------END ROUTEs-----------------------

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// first route
app.get("/", (req, res) => [res.send("Hello VisaHub")]);

// listen
app.listen(port, () => {
  console.log(`App is Running on http://localhost:${port}/`);
});
