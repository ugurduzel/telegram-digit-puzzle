const { generateRandomNumber, unexpectedErrorKeyboard, playerLog } = require("../../utils");
const { minLevel, maxLevel } = require("../../configs/constants.json");
const Markup = require("telegraf/markup");
const Extra = require("telegraf/extra");
const Scene = require("telegraf/scenes/base");
const _ = require("lodash");

const levels = _.range(minLevel, maxLevel + 1);

const sp_beginScene = new Scene("sp_beginScene");

sp_beginScene.enter((ctx) => {
    try {
        return ctx.reply(
            "Choose difficulty level\n\n<b>3</b> is too easy, <b>4</b> is the most fun",
            Extra.HTML().markup((m) =>
                m.inlineKeyboard(levels.map((l) => m.callbackButton(`${l} digits`, `${l} digits`)))
            )
        );
    } catch (ex) {
        console.log("Unexpected error. " + ex);
        unexpectedErrorKeyboard(ctx);
    }
});

sp_beginScene.action(/^[0-9] digits/, (ctx) => {
    try {
        const level = eval(ctx.match[0][0]);

        if (level < minLevel || level > maxLevel) {
            return ctx.reply(
                "Choose difficulty level",
                "<p>Plase select from these inline options!</p>",
                Extra.HTML().markup((m) =>
                    m.inlineKeyboard(levels.map((l) => m.callbackButton(`${l} digits`, `${l} digits`)))
                )
            );
        }

        ctx.session.number = ctx.session.number ? ctx.session.number : generateRandomNumber(level);
        ctx.session.guesses = 1;
        ctx.session.history = [];

        console.log(ctx.chat.first_name + " is playing. The number is " + ctx.session.number.join(""));

        return ctx.scene.enter("sp_ongoingScene");
    } catch (ex) {
        console.log("Unexpected error. " + ex);
        unexpectedErrorKeyboard(ctx);
    }
});

module.exports = sp_beginScene;
