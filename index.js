const fs= require("fs")
const http=require('http')
const url=require('url')
const replaceTemplete = require('./module/replaceTemplete')
// const data=fs.readFileSync('./txt/input.txt','utf-8')

// console.log(data)

// const input=`The things we know about the dat is :${data}.\n creatd on date ${Date.now()}`

// fs.writeFileSync('./txt/output.txt',input)
// console.log("FIle created")

// fs.readFile('./txt/start.txt','utf-8',(err,data1)=>{
//   fs.readFile(`./txt/${data1}.txt`,'utf-8',(er,data2)=>{
//     fs.readFile('.text/append.txt','utf-8',(err,data3)=>{
//         fs.writeFile('./text/final',`${data1}\n${data2}\n${data3}`,()=>{
//             console.log("DATA ADDED")
//         })
//     })
//   })
// })
 
////////SERVER

const TempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`,'utf-8')
const TempCard = fs.readFileSync(`${__dirname}/templates/card.html`,'utf-8')
const TempProduct= fs.readFileSync(`${__dirname}/templates/product.html`,'utf-8')
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')
    const output= JSON.parse(data)

const server=http.createServer((req,res)=>{
    const request=req.url
    const {query,pathname}=url.parse(req.url,true)

    //overview
    if (pathname ==='/' || pathname ==='/home'){
        res.writeHead(200,{"content-type":"text/html"})
        const cardsHtml=output.map(el=>replaceTemplete(TempCard,el)).join('')
        const disp=TempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml)
        res.end(disp)
    //product
    }else if(pathname=='/product'){
        res.writeHead(200,{"contnt-type":"text/html"})
        const product=output[query.id]
        const output1=replaceTemplete(TempProduct,product)

        res.end(output1)
    //api
    }else if(pathname=='/api'){
       
            res.writeHead(200,{"content-type":"application/json" })
            res.end(data)
    //not found    
    }else{
        res.statusCode=404
        res.end("<h1>ERORR 404</h1><h1>PAGE  NOT  FOUND</h1>")
    }

})

server.listen(8000,()=>{
    console.log('listening at port 8000')
})