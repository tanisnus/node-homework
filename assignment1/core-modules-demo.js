const os = require('os');
const path = require('path');
const fs = require('fs');

const sampleFilesDir = path.join(__dirname, 'sample-files');
if (!fs.existsSync(sampleFilesDir)) {
  fs.mkdirSync(sampleFilesDir, { recursive: true });
}

// OS module
console.log('Platform:', os.platform());
const cpus = os.cpus();
console.log('CPU:', cpus.length ? cpus[0].model : 'unknown');
console.log('Total Memory:', os.totalmem());



// Path module
const joinedPath = path.join(__dirname, 'sample-files', 'folder', 'file.txt');
console.log('Joined path:', joinedPath);


// fs.promises API
const sampleFilesDirPath = path.join(__dirname, 'sample-files');
const demoFilePath = path.join(sampleFilesDirPath, 'demo.txt');

async function readDemoFile() {
  try {
    await fs.promises.writeFile(demoFilePath, "Hello from fs.promises!");
    const data = await fs.promises.readFile(demoFilePath, 'utf8');
    console.log('fs.promises read:', data);
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

readDemoFile();


// Streams for large files- log first 40 chars of each chunk
