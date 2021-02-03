const { findPostById, findAllPosts } = require("./utils");
const { GraphQLScalarType, Kind } = require("graphql");
const { legends, posts } = require("../../data");

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10); // Convert hard-coded AST string to type expected by parseValue
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

const resolvers = {
  Post: {
    _resolveReference({ id }) {
      return findPostById(id);
    },
  },
  Date: dateScalar,
  Query: {
    post(_, { id }) {
      return findPostById(id);
    },
    posts() {
      return findAllPosts();
    },
  },
  Mutation: {
    createPost: async (_, { legendId, data }, { user }) => {
      const post = {
        id: posts.length.toString(),
        legendId,
        createdAt: new Date().now().getTime(),
        createdAt: new Date().now().getTime(),
        ownerId: user.sub,
        replies: [],
        ...data,
      };
      console.log("post: ", post);
      posts.push(post);
      return { result: post };
    },
    updatePost: async (_, { id, data }) => {
      const post = findPostById(id);
      Object.assign(post, {
        updatedAt: new Date().getTime(),
        ...data,
      });
      return { result: post };
    },
    deletePost: async (_, { id }) => {
      const index = posts.findIndex((_post) => _post.id === id);
      if (index != -1) posts.splice(index, 1);
      return true;
    },
  },
};

module.exports = {
  resolvers,
};
