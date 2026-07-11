const Jimp = require('jimp');

async function removeBackground(imagePath) {
    const image = await Jimp.read(imagePath);
    const width = image.bitmap.width;
    const height = image.bitmap.height;

    // Use a queue for flood fill
    const queue = [[0, 0]];
    const visited = new Set();
    const targetColor = image.getPixelColor(0, 0);

    // We assume the top-left pixel is the background color (white)
    // We will set alpha to 0 for all contiguous pixels matching targetColor
    const transparentColor = 0x00000000;

    while (queue.length > 0) {
        const [x, y] = queue.pop();
        const key = `${x},${y}`;

        if (visited.has(key)) continue;
        visited.add(key);

        if (x < 0 || x >= width || y < 0 || y >= height) continue;

        const currentColor = image.getPixelColor(x, y);

        // Calculate color difference to allow slight anti-aliasing (tolerance)
        const r1 = (currentColor >> 24) & 255;
        const g1 = (currentColor >> 16) & 255;
        const b1 = (currentColor >> 8) & 255;

        const r2 = (targetColor >> 24) & 255;
        const g2 = (targetColor >> 16) & 255;
        const b2 = (targetColor >> 8) & 255;

        const diff = Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2);

        if (diff < 15) { // Tolerance
            image.setPixelColor(transparentColor, x, y);
            queue.push([x + 1, y]);
            queue.push([x - 1, y]);
            queue.push([x, y + 1]);
            queue.push([x, y - 1]);
        }
    }

    await image.writeAsync(imagePath);
    console.log(`Removed background for ${imagePath}`);
}

async function main() {
    try {
        await removeBackground('public/mascot_cheering.png');
        await removeBackground('public/mascot_encouraging.png');
        await removeBackground('public/mascot_sleepy.png');
    } catch (e) {
        console.error(e);
    }
}

main();
