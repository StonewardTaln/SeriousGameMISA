/// <reference types="@workadventure/iframe-api-typings" />

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
  

  // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
  bootstrapExtra().then(() => {
      console.log('Scripting API Extra ready');
  }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
  if (currentPopup !== undefined) {
      currentPopup.close();
      currentPopup = undefined;
  }
}

function runRounds() {
  //todo
}

function uhrUhr() {
  console.log('test123');
  //Uhr-Uhr
  WA.room.area.onEnter('clocky').subscribe(() => {
    console.log('player entered zone ');
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