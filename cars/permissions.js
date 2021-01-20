const { and, or, rule, shield } = require("graphql-shield");
const { findCarById } = require("./utils");

function getPermissions(user) {
  if (user && user["https://awesomeapi.com/graphql"]) {
    return user["https://awesomeapi.com/graphql"].permissions;
  }
  return [];
}

const isAuthenticated = rule()((parent, args, { user }) => {
  return user !== null;
});

const canReadAnyCar = rule()((parent, args, { user }) => {
  const userPermissions = getPermissions(user);
  return userPermissions.includes("read:any_car");
});

const canReadOwnCar = rule()((parent, args, { user }) => {
  const userPermissions = getPermissions(user);
  return userPermissions.includes("read:own_car");
});

const canWriteOwnCar = rule()((_, __, { user }) => {
  const userPermissions = getPermissions(user);
  return userPermissions.includes("write:own_car");
});

const isReadingOwnCar = rule()((parent, args, context) => {
  const { user } = context;
  const { id } = args;
  const car = findCarById(id);
  return user && user.sub === car.userId;
});

const permissions = shield({
  Query: {
    car: or(and(canReadOwnCar, isReadingOwnCar), canReadAnyCar),
    cars: canReadAnyCar,
  },
  Mutation: {
    updateCar: and(canWriteOwnCar, isReadingOwnCar),
  },
});

module.exports = { permissions };
