const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const target = path.resolve(__dirname, "src/public/images/heros");
const destination = path.resolve(__dirname, "dist/images/heros");

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

fs.readdirSync(target).forEach((image) => {
  const imagePath = `${target}/${image}`;
  const outputLarge = `${destination}/${image.split(".").slice(0, -1).join(".")}-large.jpg`;
  const outputSmall = `${destination}/${image.split(".").slice(0, -1).join(".")}-small.jpg`;

  try {
    // Mengubah ukuran gambar dengan lebar 800px, dengan prefix -large.jpg
    sharp(imagePath)
      .resize(800)
      .toFile(outputLarge)
      .then(() => console.log(`Generated ${outputLarge}`))
      .catch((err) => console.error(`Error generating ${outputLarge}:`, err));

    // Mengubah ukuran gambar dengan lebar 480px, dengan prefix -small.jpg
    sharp(imagePath)
      .resize(480)
      .toFile(outputSmall)
      .then(() => console.log(`Generated ${outputSmall}`))
      .catch((err) => console.error(`Error generating ${outputSmall}:`, err));
  } catch (err) {
    console.error(`Error processing ${imagePath}:`, err);
  }
});
