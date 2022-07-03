const mongoose = require("mongoose")

const configureDB=()=>{
    mongoose.connect(process.env.DB_URI)
    .then((data) => {
        console.log(`Mongodb connnect with  server :${data.connection.host}`);
    })
    // .catch((err) => {
    //     console.log(err.message);
    // })
}

module.exports=configureDB