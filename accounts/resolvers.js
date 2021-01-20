const { accounts } = require("../data");
const {
  createAccessToken,
  findAccountWithEmailAndPassword,
  createRefreshToken,
  verfiyRefreshToken,
  findAccountById,
  saveToken,
  deleteToken,
} = require("./utils");

const resolvers = {
  Account: {
    _resolveReference(object) {
      return findAccountById(object.id);
    },
  },
  Query: {
    account(_, { id }) {
      return findAccountById(id);
    },
    accounts() {
      return accounts;
    },
    viewer(_, __, { user }) {
      return findAccountById(user.sub);
    },
  },
  Mutation: {
    login(_, { email, password }) {
      const { id, permissions, roles } = findAccountWithEmailAndPassword(
        email,
        password
      );
      const access = createAccessToken({ roles, permissions }, id);
      const refresh = createRefreshToken(null, id);
      saveToken(refresh);

      return { access, refresh };
    },
    logout(_, { refresh }) {
      deleteToken(refresh);
      return true;
    },
    token(_, { refresh }) {
      const { sub } = verfiyRefreshToken(refresh);
      const account = findAccountById(sub);
      const { id, permissions, roles } = account;

      return createAccessToken({ roles, permissions }, id);
    },
  },
  Car: {
    owner: function (car) {
      return accounts.find((acc) => acc.id === car.userId);
    },
  },
};

module.exports = {
  resolvers,
};
