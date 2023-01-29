import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from './MongoDb/connect.js'
const port = 8080;
dotenv.config();
import postRoutes from './routes/postRoutes.js';
import DalleRoutes from './routes/DalleRoutes.js';
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use('/api/v1/post',postRoutes)
app.use('/api/v1/dalle',DalleRoutes)
app.get("/", async (req, res) => {
  res.send("Helllo from DOLL-E 2.O !  ");
});

const startServer = async () => {

   try {
    connectDB(process.env.MONGODB_URL)
    
   } catch (error) {
    console.log("the error is: " + error)
   }

  app.listen(port,() => {
    console.log(`server has started at port http://localhost:${port}`);
  });
};
startServer();
