const http = require('http');
const fspromises = require('fs/promises');
const server = http.createServer(async (req, res) => {
    res.setHeader("content-type", "text/html");
   
    const url=req.url;
    if(url=='/') {
        const data = await fspromises.readFile("./pages/home.html");
        res.end(data);
    }

    else if (url=='/about')
    {
        const data = await fspromises.readFile("./pages/about.html");
        res.end(data);
            
    }

    else 
    {
        const data = await fspromises.readFile("./pages/error.html");
        res.end(data);
        
    }

   

   



 
});

server.listen(8080, () => {
    console.log('Server is running on port 8080');
});
