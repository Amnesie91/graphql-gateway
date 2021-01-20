const { cars } = require("../data");
const { findCarById, findAllCars } = require("./utils");

const resolvers = {
  Car: {
    _resolveReference({ id }) {
      return findCarById(id);
    },
  },
  Query: {
    car(_, { id }) {
      return findCarById(id);
    },
    cars() {
      return findAllCars();
    },
  },
  Mutation: {
    updateCar(_, { id, name }) {
      const car = findCarById(id);
      car.name = name;
      return car;
    },
  },
  Account: {
    cars: (acc) => cars.filter((car) => car.userId === acc.id),
  },
};

module.exports = {
  resolvers,
};
