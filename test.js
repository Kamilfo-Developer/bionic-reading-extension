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




const text = `<p>В <a href="/wiki/%D0%92%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%BE%D0%B5_%D0%BF%D1%80%D0%BE%D1%81%D1%82%D1%80%D0%B0%D0%BD%D1%81%D1%82%D0%B2%D0%BE" title="Векторное пространство">векторном пространстве</a> множество <a href="/wiki/%D0%A1%D0%BA%D0%B0%D0%BB%D1%8F%D1%80" title="Скаляр">скаляров</a> образует <a href="/wiki/%D0%9F%D0%BE%D0%BB%D0%B5_(%D0%BC%D0%B0%D1%82%D0%B5%D0%BC%D0%B0%D1%82%D0%B8%D0%BA%D0%B0)" class="mw-redirect" title="Поле (математика)">поле</a>, и <a href="/wiki/%D0%A3%D0%BC%D0%BD%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5_%D0%BD%D0%B0_%D1%81%D0%BA%D0%B0%D0%BB%D1%8F%D1%80" class="mw-redirect" title="Умножение на скаляр">умножение на скаляр</a> удовлетворяет нескольким <a href="/wiki/%D0%90%D0%BA%D1%81%D0%B8%D0%BE%D0%BC%D0%B0" title="Аксиома">аксиомам</a>, таким как <a href="/wiki/%D0%94%D0%B8%D1%81%D1%82%D1%80%D0%B8%D0%B1%D1%83%D1%82%D0%B8%D0%B2%D0%BD%D0%BE%D1%81%D1%82%D1%8C" title="Дистрибутивность">дистрибутивность</a> умножения. В модуле же требуется только, чтобы скаляры образовывали <a href="/wiki/%D0%9A%D0%BE%D0%BB%D1%8C%D1%86%D0%BE_(%D0%BC%D0%B0%D1%82%D0%B5%D0%BC%D0%B0%D1%82%D0%B8%D0%BA%D0%B0)" title="Кольцо (математика)">кольцо</a> (ассоциативное, <a href="/wiki/%D0%9A%D0%BE%D0%BB%D1%8C%D1%86%D0%BE_%D1%81_%D0%B5%D0%B4%D0%B8%D0%BD%D0%B8%D1%86%D0%B5%D0%B9" class="mw-redirect" title="Кольцо с единицей">с единицей</a>), аксиомы же остаются теми же самыми.
</p>`

console.log(getFormatedHTML(text))