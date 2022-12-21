const express = require('express');
const app = express();
const cors= require('cors')
const port= process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const product= require('./product.json')
//  user:dbuser01 
//  pass: wwLhTVE3NpkZcLxF

//middleware
app.use(cors());
app.use(express.json());





const uri = "mongodb+srv://dbuser01:wwLhTVE3NpkZcLxF@cluster0.nxaovwt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
          const userCollection =  client.db('nodemongoDB').collection('users');
          const user = {
          name: "amirh",
          email: "amirh@gmail.com"
          }
          const result = await userCollection.insertOne(user);
          console.log(result)
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