const fileSystem = require('fs');
const readline = require('readline');
const axios = require('axios');
const { url } = require('inspector');

async function processLineByLine(input) {
  const response = {};
  const readStream = fileSystem.createReadStream(input);
  const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const { productId, image } = JSON.parse(line);
    if (response[productId] && Array.isArray(response[productId])) {
      response[productId].push(image);
    } else {
      response[productId] = [image];
    }
  }

  return response;
}

async function sanitizeImages(arrayImages) {
  const goodImages = [];
  const promises = [];
  arrayImages.forEach((imageUrl) => {
    promises.push(
      axios
        .get(imageUrl)
        .then((_) => goodImages.push(imageUrl).catch((e) => console.log(e))),
    );
  });

  await Promise.all(promises);

  return goodImages;
}

async function main() {
  const input = await processLineByLine('./input-dump');
  const final = [];
  Object.entries(input).forEach(async (product) => {
    final.push({
      productId: product[0],
      images: await sanitizeImages(product[1]),
    });
  });
}

main();
