let wordLimit = document.querySelector("#wordlimit").value;
let multipleFacts = document.querySelector("#multiplefacts").value;
let factOutput = document.querySelector("#factoutput");
let initialCatApiUrl = `https://catfact.ninja/fact`;
let catApiUrlComplete = "";

function timeout (ms) {
    return new Promise(res => setTimeout(res,ms));
}

function replaceAllElementsClassName(prevClassName, newClassName) {
    let elementArray = document.querySelectorAll(`.${prevClassName}`);
    if (elementArray) {
        elementArray.forEach((element) => element.setAttribute("class", newClassName));
    }
}

function removeAllElementsByClassName (className) {
    let elementArray = document.querySelectorAll(`.${className}`);
    if (elementArray) {
        elementArray.forEach((element) => element.remove());
    }
}

async function removeOldDivSlideOut (oldClassName, newClassName, transitionTime) {
        transitionTime = transitionTime || 150;
        replaceAllElementsClassName(oldClassName, newClassName);
        await timeout(transitionTime);
        removeAllElementsByClassName(newClassName);
        return 1;
}

function printToNewDiv (factObject) {
    let timeoutCounter = 0;
    factOutput.classList.add("d-out");
    factObject.data.forEach((element) => {
        (async () => {
        const newElement = document.createElement("div");
        newElement.setAttribute("class", "container-center section-offwhite d-out");
        const newDivMarker = document.getElementById("newfactmarker");
        document.body.insertBefore(newElement, newDivMarker);
    await timeout(`${timeoutCounter}0`);
        factOutput.remove();
        newElement.classList.remove("d-out");
        newElement.classList.add("extradiv");
        newElement.innerText = element.fact;
    })()
    timeoutCounter += 9;
    })
}

function generateLink() {
    wordLimit = document.querySelector("#wordlimit").value;
    multipleFacts = document.querySelector("#multiplefacts").value;
    if (wordLimit != "" && multipleFacts === "") {
        catApiUrlComplete = `${initialCatApiUrl}?max_length=${wordLimit}`
    } else if (wordLimit === "" && multipleFacts != "") {
        catApiUrlComplete = `${initialCatApiUrl}s?limit=${multipleFacts}`
    } else if (wordLimit != "" && multipleFacts != "") {
        catApiUrlComplete = `${initialCatApiUrl}s?max_length=${wordLimit}&limit=${multipleFacts}`
    } else {
        catApiUrlComplete = initialCatApiUrl;
    }
    return catApiUrlComplete;
}

function generateFact() {
    fetch(generateLink())
    .then(response => response.json())
    .then(responseJson => {
        if(responseJson.fact){
            factOutput.innerText = responseJson.fact;
        } else {
            if(!generateFact.didRun) {
                printToNewDiv(responseJson);
                generateFact.didRun = true;
            } else {
                (async () => {
                   await removeOldDivSlideOut("extradiv", "d-out", 150);
                   printToNewDiv(responseJson); 
                })()                                
            }
        }
    }).catch(error => factOutput.innerText = `${error}`)
}

/**
 * * var direction = (x > 100) ? 1 : -1; //! ternary notation
 * * provide fallback values using || //! pipe operators
 * Array.from(document.getElementsByClassName(prevClassName)) //! dont use this, it changes live
 * Array.from(document.getElementsByClassName(className)) //! dont use this, it changes live
 */