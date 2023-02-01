const tools = [
  { id: 1, name: "Rasel" },
  { id: 2, name: "Shakib" },
  { id: 3, name: "Sohan" },
];

module.exports.getAllTools = (req, res, next) => {
  const { limit, page } = req.query;
  res.json(tools);
};

module.exports.saveATools = (req, res, next) => {
  res.send("Save A Tools.");
};

module.exports.getToolDetail = (req, res, next) => {
  const { id } = req.params;
  const filter = { _id: id };
  const foundTool = tools.find((tool) => tool.id === Number(id));
  res.send("Tools Details Found.", foundTool);
};

// module.exports = {
//   getAllTools,
// };
