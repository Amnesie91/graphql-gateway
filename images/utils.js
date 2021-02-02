const { images } = require("../data");

function findImageById(id) {
  const image = images.find((image) => image.id === id);
  if (!image) throw Error("No such Image exists!");
  return image;
}

function findAllImages() {
  return images;
}

function findImagesByAccountId(id) {
  return images.find((image) => image.ownerId === id);
}

module.exports = {
  findImageById,
  findAllImages,
  findImagesByAccountId,
};
