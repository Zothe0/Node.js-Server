const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) =>{

    //! Проверяем какой реквест прилетел, если пустой url то респонсим главную страницу, иначе - по пути url.
    let filePath
    if((req.url ==='/') || (req.url === '/index.html')){
        filePath = path.join(__dirname, 'index.html')
    }else{filePath = path.join(__dirname, req.url)}

    //! Смотрим какое расширение у запрашиваемого файла, и соответсвенно меняем хедер в респонсе для указанного типа см. строка 34
    let contentType = ''
    switch(path.extname(filePath)){
        case '.html':
            contentType = 'text/html'
            break
        case '.css':
            contentType = 'text/css'
            break
        case '.js':
            contentType = 'text/javascript'
            break
        default:
            contentType = 'text/html'
    }

    //! Читаем запрашиваемый файл и респонсим дату из него.
    fs.readFile(filePath, (err, data) =>{
        if(err) throw err
        res.writeHead(200, {
            //! То самое изменение хедера
            'Content-Type': contentType,
            'Cache-Control': 'no-cache'
          })
        res.end(data)
    })
})

//! Если порт указан програмно то берём его, если нет то ставим дефолтный - 3000
const PORT = process.env.PORT || 3000
//! Запускаем сервер! 
server.listen(PORT, ()=>{
    console.log('Server running on: '+PORT)
})