let tools = [
  { id: 1, name: "Rasel" },
  { id: 2, name: "Shakib" },
  { id: 3, name: "Sohan" },
];

module.exports.getAllTools = (req, res, next) => {
  const { limit, page } = req.query;
  res.json(tools);
};

module.exports.saveATools = (req, res, next) => {
  console.log(req.body);
  tools.push(req.body);
  res.send("Save A Tools.");
};

module.exports.getToolDetail = (req, res, next) => {
  const { id } = req.params;
  const filter = { _id: id };
  const foundTool = tools.find((tool) => tool.id === Number(id));
  res.send("Tools Details Found.", foundTool);
};

module.exports.updateTool = (req, res, next) => {
  // const newData = req.body;
  const { id } = req.params;
  const filter = { _id: id };
  const newData = tools.find((tool) => tool.id === Number(id));
  newData, (id = id);
  newData.name = req.body.name;
  res.send("TOOL");
};

module.exports.deleteTool = (req, res) => {
  const { id } = req.params;
  const filter = { _id: id };
  tools.filter((tool) => tool.id !== Number(id));
  res.send(tools);
};
// module.exports = {
//   getAllTools,
// };
