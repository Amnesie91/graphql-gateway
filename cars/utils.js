const { cars } = require("../data");

function findCarById(id) {
  const car = cars.find((car) => car.id === id);
  if (!car) throw Error("No such car exists!");
  return car;
}

function findAllCars() {
  return cars;
}

module.exports = {
  findCarById,
  findAllCars,
};
