const { and, or, rule, shield } = require("graphql-shield");

function getPermissions(user) {
  if (user && user["https://awesomeapi.com/graphql"]) {
    return user["https://awesomeapi.com/graphql"].permissions;
  }
  return [];
}

function getRoles(user) {
  if (user && user["https://awesomeapi.com/graphql"]) {
    return user["https://awesomeapi.com/graphql"].roles;
  }
  return [];
}

const isAuthenticated = rule()((parent, args, { user }) => {
  const isAuth = user !== null;
  console.log("isAuth user: ", isAuth);
  return isAUth;
});

const isAdmin = rule()(() => {
  return getRoles(user).contains("admin");
});

const canReadAnyPost = rule()((parent, args, { user }) => {
  const userPermissions = getPermissions(user);
  return userPermissions.includes("read:any_post");
});

const canWriteAnyPost = rule()((parent, args, { user }) => {
  const userPermissions = getPermissions(user);
  return userPermissions.includes("write:any_post");
});

const canReadOwnPost = rule()((parent, args, { user }) => {
  const userPermissions = getPermissions(user);
  return userPermissions.includes("read:own_post");
});

const canWriteOwnPost = rule()((_, __, { user }) => {
  const userPermissions = getPermissions(user);
  return userPermissions.includes("write:own_post");
});

const isReadingOwnPost = rule()((parent, { id }, { user }) => {
  const post = findPostById(id);
  return user && user.sub === post.ownerId;
});

const permissions = shield({
  Query: {
    post: isAuthenticated,
    posts: isAuthenticated,
  },
  Mutation: {
    createPost: isAuthenticated,
    updatePost: or(and(canWriteOwnPost, isReadingOwnPost), isAdmin),
    deletePost: or(and(canWriteOwnPost, isReadingOwnPost), isAdmin),
  },
});

module.exports = { permissions };
