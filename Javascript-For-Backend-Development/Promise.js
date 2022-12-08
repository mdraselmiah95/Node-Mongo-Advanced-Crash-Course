// PENDING => RESOLVED => REJECTED

const myPromise = new Promise((resolve, reject) => {
  const user = null;

  if (!user) {
    reject("Something went wrong 💥");
  } else {
    setTimeout(() => {
      resolve("Successfully Got The Data");
    }, 2000);
  }
});

myPromise.then((res) => console.log(res)).catch((err) => console.log(err));
