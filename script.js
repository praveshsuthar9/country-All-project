let countryContainer = document.querySelector(".country-container");
let filterCountry = document.getElementById("filter");
let searchInput = document.getElementById("searchInput");

let body = document.querySelector("body");
let lightBtn = document.querySelector(".light-m");
let lightIcon = document.querySelector(".fa-solid");

lightBtn.addEventListener("click", () => {
  body.classList.toggle("active");
  lightIcon.classList.toggle("fa-moon");
});

fetch(`https://restcountries.com/v3.1/all`)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element) => {
      let coutryCard = document.createElement("a");
      countryContainer.appendChild(coutryCard);
      coutryCard.classList.add("country-card");
      coutryCard.href = `/country.html?name=${element.name.common}`;
      coutryCard.innerHTML = `
   <img src= "${element.flags.svg}" alt="flag"/>
   
   `;
      let courtyCardConent = document.createElement("div");
      coutryCard.appendChild(courtyCardConent);
      courtyCardConent.classList.add("country-card-content");
      courtyCardConent.innerHTML = `
   <h3>${element.name.common}</h3>
   <p><b>Population: </b>${element.population}<p>
   <p><b>Region: </b>${element.region}<p>
   <p><b>Capital: </b>${element.capital}<p>
   `;
    });
  });

filterCountry.addEventListener("change", (e) => {
  console.log(e.target.value);
  countryContainer.innerHTML = "";
  fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element) => {
        let coutryCard = document.createElement("a");
        countryContainer.appendChild(coutryCard);
        coutryCard.classList.add("country-card");
        coutryCard.href = `/country.html?name=${element.name.common}`;
        coutryCard.innerHTML = `
   <img src= "${element.flags.svg}" alt="flag"/>
   
   `;
        let courtyCardConent = document.createElement("div");
        coutryCard.appendChild(courtyCardConent);
        courtyCardConent.classList.add("country-card-content");
        courtyCardConent.innerHTML = `
   <h3>${element.name.common}</h3>
   <p><b>Population: </b>${element.population}<p>
   <p><b>Region: </b>${element.region}<p>
   <p><b>Capital: </b>${element.capital}<p>
   `;
      });
    });
});

let allCountryData;

fetch(`https://restcountries.com/v3.1/all`)
  .then((res) => res.json())
  .then((data) => {
    renderCountrys(data);
    allCountryData = data;
  });

searchInput.addEventListener("input", (e) => {
  // console.log(e.target.value)
  countryContainer.innerHTML = "";
  const filterdata = allCountryData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  renderCountrys(filterdata);
});

function renderCountrys(data) {
  data.forEach((element) => {
    let coutryCard = document.createElement("a");
    countryContainer.appendChild(coutryCard);
    coutryCard.classList.add("country-card");
    coutryCard.href = `/country.html?name=${element.name.common}`;
    coutryCard.innerHTML = `
<img src= "${element.flags.svg}" alt="flag"/>

`;
    let courtyCardConent = document.createElement("div");
    coutryCard.appendChild(courtyCardConent);
    courtyCardConent.classList.add("country-card-content");
    courtyCardConent.innerHTML = `
<h3>${element.name.common}</h3>
<p><b>Population: </b>${element.population}<p>
<p><b>Region: </b>${element.region}<p>
<p><b>Capital: </b>${element.capital}<p>
`;
  });
}

renderCountrys();
