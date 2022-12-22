const express = require('express');
const app = express();
const cors= require('cors')
const port= process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const product= require('./product.json')
 require('dotenv').config();


//  user:dbuser01 
//  pass: wwLhTVE3NpkZcLxF

//middleware
app.use(cors());
app.use(express.json());

console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nxaovwt.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
          const productCollection =  client.db('nodemongoDB').collection('users');
         app.get('/products', async (req, res) => {
           const query = {}
           const cursor = productCollection.find(query);
           const products= await cursor.toArray()
           res.send(products)

         })
    }
        
    finally{

    }
}
run().catch(err => console.error(err));




app.get('/',(req, res) =>{
    res.send(product)
});




app.listen (port, ()=>{
    console.log(`listening on port ${port}`)
})