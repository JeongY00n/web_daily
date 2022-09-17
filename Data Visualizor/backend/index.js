const express = require("express");
const axios = require("axios")
const app = express();
const PORT = 8080;
const dotenv = require("dotenv")
dotenv.config();

const cors = require("cors");
app.use(cors());

const morgan = require("morgan");
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({extended : false}))

// filesystem node저장 객체
const fs = require("fs")



app.get("/", async (req, res) => {
  return res.json({
    test: "OK",
  });
});


app.post("/data", async (req,res) => {
  console.log(req.body)
  
  try{
    const URL = "https://openapi.naver.com/v1/datalab/search"
    
    // const startDate = req.body.startDate

    const { startDate, endDate, timeUnit, keywordGroups, device, gender } = req.body

    const request_body = {
      startDate,
      endDate, 
      timeUnit, 
      keywordGroups, 
      // all인 경우 "", all이 아닌 경우 device
      device : device === "all" ? "" : device,
      gender : gender === "all" ? "" : gender,
    };
  
    const headers = {
      // env의 변수에 접근 => process사용
      'X-Naver-Client-Id': process.env.CLIENT_ID,
      'X-Naver-Client-Secret': process.env.CLIENT_SECRET,
      'Content-Type': 'application/json'
    }
  
  
    const result = await axios.post(URL, request_body,{
      headers : headers
    })
  
    // fs.writeFile("경로", "넣을 값", "콜백함수")
    fs.writeFile("./uploads/chart.json", JSON.stringify(result.data['results']), function(error){
      console.log(error)
      if(error) throw error;
    })
    return res.json(result.data)

  }catch(error){
    console.log(error);
    return res.json(error)
  }

});

app.get("/data", (req,res)=>{

  try{
    res.set('Content-Type', 'application/json; charset=utf-8');
    const tempFile = fs.createReadStream('uploads/chart.json');
    return tempFile.pipe(res);
  }catch(error){
    console.log(error);
    return res.json(error)
  }
});

app.delete("/data",(req,res)=>{
  fs.unlink('uploads/chart.json', function(error){
    if(error){
      console.log(error);
      return res.json("Fail")
    }
  });

  return res.json("OK")
})

app.listen(PORT, () => console.log(`this server listening on ${PORT}`));
