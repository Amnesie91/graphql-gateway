const { legends, skills } = require("../../data");
const {
  findSkillById,
  findLegendById,
  findAllLegends,
  findAllSkills,
  findLegendByAccountId,
  findLegendsByAccountId,
  findSkillsByAccountId,
  findAllSkillsForLegendId,
} = require("./utils");

const resolvers = {
  Legend: {
    _resolveReference({ id }) {
      return findCarById(id);
    },
    skills: (legend) => findAllSkillsForLegendId(legend.id),
  },
  Skill: {
    _resolveReference({ id }) {
      return findSkillById(id);
    },
  },
  Account: {
    legends: (acc) => findLegendsByAccountId(acc.id),
    skills: (acc) => findSkillsByAccountId(acc.id),
  },
  Query: {
    legend(_, { id }) {
      return findLegendById(id);
    },
    legends() {
      return findAllLegends();
    },
    skills() {
      return findAllSkills();
    },
    skill(_, { id }) {
      return findSkillById(id);
    },
  },
  Mutation: {
    createLegend(_, { data }, { user }) {
      const legend = {
        id: legends.length.toString(),
        ownerId: user.sub,
      };
      Object.assign(legend, data);
      legends.push(legend);
      console.log("current legends: ", legends);
      return { result: legend };
    },
    updateLegend(_, { id, data }) {
      const legend = findLegendById(id);
      Object.assign(legend, data);
      return { result: legend };
    },
    deleteLegend(_, { id }) {
      const index = legends.findIndex((legend) => legend.id === id);
      if (index != -1) legends.splice(index, 1);
      return true;
    },
    createSkill(_, { legendId, data }, { user }) {
      findLegendById(legendId);
      const skill = {
        legendId,
        id: skills.length.toString(),
        ownerId: user.sub,
      };
      Object.assign(skill, data);
      skills.push(skill);
      return { result: skill };
    },
    updateSKill(_, { id, data }) {
      const skill = findSkillById(id);
      Object.assign(skill, data);
      return { result: skill };
    },
    deleteSkill(_, { id }) {
      const index = skills.findSkillById(id);
      if (index != -1) skills.splice(index, 1);
      return true;
    },
  },
};

module.exports = {
  resolvers,
};
