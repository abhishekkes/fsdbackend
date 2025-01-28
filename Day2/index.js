const http = require('http');

const server = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    // const data=await fetch('https://dummyjson.com/products');
    // console.log(data);
    

    const fetchResponse = await fetch("https://dummyjson.com/products");
    const data = await fetchResponse.json();
    const { products } = data;

    res.setHeader("content-type", "text/html");

    res.write(`<html>
                    <style>
                        body{
                            padding: 2rem;
                            background-color: yellow;
                            display: flex;
                            flex-direction: column;
                            gap: 2rem;
                        }

                        div{
                            width: 400px;
                            background: lime;
                            padding: 2rem;
                        }
                    </style>
            <body>`);

    products.forEach((elem) => {
        res.write(`
            <div>
                <h1>${elem.title}</h1>
                <p>${elem.description}</p>
                <img src="${elem.thumbnail}" height='200'>
            </div>
        `);
    });

    res.end(`</body>
        </html>`);
});

server.listen(8080, () => {
    console.log('Server is running on port 8080');
});
