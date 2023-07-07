/// <reference types="@workadventure/iframe-api-typings" />

import { Popup } from "@workadventure/iframe-api-typings";
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

//tests, examples
/*WA.chat.sendChatMessage('Hello world', 'Mr Robot');

WA.chat.onChatMessage((message => {
  console.log('The user typed a message:', message);
}));
*/

//ts-file
let currentPopup: any = undefined;


// Waiting for the API to be ready
WA.onInit().then(() => {
  console.log('Scripting API ready');
  console.log('Player tags: ',WA.player.tags)

  WA.player.state.foo = 0;
  console.log('virable foo: ', WA.player.state.foo);

  uhrUhr();
  runRounds();

  menus();

  NPCregal();
  

  // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
  bootstrapExtra().then(() => {
      console.log('Scripting API Extra ready');
  }).catch(e => console.error(e));

}).catch(e => console.error(e));

function NPCregal() {
  WA.room.area.onEnter('NPCregal').subscribe(() => {
    console.log("reagl Action")
    WA.chat.sendChatMessage('Hello, what do you want?', 'Mr Regalo');
  })

  // Display the choices to the user
  //displayMessage("Please select an option:\n1. Choice 1\n2. Choice 2");
}

function menus() {
  WA.room.area.onEnter('hier-menu').subscribe(() => {
    console.log('menu');

    //Action Nachricht uber Leerstaste
    const triggerMessage = WA.ui.displayActionMessage({
      message: "press 'space' to confirm",
      callback: () => {
          WA.chat.sendChatMessage("confirmed", "trigger message logic")
      }
    });
  
    setTimeout(() => {
        // later
        triggerMessage.remove();
    }, 1000)

    //uber Kaffetassen-Menubutton findbar
    const menu = WA.ui.registerMenuCommand('menu test',
    {
        callback: () => {
          console.log('test menu');
          WA.chat.sendChatMessage('test');
        }
    })

    const menu2 = WA.ui.registerMenuCommand('menu2 test',
    {
      //Website erscheint
      //iframe: "https://workadventu.re/map-building/wa-maps.md"
      //eigenes file im root Ordner
      iframe: "../menupage.html"
    })
    
    
  })
  
}

function closePopup(){
  if (currentPopup !== undefined) {
      currentPopup.close();
      currentPopup = undefined;
  }
}

function runRounds() {
  var rounds = 0;
  var enteredCheckpoint = false;
  let popUp: Popup;
  //console.log("fixPopup", popUp);
  //without cheat checking (more fields/zones)

  WA.room.area.onEnter('checkpoint').subscribe(() => {
    console.log(WA.player.name, ' entered zone checkpoint');
    enteredCheckpoint = true;
  })

  WA.room.area.onEnter('start-goal').subscribe(() => {
    console.log(WA.player.name, ' entered zone start');
    if (enteredCheckpoint) {
      //innumerate runcounter
      rounds += 1;
      enteredCheckpoint = false;
    }
    console.log('round: ', rounds);
    popUp = WA.ui.openPopup("rounds-popup", 'Round: ' + rounds, [{
      label: "Close",
        className: "primary",
        callback: (popup) => {
            // Close the popup when the "Close" button is pressed.
            popup.close();
        }
    }]);

  //subcribe end
  });

  // Close the popup when we leave the zone.
  WA.room.area.onLeave('start-goal').subscribe(() => {
    console.log('leaving');
    popUp.close();//wtf.
    
  })
}

function uhrUhr() {
  console.log('test123');
  //Uhr-Uhr
  WA.room.area.onEnter('clocky').subscribe(() => {
    console.log(WA.player.name, ' entered zone ');
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();
    currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);

    //with const or var we check what type foo is and can work with it
    var myVariable = WA.player.state.foo;
    if (typeof myVariable == "number") { //or "string"
      WA.player.state.foo = myVariable + 1;
      console.log(WA.player.state.foo + " times");
    } else {
      console.log("Error: WA.player.state.foo is not a number.");
    }
  })

WA.room.area.onLeave('clocky').subscribe(closePopup)
}