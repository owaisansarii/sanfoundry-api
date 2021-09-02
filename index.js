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
  let { page, size, all } = req.query;
  if (!page) page = 1;
  if (!size) size = 10;
  const limit = parseInt(size);
  const skip = (page - 1) * size;

  let fname = req.params.fname;
  fname = fname.replace(":", "");
  if (fname.includes("/")) fname = fname.replace("/", "-");
  console.log(fname);
  const data = await getJsonFile(fname);
  const total = data.length;
  const result = data.slice(skip, skip + limit);
  if (all === "true") {
    res.json({
      total,
      result: data,
    });
  } else {
    res.json({
      total,
      result,
    });
  }
});

//default message to invalid route
app.get("*", (req, res) => {
  res.send("Invalid route, use /api/titleName");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
