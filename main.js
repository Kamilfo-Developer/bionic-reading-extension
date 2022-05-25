function activate() {
    chrome.storage.sync.set({
        isActivated: true
    });

    const TAGS_TO_CHANGE = ["p", "li", "span", "a", "dd", "dt", "div"]

    for (let i = 0; i < TAGS_TO_CHANGE.length; i++) {
        formatTag(TAGS_TO_CHANGE[i])
    }

}



//#region all the html stuff

function formatTag(tag) {
    const elems = document.querySelectorAll(tag);

    for (let i = 0; i < elems.length; i++) {
        elems[i].innerHTML = formatHTML(elems[i].innerHTML);
    }
}

function formatHTML(html) {
    if (html.includes(`bionic-reading-text-selection`)) {
        return html
    }

    return separateHTMLAndText(html).map((elem) => {
        if (isHTMLTag(elem)) {
            if (elem.includes(`bionic-reading-text-selection`)) {
                
                return elem;
            }

            return makeTextHTMLElement(getTagName(elem), formatHTML(extractContent(elem)), getAttributes(elem), isTagSingle(elem));
        }

        return formatSentence(elem);
    }).join("");
}

function makeTextHTMLElement(name, content, attributes, singleTag = false) {

    let result = `<${name}`;

    if (attributes) {
        const attributesKeys = Object.keys(attributes);
        
        for (let i = 0; i < attributesKeys.length; i++) {
            result = `${result} ${attributesKeys[i]}="${attributes[attributesKeys[i]]}"`;
        }
    }
    
    

    if (singleTag) {
        return `${result}>`;
    }

    return `${result}>${content}</${name}>`;
}

function isTagSingle(html) {
    let leftBdrCounter = 0;
    let rightBdrCounter = 0;

    for (let i = 0; i < html.length; i++) {
        if (html[i] === "<") {
            leftBdrCounter += 1;
            continue;
        }

        if (html[i] === ">") {
            rightBdrCounter += 1;
        }

        if (leftBdrCounter === 2 || rightBdrCounter === 2) return false;
    }

    return true;
}

function getTagName(html) {
    return new DOMParser()
        .parseFromString(html, "text/html")
        .body.firstChild?.tagName?.toLowerCase();
}

function getAttributes(html) {
    const elem = new DOMParser()
        .parseFromString(html, "text/html")
        .body.firstChild

    const result = {}

    const attributeNames = elem?.getAttributeNames();

    if (attributeNames == null) {
        return null;
    }

    for (let i = 0; i < attributeNames.length; i++) {
        result[attributeNames[i]] = elem.getAttribute(attributeNames[i]);
    }

    return result;
}

function extractContent(html) {
    return new DOMParser()
        .parseFromString(html, "text/html")
        .body.firstChild?.innerHTML;
}

function separateHTMLAndText(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const arr = [...doc.body.childNodes].map(child => child.outerHTML || child.textContent);
    return arr;
}

function formatWord(word) {
    if (word.includes("bionic-reading-text-selection")) {
        return word;
    }

    return word.length > 1 ? `<strong class="bionic-reading-text-selection">${word.slice(0, Math.floor(word.length / 2))}</strong>${word.slice(Math.floor(word.length / 2))}` : `<strong class="bionic-reading-text-selection">${word}</strong>`;
}

function formatSentence(sentence) {
    if (sentence.includes("bionic-reading-text-selection")) {
        console.log(`It is here!!!${sentence}`)
        return sentence;
    }

    const result = [];

    const splited = sentence.split(" ");

    for (let i = 0; i < splited.length; i++) {
        const word = splited[i]

        result.push(formatWord(word))

    }

    return result.join(" ")
}

function isHTMLTag(string) {
    return string[0] === "<" && string[string.length - 1] === ">";
}

/*
function formatTags(tagName) {
    const tags = document.querySelectorAll(tagName);

    for (let i = 0; i < tags.length; i++) {
        tags[i].innerHTML = getFormatedHTML(tags[i].innerHTML);
    }
}





function getFormatedHTML(html) {
    const arr = arrayFromHTML(html);

    const result = arr.map((elem) => {
        return isStringHTMLTag(elem) ? elem : formatSentence(elem);
    })


    return result.join("")

}

function formatWord(word) {
    return word.length > 1 ? `<strong>${word.slice(0, Math.floor(word.length / 2))}</strong>${word.slice(Math.floor(word.length / 2))}` : word;
}

function formatSentence(sentence) {
    const result = [];

    sentence = sentence.replaceAll("&nbsp;", " ");

    const splited = sentence.split(" ");
    const signs = [",", ".", "!", "?"]


    for (let i = 0; i < splited.length; i++) {
        word = splited[i]

        if (word.trim() === "") continue


        result.push(`${formatWord(word)} `)

    }

    return result.join("")
}

function arrayFromHTML(html) {
    const regexp = /(<([^>]+)>)/ig;

    const arr = normilizeArray(html.split(regexp));

    return arr
}

function normilizeArray(arr) {
    const result = [];

    let i = 0;
    while (i < arr.length) {

        if (arr[i] === "" || arr[i] === "" || (arr[i].includes("\n"))) {
            i += 1
            continue;
        }

        if (isStringHTMLTag(arr[i])) {
            result.push(arr[i])
            i += 2;
            continue;
        }

        result.push(arr[i]);
        i += 1;
    }

    return result;
}

function isStringHTMLTag(str) {
    return str.includes("<") && str.includes(">")
}
*/
//#endregion


activate()