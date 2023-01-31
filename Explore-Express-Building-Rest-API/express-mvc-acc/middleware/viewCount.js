let count = 0;
const viewCount = (req, res, next) => {
  count++;
  console.log(count);

  //   res.send("Toots Found");
  next();
};
module.exports = viewCount;
