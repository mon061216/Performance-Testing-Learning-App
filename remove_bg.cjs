const Jimp = require('jimp');

async function removeBackground() {
  try {
    const image = await Jimp.read('public/cat_mascot.png');
    // Get the color of the top-left pixel to use as the background color
    const bgColor = image.getPixelColor(0, 0);
    const { r: bgR, g: bgG, b: bgB } = Jimp.intToRGBA(bgColor);
    
    // Tolerance for background color matching
    const tolerance = 25; 

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      const diffR = Math.abs(r - bgR);
      const diffG = Math.abs(g - bgG);
      const diffB = Math.abs(b - bgB);
      
      if (diffR < tolerance && diffG < tolerance && diffB < tolerance) {
        this.bitmap.data[idx + 3] = 0; // Set alpha to 0 (transparent)
      }
    });

    await image.writeAsync('public/cat_mascot_transparent.png');
    console.log('Background removed successfully');
  } catch (err) {
    console.error('Error removing background:', err);
  }
}

removeBackground();
