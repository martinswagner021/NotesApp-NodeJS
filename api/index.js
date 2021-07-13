const http = require('http')
const URL = require('url')
const fs = require('fs')
const path = require('path')

const data = require('./urls.json')

function writeData() {
    fs.writeFile(
     path.join(__dirname,'urls.json'),
      JSON.stringify(data, null, 2),
       (err) => {
         if(err){
             throw new Error(err)
         }
    })
}


http.createServer((req, res) => {
    const  { name, url, del } = URL.parse(req.url, true).query

    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
    })
    
    // Get all the urls in an array
    if(req.url === '/') {
        res.end(JSON.stringify(data.urls))
    }
    
    // Delete an existent url
    if(del) {
        data.urls = data.urls.filter(e => String(e.url) !== String(url))
        writeData()
        return res.end(JSON.stringify({message:"ok"}))
    }

    // Save new url
    if(name, url) {
        data.urls.push({name, url})
        console.log(name, url)
        writeData()
        return res.end(JSON.stringify({message:"ok"}))
    }



}).listen(3000, () => console.log("API Server is running"))