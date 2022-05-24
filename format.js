export function getFormatedHTML(html) {
    const arr = arrayFromHTML(html);

    return arr.map((elem) => {
        return isStringHTMLTag(elem) ? elem : formatSentence(elem);
    }).join("")

}

function formatWord(word) {
    word = word.replaceAll()
    return `<span style="font-weight: bold">${word.slice(0, Math.floor(word.length / 2))}</span>${word.slice(Math.floor(word.length / 2))}`
}

function formatSentence(sentence) {
    const result = [];

    for (const word of sentence.split(" ")) {
        result.push(formatWord(word))
    }

    return result.join(" ")
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

        if (arr[i] === "") {
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