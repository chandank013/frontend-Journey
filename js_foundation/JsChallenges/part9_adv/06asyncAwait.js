function fetchUserData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: "chaicode", url: "https://chaicode.com" });
    }, 3000);
  });
}

/*// Promise & Promise chaining
fetchData()
  .then((data) => {})
  .then((value) => {})
  .catch();*/

// async-await
async function getUserData() {
  try {
    console.log("Fetching user data...");
    const userData = await fetchUserData();
    console.log("User data fetched successfully");

    console.log("User data: ", userData);
  } catch (error) {
    console.log("Error fetching data", error);
  }
}
getUserData();
