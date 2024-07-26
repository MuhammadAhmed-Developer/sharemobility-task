const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.url === '/messagesWithId3' && req.method === 'GET') {
        serveJsonFile('data/messages.json', (allMessages) => dataFilter(allMessages, "3", "chatid",res));
    } else if (req.url === '/messagesWithId8' && req.method === 'GET') {
        serveJsonFile('data/messages.json', (allMessages) => dataFilter(allMessages, "8","chatid", res));
    } else if (req.url === '/usersWithId100' && req.method === 'GET') {
        serveJsonFile('data/users.json', (allUsers) => dataFilter(allUsers, "100","user", res));
    } else if (req.url === '/messagesWithId459' && req.method === 'GET') {
        serveJsonFile('data/messages.json', (allMessages) => dataFilter(allMessages, "459","user", res));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const dataFilter = (fileData, filterId, idType, res) => {
    console.log(filterId);
    try {
        const parsedData = JSON.parse(fileData);
        let data;
        if (parsedData[0] && parsedData[0].hasOwnProperty('chatid')) {
            if (idType==="user") {
                data = parsedData.filter((obj) => obj.id == filterId);
            } else {
                data = parsedData.filter((obj) => obj.chatid == filterId);
            }

        } else {
            data = parsedData.filter((obj) => obj.id == filterId);
        }
        console.log(data);
        if (!data || data.length === 0) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    } catch (error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
    }
};

const serveJsonFile = (filePath, filterFunction) => {
    const absolutePath = path.join(__dirname, filePath);
    fs.readFile(absolutePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        filterFunction(data);
    });
};

server.listen(3000);
