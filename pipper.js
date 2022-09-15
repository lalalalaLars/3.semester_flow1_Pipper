let modal = document.getElementById("modal");
let btn = document.getElementById("myBtn");
let pipper = document.getElementById("pipperIkon");
let textArea = document.getElementById("pipMsg");
let charCount = document.getElementById("charCount");
const form = document.querySelector("#pipForm");
const avator = document.querySelector(".avator");
const maxNumChars = 255;
let btnClose = document.getElementById("#btnCloser");

// På load afventer vi et "GET" request fra databasen

window.addEventListener("load", async () => {
    const result = await fetch(
        "http://localhost:8000"
    )


const data = await result.json()
console.log(data);


  data.forEach((item) => {
    const pipMsg = item.pip;
    const username = item.username;
    const timeOfPip = item.time_of_pip;
   fillTemplate(username, pipMsg, timeOfPip)
  });
});

// Funktionen lukker modal

function closeModal() {
    modal.style.display = "none";
    pipper.style.display = "block";
    btn.style.display = "block";
};

btn.onclick = function btnClicker() {
    modal.style.display = "block";
    pipper.style.display = "none";
    btn.style.display = "none";
};


/* Character counter */

const countCharacters = () => {
    let numOfEnteredChars = textArea.value.length;
    let counter = numOfEnteredChars;
    charCount.textContent = counter + "/255";
}

textArea.addEventListener("input", countCharacters);

// Funktionen lytter på vores username og pipbesked og poster det i databasen.

function postData(pipMsg, username) {
    const asObject = {
        pip: pipMsg,
        username: username
    }

    const asJson = JSON.stringify(asObject);
    
    fetch("http://localhost:8000", {
        method: "POST",
        body: asJson
    });
}


form.addEventListener("submit", (event) => {
    event.preventDefault();
    // henter user input data
    const username = document.querySelector("#userName").value;
    const pipMsg = document.querySelector("#pipMsg").value;
    
    
    //Gemmer vi i databasen
    postData(pipMsg, username);

    // fylder vi det ud i DOM
    fillTemplate(username, pipMsg,);
    
    closeModal();
});

// Funktionen udfylder vores template med brugerens inputs.

function fillTemplate(username, pipMsg, timeOfPip) {

    const template = document.querySelector("#my-template");
    const newPip = document.importNode(template.content, true);
    newPip.querySelector("span").textContent = timeOfPip;
    newPip.querySelector("h3").textContent = username;
    newPip.querySelector("p").textContent = pipMsg;
    newPip.querySelector("img").src = `https://avatars.dicebear.com/api/adventurer/${username}.svg`;
    document.querySelector(".pip-header-info").appendChild(newPip)

};






