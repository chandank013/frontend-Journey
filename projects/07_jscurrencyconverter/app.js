const BASE_URL = "https://v6.exchangerate-api.com/v6/ad8af986d9d6db25da195535/latest/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// populate currency options
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector("form input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}${fromCurr.value}`;
  try {
    let response = await fetch(URL);
    let data = await response.json();

    if (data.result === "success") {
      let rate = data.conversion_rates[toCurr.value];
      let finaleAmt = (amtVal * rate).toFixed(2);
      msg.innerText = `${amtVal} ${fromCurr.value} = ${finaleAmt} ${toCurr.value}`;
    } else {
      msg.innerText = "Error fetching exchange rate.";
    }
  } catch (error) {
    console.error("API fetch error: ", error);
    msg.innerText = "Failed to fetch exchange rate.";
  }
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// button event
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

// initial exchange rate load
window.addEventListener("load", () => {
  updateExchangeRate();
});
