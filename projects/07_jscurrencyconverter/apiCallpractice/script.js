const URL = "https://api.artic.edu/api/v1/artworks";

const factPara = document.querySelector("#fact");
const btn = document.querySelector("#btn")


// let promise = fetch(URL);
// console.log(promise);


// // Async-await
// const getFacts = async () => {
//     console.log("getting data ....");
//     let response = await fetch(URL);
// console.log(response);// JSON Format
// let data = await response.json();
// factPara.innerText = data.data[0].credit_line;
// }


// Promise-chaining
function getFacts() {
    console.log("getting data ....");
    fetch(URL).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data.data[0]);
        factPara.innerText = data.data[0].credit_line;
    });
}

btn.addEventListener("click", getFacts);
