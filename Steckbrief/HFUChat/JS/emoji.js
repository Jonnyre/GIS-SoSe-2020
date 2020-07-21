"use strict";
var HFUChat;
(function (HFUChat) {
    let emojisList = ["😭", "😂", "🔥", "❤️", "🍆", "😍", "🙈", "💦", "🙄", "😫", "🤔", "😌", "🤣", "✔️", "👌"];
    let emojiDiv1 = document.getElementById("emojis1");
    let emojiDiv2 = document.getElementById("emojis2");
    for (let i = 0; i < emojisList.length; i++) {
        console.log(emojisList[i]);
        let emoji = document.createElement("a");
        emoji.setAttribute("href", "#");
        emoji.setAttribute("class", "emoji1");
        emoji.innerText = emojisList[i];
        emoji.addEventListener("click", function () { handleEmoji1(emojisList[i]); });
        emojiDiv1.appendChild(emoji);
        let emoji2 = document.createElement("a");
        emoji2.setAttribute("href", "#");
        emoji2.setAttribute("class", "emoji2");
        emoji2.innerText = emojisList[i];
        emoji2.addEventListener("click", function () { handleEmoji2(emojisList[i]); });
        emojiDiv2.appendChild(emoji2);
    }
    let emojiButton1 = document.getElementById("emojiButton1");
    emojiButton1.addEventListener("click", handleEmojiButton1);
    let emojiButton2 = document.getElementById("emojiButton2");
    emojiButton2.addEventListener("click", handleEmojiButton2);
    function handleEmoji1(_emoji) {
        handleEmoji("nachricht1", _emoji);
    }
    function handleEmoji2(_emoji) {
        handleEmoji("nachricht2", _emoji);
    }
    function handleEmoji(_inputElem, _emoji) {
        let nachricht1 = document.getElementById(_inputElem);
        nachricht1.value += _emoji;
    }
    function handleEmojiButton1() {
        emojiButton("emojis1");
    }
    function handleEmojiButton2() {
        emojiButton("emojis2");
    }
    function emojiButton(_divName) {
        let emojiDiv = document.getElementById(_divName);
        if (emojiDiv.style.display === "none")
            emojiDiv.style.display = "block";
        else
            emojiDiv.style.display = "none";
    }
})(HFUChat || (HFUChat = {}));
//# sourceMappingURL=emoji.js.map