import got from "got";
import { load } from "cheerio";
var ans_cnt = 1;
let json = [];

const extractLinks = async (url) => {
  try {
    const response = await got(url);
    const html = response.body;
    const links = [];
    const $ = load(html);
    $(".sf-section a").each(function () {
      var link = $(this).attr("href");
      links.push(link);
    });
    return links;
  } catch (error) {
    console.log(error);
  }
};

const mcqScrap = async (url) => {
  // console.log("Scraping: " + url);
  try {
    const response = await got(url);
    const html = response.body;
    const $ = load(html);
    $(".sf-mobile-ads").remove(); //removing ads
    $(".sf-desktop-ads").remove(); //removing ads
    var b = [];
    var ans = [];
    $(".entry-content .collapseomatic").each(function () {
      var id = $(this).attr("id");
      $(this).remove();
      if (id) {
        ans.push($("#target-" + id).text());
      }
    });
    var done = 0;
    //-------------------//
    $(".entry-content p").each(function () {
      var arr = $(this).text().split("\n");
      if (arr.length != 6) return;
      var ques = $(this).text();
      let string = ques.trim().split("\n");
      let question = string.shift().replace(/^[0-9]+. /g, "");
      let option = string;
      let answer = ans.shift().split("\n")[0];
      json.push({
        id: ans_cnt,
        Question: question,
        Options: option,
        Answer: answer,
      });
      ans_cnt++;
    });
  } catch (error) {
    console.log("error");
  }
};

const extractMcq = async (URL) => {
  let fname = URL.toString();
  fname = fname.replace("https://www.sanfoundry.com/", " ");
  fname = fname.slice(1, -1);
  fname = fname.replace("1000", "");
  fname = fname.replace("-questions-answers", "").trim();
  fname = fname.replace(/-/g, " ");
  fname = fname.trim();
  fname = fname.replace(/ /g, "_");
  fname = fname.replace("/", "");
  // console.log("Extracting: " + fname);
  let li = await extractLinks(URL);
  let ctr = 0;
  let num = li.length;
  // console.time("Scraping took: ");
  for (let i = 0; i < num; i++) {
    ctr++;
    await mcqScrap(li[i]);
  }
  // console.timeEnd("Scraping took: ");
  if (ctr === num) {
    return json;
  }
};
export default extractMcq;
