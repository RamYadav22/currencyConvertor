const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdown = document.querySelectorAll(".dropdown select");

const fromCurr = document.querySelector(".fom select");
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg");
const btn = document.querySelector("form button")
for (let select of dropdown){
    for (let currCode in countryList){
        let newOption = document.createElement("option")
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from " && currCode === "USD"){
            newOption.value = currCode;
        }
        else if(select.name === "to" && currCode === "INR")
            newOption.value = currCode;
        select.append(newOption);
    }
    select.addEventListener("change" , (evt) => {
        updateFlag(evt.target)
    })
}   


const updateFlag = (element) => {
   let currCode = element.value   ;
   let countryCode = countryList[currCode];
   console.log(countryCode); 

   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
   let img = element.parentElement.querySelector("img");

   img.src = newSrc;

}
btn.addEventListener("click",async (evt) => {
    evt.preventDefault();
    let  amount = document.querySelector(".amount input")
    let amtVal = amount.value;

    if( amtVal === "" || amtVal <1 ){
        amtVal =1;
        amount.value = "1";
    }
    console.log(amtVal);
   console.log(fromCurr.value,toCurr.value);
   console.log("fetching url")
   const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
   console.log("fetching url")
 let response = await fetch(URL);
 console.log("fetching url")
let data = await response.json();
let rate = data[toCurr.value.toLowerCase()]
console.log(rate);

let finalAmount  = amtVal * rate;
msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
});

