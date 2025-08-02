const document=document.querySelector(".dropdown select");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
let bttn=document.querySelector("button");
const mssg=document.querySelector(".mssg");


for(let select of document){
  for(codes in currencyToCountry){
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
    newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

bttn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

