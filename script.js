const translateBtn = document.querySelector(".translate-btn"),
inputText = document.querySelector(".input-text"),
outputText = document.querySelector(".output-text");


translateBtn.addEventListener("click", batchTranslate);


async function batchTranslate() {

    let text = inputText.value;
    let splittedText = text.split(/\r?\n|\r|\n/g);
    
    try {
        outputText.placeholder = "กำลังแปล..."
        let translatedText = await fetchTranslate(splittedText);
        console.log(translatedText);
        
        let output = "";
        translatedText.forEach(text => {
                output += text + "\n"
            });

        outputText.value = output;
        outputText.placeholder = "คำแปลจะปรากฏในช่องนี้"
    }
    catch (error) {
        console.error(error);
    }
}

async function fetchTranslate(toTranslate) {
    
    let translated = [];
    for (const word of toTranslate) {
        try {
            const response = await fetch(`https://api.mymemory.translated.net/get?q=${word}&langpair=en|th&de=phatsakon2550@gmail.com`);

            const data = await response.json();
            translated.push(data.responseData.translatedText);
        } 
        catch (error) {
            console.error(error);
        }
    }
    
    return translated;
}
