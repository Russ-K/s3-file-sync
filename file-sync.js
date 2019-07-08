const fs = require('fs.promises');
const path = require('path');
const md5File = require('md5-file');

async function walk(dir, fileList = []) {
  const files = await fs.readdir(dir)
  for (const file of files) {
    const stat = await fs.stat(path.join(dir, file))
    if (stat.isDirectory())
      fileList = await walk(path.join(dir, file), fileList)
    else {
      const filePath = path.join(dir, file);
      const fileDeets = {
        'path': filePath,
        'md5': md5File.sync(filePath)
      }

      fileList.push(fileDeets)
    }
  }
  return fileList
}

walk('W:/_scratch/').then((res) => {
  console.log(res)
})