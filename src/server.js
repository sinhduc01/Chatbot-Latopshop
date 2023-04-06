import express from "express";
import viewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";

let app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//config view engine
viewEngine(app);


//parse request to json


//init web routes
initWebRoutes(app);

let port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Chatbot is running at port:" + port);
})