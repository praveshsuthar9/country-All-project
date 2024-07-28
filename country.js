let flagImg = document.getElementById('flag-img')
let nativeName = document.getElementById("nameC");
let population = document.getElementById("population");
let region = document.getElementById("region");
let capital = document.getElementById("capital");
let languages = document.getElementById("languages");
let currencies = document.getElementById("c");
let domian = document.getElementById("d");

let boderLink = document.querySelector('.border-link');


let counrtyName = new URLSearchParams(window.location.search).get("name");
console.log(counrtyName);

fetch( `https://restcountries.com/v3.1/name/${counrtyName}?fullText=true`)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element) => {
      console.log(element);

       flagImg.src = `${element.flags.svg}`

      if (Object.values(element.name.nativeName)[0].common) {
        nativeName.innerText = element.name.common;
      }

      if (element.capital) {
        capital.innerText = element.capital;
      }
      region.innerText = element.region;
      population.innerText = element.population;

      if (element.languages) {
        languages.innerText = Object.values(element.languages).join(", ");
      }
    if(element.currencies){
        currencies.innerText = Object.values(element.currencies).map((curreny) => curreny.name)
    }

    domian.innerText = element.tld.join(', ')

    if(element.borders){
      element.borders.forEach(borders => {
        fetch(`https://restcountries.com/v3.1/alpha/${borders}`).then((res) => res.json())
        .then(([borderCountry]) => {
          let borderTag = document.createElement('a');
          boderLink.appendChild(borderTag)
        borderTag.href = `/country.html?name=${borderCountry.name.common}`
          borderTag.innerText = borderCountry.name.common
        })
      })
    }



    });
  });


  