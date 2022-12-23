const express = require('express');
const app = express();
const cors= require('cors')
const port= process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
          const productCollection =  client.db('nodemongoDB').collection('users');
          const orderCollection =   client.db('nodemongoDB').collection('review');
         
         
         
         
          app.get('/products', async (req, res) => {
           const query = {}
           const cursor = productCollection.find(query);
           const products= await cursor.toArray()
           res.send(products)

         })

     app.get('/products/:id', async (req, res) => {
        const id = req.params.id
        const query ={_id: ObjectId(id)};
        const product= await productCollection.findOne(query)
        res.send(product);
    });
     

//  review api
app.get('/review', async (req, res)=>{
    let query = {};
    if(req.query.email){
        query= {
            email:req.query.email
        }
    }
    const cursor= orderCollection.find(query);
    const review=  await cursor.toArray()
    res.send(review);
})
    app.post('/review', async(req, res) =>{
        const review = req.body;
        const result = await orderCollection.insertOne(review);
        res.send(result);
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