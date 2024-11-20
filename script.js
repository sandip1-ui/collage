let d=new Date()
document.getElementById("i3").value=`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
document.getElementById("i4").value=`${d.getFullYear()}-${d.getMonth()}-${d.getDate()+1}`
let keywords=[
    "Alipurduar", 
    "Bankura", 
    "Birbhum", 
    "Cooch Behar", 
    "Dakshin Dinajpur", 
    "Darjeeling", 
    "Hooghly", 
    "Howrah", 
    "Jalpaiguri", 
    "Jhargram", 
    "Kolkata", 
    "Malda", 
    "Murshidabad", 
    "Nadia", 
    "North 24 Parganas", 
    "Paschim Bardhaman", 
    "Paschim Medinipur", 
    "Purba Bardhaman", 
    "Purba Medinipur", 
    "Purulia", 
    "South 24 Parganas", 
    "Uttar Dinajpur"
];
async function fileFatch() {
    let a=await fetch(`http://127.0.0.1:3000/place`);
    let r=await a.text();
    let div=document.createElement("div")
    div.innerHTML=r
    let as=div.getElementsByTagName("a")
    let place=[]
        for(let i=1;i<as.length;i++){
        place[i-1]=as[i].href.split(`/place/`)[1]
    }
    return place;
}
const resultbox=document.querySelector(".option");
const inputbox=document.getElementById("input")
inputbox.onkeyup=function(){
    let result=[];
    let input=inputbox.value;
    resultbox.innerHTML=""
    if(input.length){
        result=keywords.filter((keyword)=>{
            return keyword.toLowerCase().includes(input.toLowerCase());
        });
        display(result)
    }
    
   }
    function display(result){
        const contant=result.map((list)=>{
            return `<li onclick=selectInput(this.innerHTML)>${list}</li>`
        });
    resultbox.innerHTML=`<ul>${contant.join("")}</ul>`
}
function selectInput(list){
    inputbox.value=list;
    resultbox.innerHTML=""
}
async function placeno() {
    let place=await fileFatch()
    console.log(place[1])
    const cardno=Math.floor(document.getElementById("container").offsetWidth/230);
    const card= document.querySelector(".cardcontainer");
    for(let i=0;i<cardno;i++){
        let f=await fetch(`http://127.0.0.1:3000/place/${place[i]}/`)
        let r=await f.json();
        card.innerHTML=card.innerHTML+`<a class="card" href="index1.html">
        <img src=${r.link} alt="">
        <p>${r.place.toUpperCase()}</p>
        </a>`
    }
}
placeno()

// script.js
document.querySelector(".detailsclone").addEventListener("click",()=>{
    if(document.querySelector(".dbox").style.opacity==0)
        document.querySelector(".dbox").style.opacity=1
    else
        document.querySelector(".dbox").style.opacity=0
})
document.querySelector(".dsubmit").addEventListener("click",()=>{
    document.querySelector(".detailsclone").innerHTML=`${document.getElementById("adult").children[0].value}-Adult 
    ${document.getElementById("child").children[0].value}-Child ${document.getElementById("room").children[0].value}-Room`
    document.querySelector(".dbox").style.opacity=0;
})
