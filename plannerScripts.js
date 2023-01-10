var events = [];
window.MY = {};
MY.counter = 0;

function displayOptions(){
    // disables new event button
    const addEventButton = document.getElementById("addEvent");
    addEventButton.setAttribute("onclick", "");

    // creates event name entry
    const eventName = document.createElement("input");
    eventName.setAttribute("type", "text");
    eventName.setAttribute("placeholder", "event name");
    eventName.setAttribute("id", "eventName");
    eventName.setAttribute("class", "bumpUp");
    eventName.style.paddingTop = "3px";

    // creates event time entry
    const time = document.createElement("input");
    time.setAttribute("type", "time");
    time.setAttribute("id", "time");
    time.setAttribute("class", "bumpUp");

    // creates confirm button
    const confirm = document.createElement("button");
    confirm.innerHTML = "&#10003;";
    confirm.setAttribute("id", "confirm");
    confirm.setAttribute("onclick", "createEventBoi()");
    confirm.setAttribute("class", "bumpUp");

    // creates cancel button
    const cancel = document.createElement("button");
    cancel.innerHTML = "X"
    cancel.setAttribute("onclick","clearForm()");
    cancel.setAttribute("id","cancel");
    cancel.setAttribute("class", "bumpUp");
    cancel.style.paddingTop = "3px";


    const buttonContainer = document.getElementById("buttonContainer");
    buttonContainer.appendChild(time);
    buttonContainer.appendChild(eventName);
    buttonContainer.appendChild(confirm);
    buttonContainer.appendChild(cancel);

}

function clearForm(){
   const buttonContainer = document.getElementById("buttonContainer");
   buttonContainer.removeChild(document.getElementById("cancel"));
   buttonContainer.removeChild(document.getElementById("confirm"));
   buttonContainer.removeChild(document.getElementById("eventName"));
   buttonContainer.removeChild(document.getElementById("time"));


   const addEventButton = document.getElementById("addEvent");
   addEventButton.setAttribute("onclick", "displayOptions()");
}

function ScheduleEvent(eventTime, eventName){
    this.time = eventTime;
    this.name = eventName;
    this.friendlyTime = getFriendlyTime(eventTime);
}

function createEventBoi(){
    let eventName = document.getElementById("eventName").value;
    let eventTime = document.getElementById("time").value;

    clearForm();

    var newEvent = new ScheduleEvent(eventTime, eventName);
    events.push(newEvent);

    events.sort(function(a, b){
        var [ha,ma] = a.time.split(":");
        var [hb,mb] = b.time.split(":");
        return ((ha*100)+ma) - ((hb*100)+mb)
    });

    generateSchedule();
}

function generateSchedule(){

    const element = document.getElementById("scheduleFunc");
    while (element.firstChild){
        element.removeChild(element.firstChild);
    }

    for(let i=0; i<events.length; i++){
        visualEvent(events[i], i);
    }

}


function visualEvent(schedEvent){
    let eventContainer = document.createElement("div");
    eventContainer.setAttribute("class","eventBlock");
    eventContainer.setAttribute("id", schedEvent.name)
    console.log(schedEvent.name);

    const element = document.getElementById("scheduleFunc");
    element.appendChild(eventContainer);

    let textContainer = document.createElement("div");
    textContainer.setAttribute("width", "70%");

    let printEvent = document.createElement("p");
    printEvent.innerHTML = schedEvent.friendlyTime + " || &ensp;"  + schedEvent.name + "<br>";
    textContainer.appendChild(printEvent);

    let clockImage = document.createElement("img");
    clockImage.setAttribute("src","clock.png");
    clockImage.setAttribute("id","clock");
    clockImage.setAttribute("width","20px");
    clockImage.setAttribute("height","20px");

    let delButton = document.createElement("button");
    delButton.innerHTML = "X";
    MY.counter++;
    delButton.setAttribute("id", "button" + MY.counter);
    delButton.setAttribute("type", "button");
    delButton.setAttribute("class", "delButton");
    
    let param = delButton.parentNode;
    delButton.setAttribute("onclick", `deleteEvent(button${MY.counter})`);


    eventContainer.appendChild(clockImage);
    eventContainer.appendChild(textContainer);
    eventContainer.appendChild(delButton);
}

function getFriendlyTime(time){
    let am = true;

    var [h,m] = time.split(":");

    if (h-12 == 0){
        am = false;
    }
    if(h-12 > 0){
        h-=12;
        am = false;
    }

    if(h==0){
        h=12;
    }else{
        h = parseInt(h);
    }

    if (am){
        return h + ":" + m + " AM";
    } else{
        return h + ":" + m + " PM";
    }
}

function addBulletPoint(location){
    /*
    step 1: get param and choose div child to append to
    step 2: create label append it to div child
    step 3: create input and append it to container
    step 4: create span and append it to container
    step 5: create text area and append to div'
    step 6: add delete button
    */

    var divChild;
    // step 1
    if (location == "goal"){
        divChild = document.getElementById("goalContainer")
    } else{
        divChild = document.getElementById("todoContainer")
    }   
    
    const subContainer = document.createElement("div");
    subContainer.setAttribute("class","bulletWrapper")

    divChild.append(subContainer)
    // step 2
    const label = document.createElement("label");
    label.setAttribute("class","container");
    subContainer.appendChild(label);

    // step 3
    const input = document.createElement("input");
    input.setAttribute("type","checkbox");
    label.appendChild(input);

    // step 4
    const span = document.createElement("span")
    span.setAttribute("class","checkmark");
    label.appendChild(span);

    // step 5
    const textArea = document.createElement("textarea");
    textArea.setAttribute("rows","1");
    textArea.setAttribute("cols","27");
    textArea.setAttribute("class","goalText");
    textArea.setAttribute("spellcheck","false");
    

    if (location == "goal"){
        textArea.setAttribute("placeholder","Write your goal...");
    } else{
        textArea.setAttribute("placeholder","Write your task...");
    }   

    subContainer.appendChild(textArea);

    // step 6
    let delButton = document.createElement("button");
    delButton.innerHTML = "X";
    delButton.setAttribute("type", "button");
    delButton.setAttribute("class", "delButtonBullet");
    let param = delButton.parentNode;
    delButton.setAttribute("onclick", "this.parentElement.parentElement.remove()");

    label.appendChild(delButton)

}

function deleteEvent(buttonid){
    const element = document.getElementById("scheduleFunc");

    for(let i=0; i<events.length; i++){
        if (events[i].name === buttonid.parentNode.getAttribute('id')){
            events.splice(i, 1);
            break;
        }
    }

    element.removeChild(buttonid.parentNode);
}