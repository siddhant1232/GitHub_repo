import express from "express"
import corse from "corse"
const app = express();
app.use(corse());

app.listen(5000,()=> console.log("server is running"));


