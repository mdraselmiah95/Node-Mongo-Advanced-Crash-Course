// PENDING => RESOLVED => REJECTED

const myPromise = new Promise((resolve, reject) => {
  const user = "Rasel";

  if (!user) {
    reject("Something went wrong 💥");
  } else {
    setTimeout(() => {
      resolve({ name: "Rasel" });
    }, 2000);
  }
});

const userIds = [1, 2, 3, 4, 5, 6];
let userData = [];

for (let i = 0; i < userIds.length; i++) {
  const userId = userIds[i];
  myPromise.then((user) => {
    userData.push(user);
  });
}

console.log(userData);

myPromise.then((res) => console.log(res)).catch((err) => console.log(err));
