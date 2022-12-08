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

async function getUser() {
  const res = await fetch("/");
  const user = await res.json();

  const res2 = await fetch(`https://jsonplaceholder.typicode.com/${user}`);
  const users = res2.json();
  console.log(users);
}
