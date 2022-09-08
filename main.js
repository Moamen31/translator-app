//store countries in an object
const countries = {
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "en-GB": "English",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu"
}

//get elements
const selectTags = document.querySelectorAll("select"),
    translateBtn = document.querySelector(".translate"),
    fromText = document.querySelector(".from-text"),
    toText = document.querySelector(".to-text"),
    exchangeBtn = document.querySelector(".exchange i"),
    icons = document.querySelectorAll(".icons i")


//for each select we will add value from our countries object
selectTags.forEach((tag, index) => {
    for (country in countries) {
        let selected;
        //make english and arabic selected by default
        if (index === 0 && country === "en-GB") {
            selected = "selected"
        }
        else if (index === 1 && country === "ar-SA") {
            selected = "selected"
        }
        //make the option for select
        let option = `<option value="${country}" ${selected}>${countries[country]}</option>`
        tag.insertAdjacentHTML("beforeend", option)
    }
})

translateBtn.addEventListener("click", () => {
    //get the from text
    let text = fromText.value
    //get the languages we will trasnlate from and to
    if (!text) {
        return;
    }
    toText.setAttribute("placeholder", "Translating...")
    let translateFrom = selectTags[0].value,
        translateTo = selectTags[1].value,
        apiUrl = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`
    //fetching the data from the api
    fetch(apiUrl)
        .then(res => res.json())
        .then(result => {
            //add the translated text to page
            toText.value = result.responseData.translatedText;
            toText.setAttribute("placeholder", "Translation");
        })
})

exchangeBtn.addEventListener("click", () => {
    //exchabge texts
    let tempText = fromText.value;
    fromText.value = toText.value;
    toText.value = tempText;

    //exchabge languages
    let tempLang = selectTags[0].value;
    selectTags[0].value = selectTags[1].value;
    selectTags[1].value = tempLang
})

//copy and speech icons
icons.forEach(icon => {
    icon.addEventListener("click", (e) => {
        //copy icons
        if (e.target.classList.contains("copy")) {
            //from copy icon
            if (e.target.id === "from") {
                navigator.clipboard.writeText(fromText.value)
            }
            //to copy icon
            else {
                navigator.clipboard.writeText(toText.value)
            }
        }
        //speech icons
        else {
            let utterance;
            //from speech icon
            if (e.target.id === "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTags[0].value
            }
            //to speech icon
            else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTags[1].value
            }
            speechSynthesis.speak(utterance)
        }
    })
})