const mongoose=require('mongoose')
const mongoURI= 'mongodb+srv://ddeepakmishra5:oTXRhfW2vH72N3ln@cluster0.y8ffphr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
PORT = 8080
const options = {
    connectTimeoutMS: 30000, // Set the connect timeout to 30 seconds (30000 milliseconds)
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  
  // Connect to MongoDB
  mongoose.connect(mongoURI, options)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch(err => console.error('Error connecting to MongoDB:', err));
  




// mongoose.connect('mongodb://127.0.0.1:27017/testproject_db')

const db = mongoose.connection;
db.on('error',console.error.bind(console,'Error in connecting to the database'))
db.once('open',()=>{
    console.log("connected successfully")
})