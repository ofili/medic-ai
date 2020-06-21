// User phrase
const trigger = [
    ["hi", "hey", "hello", "good morning", "good afternoon", "good evening", "what\'s up"],
    ["help", "covid19", "covid-19", "info"],
    ["1", "2", "3", "4", "5", "6"]
];
// Bot response/trigger
const reply = [
    [
        "Hello, I'm Medic AI! To start enter \'help\'",
        "Hi, I'm Medic AI! To start enter \'help\'",
        "Hey, I'm Medic AI! To start enter \'help\'",
        "Hi there, I'm Medic AI! To start enter \'help\'",
        "Good Afternoon, I'm Medic AI! To start enter \'help\'"
    ],
    [`<br>
    Enter \'1\' for tips on how to prevent coronavirus <br>
    Enter \'2\' for coronavirus symptoms. <br>
    Enter \'3\' to get source of accurate information. <br>
    Enter \'4\' to get the number of confirmed cases in Nigeria. <br>
    Enter \'5\' to know how to get tested`],

    [
        `
            1. Wash your hands frequently with soap and running water .2.Clean your hand with alcohol - based hand sanitizer
            for at least 20 second .3.Wear face mask when you are in a public place .4.Observe physical distance `,
        "Fever, chest pain, loss of sense of smell, loss of taste, sore throat, cough, chills, shortness of breath",
        "Always look outfor publications from the Nigeria Center for Disease Control (NCDC)",
        "Nigeria has recorded 19,808 confirmed cases as at June 2th, 2020.",
        "Call the NCDC toll-free numbers: 0800-970000-10 or send an SMS to: 08099555577 or chat with a rep on WhatsApp: 07087110839"

    ]
];

// Catch calls
const alternative = [
    "press \'help\'",
    "press \'help\' to continue"
];
// Alternate responses)
const coronavirus = ["Please stay home. Flatten th curve. Observe physical and socail distance"];
const covid = ["Please stay home. Flatten th curve. Observe physical and socail distance"];
const bye = ["Goodbye"];


document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input")
    inputField.addEventListener("keydown", function(e) {
        if (e.code === "Enter") {
            let input = inputField.value;
            console.log(input)
            inputField.value = "";
            output(input);
        }
    });
});

function output(input) {
    let product;
    let text = input.toLowerCase().trim().toString();

    if (compare(trigger, reply, text)) {
        product = compare(trigger, reply, text);
    } else if (text.match(/coronavirus/gi)) {
        product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
    } else if (text.match(/covid/gi)) {
        product = covid[Math.floor(Math.random() * covid.length)];
    } else if (text.match(/bye/gi)) {
        product = bye[Math.floor(Math.random() * bye.length)];
    } else {
        product = alternative[Math.floor(Math.random() * alternative.length)];
    }

    //update DOM
    addChat(input, product);
}

function compare(triggerArray, replyArray, string) {
    let item;
    for (let x = 0; x < triggerArray.length; x++) {
        for (let y = 0; y <= replyArray.length + 1; y++) {
            if (triggerArray[x][y] === string) {
                // items = replyArray[x];
                //item = items[Math.floor(Math.random() * items.length)];
                console.log(x, y)
                console.log(triggerArray[x][y], replyArray[x][y])
                item = replyArray[x][y];

            }
        }
    }
    return item;
}

function addChat(input, product) {
    const mainDiv = document.getElementById("container");
    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.innerHTML = `<strong style = "color:blue;">You: </strong><span id="user-response">${input}</span> `;
    mainDiv.appendChild(userDiv);

    let botDiv = document.createElement("div");
    botDiv.id = "bot";
    botDiv.innerHTML = ` <strong style = "color:red;"> Bot: </strong><span id="bot-response">${product}</span > `;
    mainDiv.appendChild(botDiv);
    // speak(product);
}

const synth = window.speechSynthesis;
let voices = synth.getVoices();

function speak(string) {
    let u = new SpeechSynthesisUtterance(string);
    u.text = string;
    u.lang = "en-US";
    u.volume = 1; //0-1 interval
    u.rate = 1;
    u.pitch = 1; //0-2 interval
    synth.speak(u);
}