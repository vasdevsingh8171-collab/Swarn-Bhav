import fs from 'fs';
import path from 'path';

// 1x1 Gold Color Pixel (Valid PNG Buffer)
const goldPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
const buffer = Buffer.from(goldPngBase64, 'base64');

const resDir = path.join('android', 'app', 'src', 'main', 'res');

function replaceIcons(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceIcons(fullPath);
    } else if (file.startsWith('ic_launcher') && file.endsWith('.png')) {
      fs.writeFileSync(fullPath, buffer);
    }
  }
}

replaceIcons(resDir);
console.log('App icons replaced successfully!');
