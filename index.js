import express from "express";
import cors from "cors";
import { readFileSync } from "fs";

const PORT = process.env.PORT || 3002;
const app = express();

//read json file from "./saved" and return it
const getJsonFile = async (title) => {
  const data = readFileSync(`./saved/${title}.json`, "utf8");
  return JSON.parse(data);
};

app.use(
  cors({
    origin: "*",
    methods: "GET",
  })
);

app.get("/api/:fname", async (req, res) => {
  var fname = req.params.fname;
  fname = fname.replace(":", "");
  if (fname.includes("/")) fname = fname.replace("/", "-");
  console.log(fname);
  let json = await getJsonFile(fname);
  res.json(json);
});

//default message to invalid route
app.get("*", (req, res) => {
  res.send("Invalid route \n use /api/titleName");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
