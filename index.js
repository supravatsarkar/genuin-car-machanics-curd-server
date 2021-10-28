const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m4rht.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('database connected..');
        const database = client.db('GeniusCarMechanic');
        const serviceCollection = database.collection('services');

        // get api
        app.get('/services', async (req, res) => {
            console.log('get request hit');
            const query = {};
            const cursor = serviceCollection.find(query);
            result = await cursor.toArray();
            res.send(result);
        })

        //Get Single Api
        app.get('/services/book/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.json(service);
        })


        // post api 
        app.post('/services/addServices', async (req, res) => {
            const service = req.body;
            console.log(service);
            const result = await serviceCollection.insertOne(service);
            res.json(result);
        })

        // delete api
        app.delete('/services/:id', async (req, res) => {
            const id = req.params.id;
            console.log("hitting delete api id:", id);
            const query = { _id: ObjectId(id) };
            const result = await serviceCollection.deleteOne(query);
            console.log('Delete success result-', result);
            res.json(result);
        })

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Genius car mechanic server running... and updated');
})

app.listen(port, () => {
    console.log('Genius car mechanic running prot: ', port);
})