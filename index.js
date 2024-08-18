import express from 'express';
import fs from 'fs';
import path from 'path';

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    try {
        const today = new Date().toISOString().replace(/:/g, '-')
        const filePath = path.join('TimeStamp', `${today}.txt`);

        fs.writeFileSync(filePath, today, 'utf8');
        const data = fs.readFileSync(filePath, 'utf8');
        res.status(200).send(data);

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.get('/getTextFiles', (req, res) => {
    const folderPath = 'TimeStamp';

    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred while listing the files from the directory');
        } else {
            const textFiles = files.filter((file) => path.extname(file) === '.txt');
            res.status(200).json(textFiles);
        }
    });
});

app.listen(PORT, () => { console.log(`listening on port ${PORT}`) })