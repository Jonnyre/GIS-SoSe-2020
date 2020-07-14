"use strict";
var HFUChat;
(function (HFUChat) {
    let emojiButton1 = document.getElementById("emojiButton1");
    emojiButton1.addEventListener("click", handleEmojiButton1);
    let tears1 = document.getElementById("tears1");
    tears1.addEventListener("click", function () { handleEmoji1("😂"); });
    let fire1 = document.getElementById("fire1");
    fire1.addEventListener("click", function () { handleEmoji1("🔥"); });
    let heart1 = document.getElementById("heart1");
    heart1.addEventListener("click", function () { handleEmoji1("❤️"); });
    let eggplant1 = document.getElementById("eggplant1");
    eggplant1.addEventListener("click", function () { handleEmoji1("🍆"); });
    let hearteyes1 = document.getElementById("hearteyes1");
    hearteyes1.addEventListener("click", function () { handleEmoji1("😍"); });
    let monkey1 = document.getElementById("monkey1");
    monkey1.addEventListener("click", function () { handleEmoji1("🙈"); });
    let splash1 = document.getElementById("splash1");
    splash1.addEventListener("click", function () { handleEmoji1("💦"); });
    function handleEmoji1(_emoji) {
        let nachricht1 = document.getElementById("nachricht1");
        nachricht1.value += _emoji;
    }
    function handleEmojiButton1() {
        let emojiDiv = document.getElementById("emojis1");
        if (emojiDiv.style.display === "none")
            emojiDiv.style.display = "block";
        else
            emojiDiv.style.display = "none";
    }
    let emojiButton2 = document.getElementById("emojiButton2");
    emojiButton2.addEventListener("click", handleEmojiButton2);
    let tears2 = document.getElementById("tears2");
    tears2.addEventListener("click", function () { handleEmoji2("😂"); });
    let fire2 = document.getElementById("fire2");
    fire2.addEventListener("click", function () { handleEmoji2("🔥"); });
    let heart2 = document.getElementById("heart2");
    heart2.addEventListener("click", function () { handleEmoji2("❤️"); });
    let eggplant2 = document.getElementById("eggplant2");
    eggplant2.addEventListener("click", function () { handleEmoji2("🍆"); });
    let hearteyes2 = document.getElementById("hearteyes2");
    hearteyes2.addEventListener("click", function () { handleEmoji2("😍"); });
    let monkey2 = document.getElementById("monkey2");
    monkey2.addEventListener("click", function () { handleEmoji2("🙈"); });
    let splash2 = document.getElementById("splash2");
    splash2.addEventListener("click", function () { handleEmoji2("💦"); });
    function handleEmoji2(_emoji) {
        let nachricht2 = document.getElementById("nachricht2");
        nachricht2.value += _emoji;
    }
    function handleEmojiButton2() {
        let emojiDiv = document.getElementById("emojis2");
        if (emojiDiv.style.display === "none")
            emojiDiv.style.display = "block";
        else
            emojiDiv.style.display = "none";
    }
})(HFUChat || (HFUChat = {}));
//# sourceMappingURL=emoji.js.map