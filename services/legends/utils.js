const { legends, skills } = require("../../data");

function findLegendById(id) {
  const legend = legends.find((legend) => legend.id === id);
  if (!legend) throw Error("No such legend exists!");
  return legend;
}

function findAllLegends() {
  return legends;
}

function findLegendByAccountId(id) {
  return legends.find((legend) => legend.ownerId === id);
}

function findLegendsByAccountId(id) {
  console.log("legends: ", legends);
  const res = legends.filter((legend) => legend.ownerId === id);
  console.log("legends: ", res, "for id: ", id);
  return res;
}

function findSkillById(id) {
  const skill = skills.find((skill) => skill.id === id);
  if (!skill) throw Error("No such skill exists!");
  return skill;
}

function findAllSkills() {
  return skills;
}

function findSkillByAccountId(id) {
  return skills.find((skill) => skill.ownerId === id);
}

function findSkillsByAccountId(id) {
  return skills.filter((skill) => skill.ownerId === id);
}

function findAllSkillsForLegendId(id) {
  return skills.filter((skill) => skill.legendId === id);
}

module.exports = {
  findLegendById,
  findAllLegends,
  findSkillById,
  findAllSkills,
  findLegendByAccountId,
  findSkillByAccountId,
  findLegendsByAccountId,
  findSkillsByAccountId,
  findAllSkillsForLegendId,
};
