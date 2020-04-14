const Extra = require("telegraf/extra");
const Scene = require("telegraf/scenes/base");
const Markup = require("telegraf/markup");
const Extra = require("telegraf/extra");

const navigationScene = new Scene("navigationScene");

navigationScene.action("SINGLEPLAYER_GAME", (ctx) => ctx.scene.enter("sp_beginScene"));

navigationScene.action("MULTIPLAYER_GAME", (ctx) => ctx.reply("Multiplayer is under construction.\n"));

navigationScene.action("NEW_GAME", (ctx) =>
    ctx.reply(
        `Singleplayer or Multiplayer?`,
        Markup.inlineKeyboard([
            Markup.callbackButton("Singleplayer", "SINGLEPLAYER_GAME"),
            Markup.callbackButton("Multiplayer", "MULTIPLAYER_GAME"),
        ]).extra()
    )
);

navigationScene.enter((ctx) =>
    ctx.reply(
        `Singleplayer or Multiplayer?`,
        Markup.inlineKeyboard([
            Markup.callbackButton("Singleplayer", "SINGLEPLAYER_GAME"),
            Markup.callbackButton("Multiplayer", "MULTIPLAYER_GAME"),
        ]).extra()
    )
);

navigationScene.on("message", (ctx) =>
    ctx.reply(
        "Try /newgame",
        Extra.HTML().markup((m) => m.inlineKeyboard([m.callbackButton("🎮 Play now!", "NEW_GAME")]))
    )
);

module.exports = navigationScene;
