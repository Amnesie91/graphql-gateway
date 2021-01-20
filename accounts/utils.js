const jwt = require("jsonwebtoken");
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_LIFETIME,
  JWT_ALGORYTHM,
  REFRESH_TOKEN_LIFETIME,
} = require("../secrets");

const { accounts, jwts } = require("../data");

function createJwt(data, subject, secret, algorithm, expiresIn) {
  return jwt.sign({ "https://awesomeapi.com/graphql": data }, secret, {
    algorithm,
    subject,
    expiresIn,
  });
}

function createAccessToken(data, subject) {
  try {
    return createJwt(
      data,
      subject,
      ACCESS_TOKEN_SECRET,
      JWT_ALGORYTHM,
      ACCESS_TOKEN_LIFETIME
    );
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

function createRefreshToken(data, subject) {
  try {
    return createJwt(
      data,
      subject,
      REFRESH_TOKEN_SECRET,
      JWT_ALGORYTHM,
      REFRESH_TOKEN_LIFETIME
    );
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

function verifyAccessToken(token) {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

function verfiyRefreshToken(token) {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

function findAccountWithEmailAndPassword(email, password) {
  return accounts.find(
    (acc) => acc.email === email && acc.password === password
  );
}

function findAccountById(id) {
  return accounts.find((acc) => acc.id === id);
}

function saveToken(token) {
  jwts.push(token);
}

function deleteToken(token) {
  const index = jwts.findIndex((_token) => _token === token);
  if (index != -1) jwts.splice(index, 1);
}

module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verfiyRefreshToken,
  findAccountWithEmailAndPassword,
  findAccountById,
  saveToken,
  deleteToken,
};
