const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')
const ObjectId = require('mongodb').ObjectID
const cors = require('cors')

const port = process.env.PORT ||5000;

require('dotenv').config();

// console.log(process.env.DB_NAME);
// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASS);

app.use(express.json());
app.use(cors());




app.get('/', (req, res) => {
  res.send('Hello World we are now got to online!')
})



  
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rpizr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
  const photoCollection = client.db("photoservices").collection("photos");
  const OrderCollection = client.db("photoservices").collection("order");
  const ReviewCollection = client.db("photoservices").collection("review");
  const AdminCollection = client.db("photoservices").collection("admin");




  
  app.post('/addProduct', (req, res) =>{
    const newProduct =req.body;
    console.log('adding new products here :', newProduct);
    photoCollection.insertOne(newProduct)
    .then(result =>{
      console.log('inserted count', result.insertedCount)
    res.send(result.insertedCount > 0)
    })
  })


  
  app.post('/addOrder', (req, res) =>{
    const newOrder =req.body;
    console.log('adding new products here :', newOrder);
    OrderCollection.insertOne(newOrder)
    .then(result =>{
      console.log('inserted count', result.insertedCount)
    res.send(result.insertedCount > 0)
    })
  })
  
  app.post('/makeAdmin', (req, res) =>{
    const newOrder =req.body;
    console.log('adding new products here :', newOrder);
    AdminCollection.insertOne(newOrder)
    .then(result =>{
      console.log('inserted count', result.insertedCount)
    res.send(result.insertedCount > 0)
    })
  })

  

  app.post('/addReview', (req, res) =>{
    const newProduct =req.body;
    console.log('adding new products here :', newProduct);
    ReviewCollection.insertOne(newProduct)
    .then(result =>{
      console.log('inserted count', result.insertedCount)
    res.send(result.insertedCount > 0)
    })
  })



  app.get('/shopProducts', (req, res) => {
    photoCollection.find()
    .toArray((err, items) =>{
      // console.log('from database',items);
      res.send(items)
    })
  })

  app.get('/showReview', (req, res) => {
    ReviewCollection.find()
    .toArray((err, items) =>{
      // console.log('from database',items);
      res.send(items)
    })
  })

  app.get('/orderList', (req, res) => {
    OrderCollection.find()
    .toArray((err, items) =>{
      // console.log('from database',items);
      res.send(items)
    })
  })



    // client.close();
  });
  

  

app.get('/',(req, res) => {
  res.send('Hello database has working!')

})









// app.listen(port)

app.listen(process.env.PORT || port)