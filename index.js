const fs = require('fs')
const path = require('path')
const http = require('http')



http.createServer((req, res) => {
    
    if(req.method === 'GET') {

        const file = req.url == '/' ? 'index.html' : req.url
        const filepath = path.join(__dirname, 'public' , file)
        const fileExtension = path.extname(filepath)
        const allowedTypes = ['.html', '.js', '.css']
        const comparator = allowedTypes.find( e => e == fileExtension)

        if(!comparator) {
            return
        }
        
        fs.readFile(filepath, (err, data) => {
            if (err) {
                throw new Error(err)
            }
            
            res.end(data)
            
        })
            
    }

}).listen(5000, () => console.log("Server is running"))