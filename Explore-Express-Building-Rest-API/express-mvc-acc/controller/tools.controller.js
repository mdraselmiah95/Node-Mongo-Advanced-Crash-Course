module.exports.getAllTools = (req, res, next) => {
  const { ip, query, params, body, headers } = req;
  const {} = res;
  res.send("Tools Found.");
  res.json({ Name: "Rohim" });
};

module.exports.saveATools = (req, res, next) => {
  res.send("Save A Tools.");
};

module.exports.getToolDetail = (req, res, next){
  res.send("Tools Details Found.");
}

// module.exports = {
//   getAllTools,
// };
