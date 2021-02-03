const { findImageById, findAllImages } = require("./utils");
const probe = require("probe-image-size");
const { images } = require("../../data");

const resolvers = {
  Image: {
    _resolveReference({ id }) {
      return findImageById(id);
    },
  },
  Query: {
    image(_, { id }) {
      return findImageById(id);
    },
    images() {
      return findAllImages();
    },
  },
  Mutation: {
    createImage: async (_, { upload }, { user }) => {
      const { mimetype, createReadStream, filename } = await upload;
      const stream = createReadStream();
      const data = await new Promise((resolve, reject) => {
        const buffers = [];
        stream.on("data", (data) => {
          buffers.push(data);
        });
        stream.on("end", () => {
          resolve(Buffer.concat(buffers));
        });
        stream.on("error", reject);
      });
      const imgData = probe.sync(data);
      if (!imgData) {
        throw new Error("Could not probe image size");
      }
      const { width, height } = imgData;
      const image = {
        id: images.length.toString(),
        ownerId: user.sub,
        width,
        height,
        data: data.toString("base64"),
        fileName: filename,
        mime: mimetype,
      };
      images.push(image);
      return { result: image };
    },
  },
};

module.exports = {
  resolvers,
};
