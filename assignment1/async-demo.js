const fs = require('fs');
const path = require('path');

// → /Users/tanisnus/Desktop/Coding Courses/Code The Dream/node-homework/assignment1/sample-files
const sampleFilesDirPath = path.join(__dirname, 'sample-files');

// → /Users/tanisnus/Desktop/Coding Courses/Code The Dream/node-homework/assignment1/sample-files/sample.txt
const filePath = path.join(sampleFilesDirPath, 'sample.txt');


const folderExists = fs.existsSync(sampleFilesDirPath);

if (!folderExists) {
  fs.mkdirSync(sampleFilesDirPath)
}

fs.writeFileSync(filePath, 'Hello, async world!');


// 1. Callback style
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Could not read file:', err);
    return;
  }
  console.log('Callback read:', data);
});

// Callback hell example (test and leave it in comments):
/*

fs.readFile(fileA, 'utf8', (err, a) => {
  if (err) return console.error(err);
  fs.readFile(fileB, 'utf8', (err, b) => {
    if (err) return console.error(err);
    fs.readFile(fileC, 'utf8', (err, c) => {
      if (err) return console.error(err);
      console.log(a, b, c);
    });
  });
});

*/

// 2. Promise style
fs.promises
  .readFile(filePath, 'utf8')
  .then((data) => {
    console.log('Promise read:', data);
  })
  .catch((err) => {
    console.error('Could not read file:', err);
  });

// 3. Async/Await style
async function readWithAsyncAwait() {
  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    console.log('Async/Await read:', data);
  } catch (err) {
    console.error('Could not read file:', err);
  }
}

readWithAsyncAwait();
