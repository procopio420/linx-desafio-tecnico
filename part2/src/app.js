const fileSystem = require('fs');
const readline = require('readline');
const axios = require('axios');
const { cpuUsage } = require('process');

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
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function sanitizeImages(arrayImages) {
  const goodImages = [];
  const promises = [];
  let i = 0;
  arrayImages.forEach((imageUrl) => {
    promises.push(
      axios
        .get(imageUrl)
        .then((_) => goodImages.push(imageUrl))
        .catch((e) => console.log(e)),
    );
  });
  console.log(promises);
  await Promise.all(promises);
  await sleep(1000);
  return goodImages;
}

async function main() {
  const input = await processLineByLine('./input-dump');
  const final = [];
  const promises = [];
  Object.entries(input).forEach(async (product) => {
    await sanitizeImages(product[1]).then((goodImages) =>
      final.push({ productId: product[0], images: goodImages }),
    );
  });
  console.log(final);
}

main();
