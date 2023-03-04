const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/";
const mongoURI = "mongodb+srv://abhishek_1212:ashuashu@cluster0.nhsofb8.mongodb.net/NOTES?retryWrites=true&w=majority"



const conectToMongo=()=> {
    mongoose.connect(mongoURI, () => {
        // insted o using  asycn and update we are using  call back function and we can also use async function
        console.log('connected to mongo succesfully ')
        
    }
    )
}



module.exports = conectToMongo;
