
const selects=document.querySelectorAll(".dropdown select");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
let bttn=document.querySelector("button");
const mssg=document.querySelector(".mssg");


for(let select of selects){
  for(let codes in currencyToCountry){
    let newOption=document.createElement("option");
    newOption.innerText=codes;
    newOption.value=codes;
    if(select.name==="from" && codes==="USD"){
        newOption.selected="selected";
    }else if(select.name==="to" && codes==="INR"){
        newOption.selected="selected";
    }
    select.append(newOption);
  }
   select.addEventListener("change",(evt)=>{
     updateFlag(evt.target);
   })
  
}

updateFlag =(element)=>{
    let fromCurr=element.value;
    let countryCode=currencyToCountry[fromCurr];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

bttn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtvalue = amount.value;
    if (amtvalue === "" || amtvalue < 1) {
        amtvalue = 1;
        amount.value = "1";
    }

    const from = fromCurr.value;
    const to = toCurr.value;
    const url = `https://api.apilayer.com/exchangerates_data/convert?from=${from}&to=${to}&amount=${amtvalue}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "apikey": "qdaI8RPWJo3J3c3CqdTxFmZGaPPAYQxF" 
            }
        });

        const data = await response.json();

        if (data.success) {
            const finalAmt = data.result;
            mssg.innerText = `${amtvalue} ${from} = ${finalAmt.toFixed(2)} ${to}`;
        } else {
            mssg.innerText = "Something went wrong. Please check the currency or try again.";
            console.error(data);
        }
    } catch (error) {
        console.error("API error:", error);
        mssg.innerText = "Error fetching exchange rate.";
    }
};

window.addEventListener("load",()=>{
    updateExchangeRate();
})





