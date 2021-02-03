const { posts } = require("../../data");

function findPostById(id) {
  const post = posts.find((post) => post.id === id);
  if (!post) throw Error("No such Post exists!");
  return post;
}

function findAllPosts() {
  console.log("posts: ", posts);
  return posts;
}

function findPostsByAccountId(id) {
  return posts.find((post) => post.ownerId === id);
}

module.exports = {
  findPostById,
  findAllPosts,
  findPostsByAccountId,
};
