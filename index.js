const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m4rht.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('database connected..');

        app.post('/services/addServices', async (req, res) => {
            const database = client.db('GeniusCarMechanic');
            const serviceCollection = database.collection('services');
            const services = {
                name: "Tire Repare",
                price: 200,
                time: "30mint",
                img: "https://i.ibb.co/mFj7kQ5/benjamin-brunner-K3cj-UOMm-Mhc-unsplash.png",
                description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt ratione in obcaecati nesciunt dolor commodi libero, a, quasi veniam iure consequuntur! At error in facere. Unde voluptate officia a inventore."
            }

            const result = await serviceCollection.insertOne(services);
            console.log(result);
        })

    } finally {
        await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Genius car mechanic server running...');
})

app.listen(port, () => {
    console.log('Genius car mechanic running prot: ', port);
})