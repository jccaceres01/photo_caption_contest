const randomNumber = (limit) => {
  return Math.ceil(Math.random() * limit);
};

const randomNumberWithZero = (limit) => {
  return Math.floor(Math.random() * (limit + 1));
};

module.exports = {
  randomNumber,
  randomNumberWithZero
};
