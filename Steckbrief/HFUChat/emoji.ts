namespace HFUChat {
    let emojiButton1: HTMLInputElement = <HTMLInputElement> document.getElementById("emojiButton1");
    emojiButton1.addEventListener("click", handleEmojiButton1);

    let tears1: HTMLElement = <HTMLElement> document.getElementById("tears1");
    tears1.addEventListener("click", function(): void {handleEmoji1("😂"); });

    let fire1: HTMLElement = <HTMLElement> document.getElementById("fire1");
    fire1.addEventListener("click", function(): void {handleEmoji1("🔥"); });

    let heart1: HTMLElement = <HTMLElement> document.getElementById("heart1");
    heart1.addEventListener("click", function(): void {handleEmoji1("❤️"); });

    let eggplant1: HTMLElement = <HTMLElement> document.getElementById("eggplant1");
    eggplant1.addEventListener("click", function(): void {handleEmoji1("🍆"); });
    
    let hearteyes1: HTMLElement = <HTMLElement> document.getElementById("hearteyes1");
    hearteyes1.addEventListener("click", function(): void {handleEmoji1("😍"); });
    
    let monkey1: HTMLElement = <HTMLElement> document.getElementById("monkey1");
    monkey1.addEventListener("click", function(): void {handleEmoji1("🙈"); });

    let splash1: HTMLElement = <HTMLElement> document.getElementById("splash1");
    splash1.addEventListener("click", function(): void {handleEmoji1("💦"); });
    
    
    function handleEmoji1(_emoji: string): void {
        let nachricht1: HTMLInputElement =  <HTMLInputElement> document.getElementById("nachricht1");
        nachricht1.value += _emoji;
    }

    function handleEmojiButton1(): void {
        let emojiDiv: HTMLDivElement =  <HTMLDivElement> document.getElementById("emojis1");
        if (emojiDiv.style.display === "none")
            emojiDiv.style.display = "block";
        else
            emojiDiv.style.display = "none";
    }

    let emojiButton2: HTMLInputElement = <HTMLInputElement> document.getElementById("emojiButton2");
    emojiButton2.addEventListener("click", handleEmojiButton2);

    let tears2: HTMLElement = <HTMLElement> document.getElementById("tears2");
    tears2.addEventListener("click", function(): void {handleEmoji2("😂"); });

    let fire2: HTMLElement = <HTMLElement> document.getElementById("fire2");
    fire2.addEventListener("click", function(): void {handleEmoji2("🔥"); });

    let heart2: HTMLElement = <HTMLElement> document.getElementById("heart2");
    heart2.addEventListener("click", function(): void {handleEmoji2("❤️"); });

    let eggplant2: HTMLElement = <HTMLElement> document.getElementById("eggplant2");
    eggplant2.addEventListener("click", function(): void {handleEmoji2("🍆"); });
    
    let hearteyes2: HTMLElement = <HTMLElement> document.getElementById("hearteyes2");
    hearteyes2.addEventListener("click", function(): void {handleEmoji2("😍"); });
    
    let monkey2: HTMLElement = <HTMLElement> document.getElementById("monkey2");
    monkey2.addEventListener("click", function(): void {handleEmoji2("🙈"); });

    let splash2: HTMLElement = <HTMLElement> document.getElementById("splash2");
    splash2.addEventListener("click", function(): void {handleEmoji2("💦"); });
    
    
    function handleEmoji2(_emoji: string): void {
        let nachricht2: HTMLInputElement =  <HTMLInputElement> document.getElementById("nachricht2");
        nachricht2.value += _emoji;
    }

    function handleEmojiButton2(): void {
        let emojiDiv: HTMLDivElement =  <HTMLDivElement> document.getElementById("emojis2");
        if (emojiDiv.style.display === "none")
            emojiDiv.style.display = "block";
        else
            emojiDiv.style.display = "none";
    }
}