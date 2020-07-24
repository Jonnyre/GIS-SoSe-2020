namespace HFUChat {
    let emojisList: string[] = ["😭", "😂", "🙄", "😫", "🤔", "😌", "🤣", "😍", "🔥", "❤️", "🍆", "🙈", "💦", "✔️", "👌", "👍"];
    let emojiDiv1: HTMLDivElement = <HTMLDivElement>document.getElementById("emojis1");
    let emojiDiv2: HTMLDivElement = <HTMLDivElement>document.getElementById("emojis2");
    for (let i: number = 0; i < emojisList.length; i++) {
        let emoji: HTMLAnchorElement = document.createElement("a");
        emoji.setAttribute("class", "emoji1");
        emoji.innerText = emojisList[i];
        emoji.addEventListener("click", function(): void {handleEmoji1(emojisList[i]); });
        emojiDiv1.appendChild(emoji);

        let emoji2: HTMLAnchorElement = document.createElement("a");
        emoji2.setAttribute("class", "emoji2");
        emoji2.innerText = emojisList[i];
        emoji2.addEventListener("click", function(): void {handleEmoji2(emojisList[i]); });
        emojiDiv2.appendChild(emoji2);
    }

    let emojiButton1: HTMLInputElement = <HTMLInputElement> document.getElementById("emojiButton1");
    emojiButton1.addEventListener("click", handleEmojiButton1);

    let emojiButton2: HTMLInputElement = <HTMLInputElement> document.getElementById("emojiButton2");
    emojiButton2.addEventListener("click", handleEmojiButton2);
    
    function handleEmoji1(_emoji: string): void {
        handleEmoji("nachricht1", _emoji);
    }

    function handleEmoji2(_emoji: string): void {
        handleEmoji("nachricht2", _emoji);
    } 
    function handleEmoji(_inputElem: string, _emoji: string): void {
        let nachricht1: HTMLInputElement =  <HTMLInputElement> document.getElementById(_inputElem);
        nachricht1.value += _emoji;
    }

    function handleEmojiButton1(): void {
        emojiButton("emojis1");
    }

    function handleEmojiButton2(): void {
        emojiButton("emojis2");
    }

    function emojiButton(_divName: string): void {
        let emojiDiv: HTMLDivElement =  <HTMLDivElement> document.getElementById(_divName);
        if (emojiDiv.style.display === "none")
            emojiDiv.style.display = "block";
        else
            emojiDiv.style.display = "none";
    }
}