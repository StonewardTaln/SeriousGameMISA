import{b as r}from"./init-22028896.js";WA.chat.sendChatMessage("Hello world","Mr Robot");WA.chat.onChatMessage(o=>{console.log("The user typed a message:",o)});let e;WA.onInit().then(()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags),WA.room.area.onEnter("clocky").subscribe(()=>{console.log("player entered zone");const o=new Date,t=o.getHours()+":"+o.getMinutes();e=WA.ui.openPopup("clockPopup","It's "+t,[])}),WA.room.area.onLeave("clocky").subscribe(s),r().then(()=>{console.log("Scripting API Extra ready")}).catch(o=>console.error(o))}).catch(o=>console.error(o));function s(){e!==void 0&&(e.close(),e=void 0)}