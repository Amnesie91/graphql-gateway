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
  return user !== null;
});

const isAdmin = rule()(() => {
  return getRoles(user).contains("admin");
});

const permissions = shield({
  Query: {
    image: isAuthenticated,
    images: isAuthenticated,
  },
  Mutation: {
    createImage: isAuthenticated,
  },
});

module.exports = { permissions };
