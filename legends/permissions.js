const { and, or, rule, shield } = require("graphql-shield");
const { findLegendById, findSkillById } = require("./utils");

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

const canReadAnyLegend = rule()((parent, args, { user }) => {
  const userPermissions = getPermissions(user);
  return userPermissions.includes("read:any_legend");
});

const canWriteAnyLegend = rule()((parent, args, { user }) => {
  const userPermissions = getPermissions(user);
  return userPermissions.includes("write:any_legend");
});

const canReadOwnLegend = rule()((parent, args, { user }) => {
  const userPermissions = getPermissions(user);
  return userPermissions.includes("read:own_legend");
});

const canWriteOwnLegend = rule()((_, __, { user }) => {
  const userPermissions = getPermissions(user);
  return userPermissions.includes("write:own_legend");
});

const isReadingOwnLegend = rule()((parent, { id }, { user }) => {
  const legend = findLegendById(id);
  console.log("is reading own legend: ", legend);
  return user && user.sub === legend.ownerId;
});

const canReadAnySkill = rule()((parent, args, { user }) => {
  const userPermissions = getPermissions(user);
  return userPermissions.includes("read:any_skill");
});

const canWriteAnySkill = rule()((parent, args, { user }) => {
  const userPermissions = getPermissions(user);
  return userPermissions.includes("write:any_skill");
});

const canReadOwnSkill = rule()((parent, args, { user }) => {
  const userPermissions = getPermissions(user);
  return userPermissions.includes("read:own_skill");
});

const canWriteOwnSkill = rule()((_, __, { user }) => {
  const userPermissions = getPermissions(user);
  return userPermissions.includes("write:own_skill");
});

const isReadingOwnSkill = rule()((parent, { id }, { user }) => {
  const skill = findSkillById(id);
  return user && user.sub === skill.ownerId;
});

const permissions = shield({
  Query: {
    legend: isAuthenticated,
    legends: isAuthenticated,
    skill: isAuthenticated,
    skills: isAuthenticated,
  },
  Mutation: {
    createLegend: isAuthenticated,
    updateLegend: or(
      and(canWriteOwnLegend, isReadingOwnLegend),
      canWriteAnyLegend,
      isAdmin
    ),
    deleteLegend: or(
      and(canWriteOwnLegend, isReadingOwnLegend),
      canWriteAnyLegend,
      isAdmin
    ),
    createSkill: isAuthenticated,
    updateSKill: or(
      and(canWriteOwnSkill, isReadingOwnSkill),
      canWriteAnySkill,
      isAdmin
    ),
    deleteSkill: or(
      and(canWriteOwnSkill, isReadingOwnSkill),
      canWriteAnySkill,
      isAdmin
    ),
  },
});

module.exports = { permissions };
