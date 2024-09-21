const translateBtn = document.querySelector(".translate-btn"),
inputText = document.querySelector(".input-text"),
outputText = document.querySelector(".output-text"),
copyBtn = document.querySelector(".copy-btn"),
outputTypes = document.getElementsByName("output_type")


translateBtn.addEventListener("click", batchTranslate);

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(outputText.value);
})

async function batchTranslate() {

    outputText.value = "";
    let text = inputText.value;
    let splittedText = text.split(/\r?\n|\r|\n/g);
    
    try {
        outputText.placeholder = "กำลังแปล..."
        let translatedText = await fetchTranslate(splittedText);
        
        let output = "";

        if (getOutputType() == "translation_only") {
            translatedText.forEach(text => {
                output += text + "\n"
            });
        } else {
            for (let i = 0; i < splittedText.length; i++) {
                output += `${splittedText[i]} = ${translatedText[i]}\n`;
            }
        }

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

function getOutputType() {

    for (const outputType of outputTypes) {
        if (outputType.checked) {
            return (outputType.value);
        }
    }
}