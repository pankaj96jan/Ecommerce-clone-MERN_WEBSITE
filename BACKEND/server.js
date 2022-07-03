const app = require("./app")
const dotenv = require("dotenv")
const configureDB = require("./config/database")

//handled uncaught expextion

process.on("uncaughtException",err=>{
    console.log(`Erorr:${err.message}`)
    console.log(`shutting down the server due to uncaughtException`);
    process.exit(1)
})

// congif
dotenv.config({ path: "BACKEND/config/config.env" })
configureDB()

const server = app.listen(process.env.PORT, () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`);
})
//unhandled Promise rejection   
process.on("unhandledRejection", err => {
    console.log(`Erorr:${err.stack}`)
    console.log(`shutting down the server due to  unhandled promise rejection`);


    server.close(()=>{
        process.exit(1)
    })
})

