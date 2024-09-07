import { app } from "./app.js";
import {connectDB} from "./db/db.js";
import dotenv from "dotenv"

dotenv.config({
  path: "./.env"
});

connectDB()
  .then(()=>{
    app.listen(3000, () =>{
      console.log(`Server is running on port 3000`);
    }) 
  }).catch((error)=>{
    console.log(`Error occured while connecting to the DataBase ${error}`);
    
  })
