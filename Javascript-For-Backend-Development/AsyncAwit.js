const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("SUCCESS");
  }, 2000);
});

async function getData() {
  const res = await promise;
  console.log(res);
}

getData();
