import { openmojiList } from './openmoji.js';

// 1. Emoji-databasen
const emojiDb = [
    {ord: "agurk", symbol: "🥒"}, {ord: "alv", symbol: "🧝"}, {ord: "and", symbol: "🦆"}, {ord: "ape", symbol: "🐒"},
    {ord: "arm", symbol: "💪"}, {ord: "avis", symbol: "📰"}, {ord: "bad", symbol: "🛀"}, {ord: "ball", symbol: "⚽"},
    {ord: "banan", symbol: "🍌"}, {ord: "benk", symbol: "🪑"},
    {ord: "bie", symbol: "🐝"},
    {ord: "bjelle", symbol: "🔔"}, {ord: "blad", symbol: "🍃"}, {ord: "bløtkake", symbol: "🎂"},
    {ord: "blyant", symbol: "✏️"}, {ord: "bok", symbol: "📖"}, {ord: "bolle", symbol: "🥣"}, {ord: "bonde", symbol: "👨‍🌾"},
    {ord: "brev", symbol: "✉️"}, {ord: "brille", symbol: "👓"}, {ord: "bro", symbol: "🌉"}, {ord: "brokkoli", symbol: "🥦"},
    {ord: "brus", symbol: "🥤"}, {ord: "brød", symbol: "🍞"}, {ord: "bue", symbol: "🏹"}, {ord: "bukse", symbol: "👖"},
    {ord: "by", symbol: "🏙️"}, {ord: "bål", symbol: "🔥"}, {ord: "båt", symbol: "⛵"}, {ord: "bær", symbol: "🍓"}, {ord: "bøtte", symbol: "🪣"},
    {ord: "datamaskin", symbol: "💻"}, {ord: "do", symbol: "🚽"}, {ord: "dolk", symbol: "🗡️"},
    {ord: "dopapir", symbol: "🧻"}, {ord: "drage", symbol: "🐉"}, {ord: "dråpe", symbol: "💧"}, {ord: "due", symbol: "🕊️"}, {ord: "dusj", symbol: "🚿"},
    {ord: "egg", symbol: "🥚"}, {ord: "ekorn", symbol: "🐿️"},
    {ord: "engel", symbol: "😇"}, {ord: "fisk", symbol: "🐟"}, {ord: "fiske", symbol: "🎣"},
    {ord: "flagg", symbol: "🚩"}, {ord: "flaske", symbol: "🍼"}, {ord: "fly", symbol: "✈️"}, {ord: "fot", symbol: "🦶"}, {ord: "frosk", symbol: "🐸"},
    {ord: "fugl", symbol: "🐦"}, {ord: "gaffel", symbol: "🍴"}, {ord: "garn", symbol: "🧶"}, {ord: "gave", symbol: "🎁"},
    {ord: "giraff", symbol: "🦒"}, {ord: "gitar", symbol: "🎸"}, {ord: "glass", symbol: "🥛"}, {ord: "gris", symbol: "🐷"}, {ord: "gulrot", symbol: "🥕"},
    {ord: "gå", symbol: "🚶"}, {ord: "hai", symbol: "🦈"}, {ord: "hals", symbol: "🧣"}, {ord: "hammer", symbol: "🔨"}, {ord: "hanske", symbol: "🧤"},
    {ord: "heks", symbol: "🧙‍♀️"},
    {ord: "hjerte", symbol: "❤️"}, {ord: "hull", symbol: "🕳️"}, {ord: "hund", symbol: "🐕"}, {ord: "hus", symbol: "🏠"},
    {ord: "hånd", symbol: "✋"}, {ord: "ild", symbol: "🔥"}, {ord: "is", symbol: "🍦"}, {ord: "isbit", symbol: "🧊"},
    {ord: "jakke", symbol: "🧥"}, {ord: "jus", symbol: "🧃"}, {ord: "kake", symbol: "🍰"},
    {ord: "katt", symbol: "🐈"}, {ord: "kjeks", symbol: "🍪"}, {ord: "kjelke", symbol: "🛷"}, {ord: "kino", symbol: "🎬"},
    {ord: "kiste", symbol: "⚰️"}, {ord: "kjole", symbol: "👗"}, {ord: "kjøtt", symbol: "🥩"}, {ord: "klokke", symbol: "⏰"}, {ord: "klovn", symbol: "🤡"},
    {ord: "kne", symbol: "🦵"}, {ord: "kniv", symbol: "🔪"}, {ord: "konge", symbol: "🤴"}, {ord: "kopp", symbol: "☕"}, {ord: "korn", symbol: "🌾"},
    {ord: "kran", symbol: "🏗️"}, {ord: "krone", symbol: "👑"},
    {ord: "kubbe", symbol: "🪵"}, {ord: "kurv", symbol: "🧺"}, {ord: "lampe", symbol: "💡"}, {ord: "lastebil", symbol: "🚛"},
    {ord: "lue", symbol: "🧢"}, {ord: "lus", symbol: "🪳"}, {ord: "lys", symbol: "🕯️"},
    {ord: "løpe", symbol: "🏃"}, {ord: "løv", symbol: "🍃"}, {ord: "løve", symbol: "🦁"}, {ord: "maske", symbol: "🎭"},
    {ord: "maur", symbol: "🐜"}, {ord: "melk", symbol: "🥛"}, {ord: "munn", symbol: "👄"}, {ord: "mur", symbol: "🧱"},
    {ord: "musikk", symbol: "🎵"}, {ord: "natt", symbol: "🌃"}, {ord: "nese", symbol: "👃"}, {ord: "nål", symbol: "🪡"},
    {ord: "nøkkel", symbol: "🔑"}, {ord: "nøtt", symbol: "🥜"}, {ord: "orm", symbol: "🐍"}, {ord: "ost", symbol: "🧀"}, {ord: "øy", symbol: "🏝️"},
    {ord: "øye", symbol: "👁️"}, {ord: "padde", symbol: "🐸"},
    {ord: "paraply", symbol: "☂️"}, {ord: "penger", symbol: "💰"}, {ord: "pensel", symbol: "🖌️"}, {ord: "pil", symbol: "🏹"}, {ord: "pizza", symbol: "🍕"},
    {ord: "plante", symbol: "🌱"}, {ord: "plaster", symbol: "🩹"}, {ord: "pokal", symbol: "🏆"}, {ord: "pølse", symbol: "🌭"},
    {ord: "pære", symbol: "🍐"}, {ord: "racerbil", symbol: "🏎️"}, {ord: "regn", symbol: "🌧️"}, {ord: "regnbue", symbol: "🌈"},
    {ord: "reke", symbol: "🦐"}, {ord: "ri", symbol: "🏇"}, {ord: "ring", symbol: "💍"}, {ord: "ris", symbol: "🍚"}, {ord: "robot", symbol: "🤖"},
    {ord: "robåt", symbol: "🛶"}, {ord: "rose", symbol: "🌹"},
    {ord: "sebra", symbol: "🦓"}, {ord: "sekk", symbol: "🎒"}, {ord: "sirkus", symbol: "🎪"},
    {ord: "ski", symbol: "🎿"}, {ord: "skje", symbol: "🥄"}, {ord: "skjell", symbol: "🐚"}, {ord: "skjerf", symbol: "🧣"}, {ord: "skip", symbol: "🛳️"},
    {ord: "skjorte", symbol: "👕"}, {ord: "sko", symbol: "👟"}, {ord: "skole", symbol: "🏫"}, {ord: "sky", symbol: "☁️"},
    {ord: "slott", symbol: "🏰"}, {ord: "sludd", symbol: "🌨️"}, {ord: "snelle", symbol: "🧵"}, {ord: "snø", symbol: "❄️"},
    {ord: "sokker", symbol: "🧦"}, {ord: "sol", symbol: "☀️"}, {ord: "sopp", symbol: "🍄"},
    {ord: "stav", symbol: "🦯"},
    {ord: "stjerne", symbol: "⭐"}, {ord: "stol", symbol: "🪑"}, {ord: "strand", symbol: "🏖️"}, {ord: "sverd", symbol: "⚔️"}, {ord: "svømme", symbol: "🏊"},
    {ord: "telt", symbol: "⛺"},
    {ord: "terning", symbol: "🎲"}, {ord: "tomat", symbol: "🍅"}, {ord: "traktor", symbol: "🚜"}, {ord: "tralle", symbol: "🛒"},
    {ord: "tre", symbol: "🌳"}, {ord: "tromme", symbol: "🥁"}, {ord: "tv", symbol: "📺"}, {ord: "tå", symbol: "🦶"}, {ord: "tønne", symbol: "🛢️"},
    {ord: "vann", symbol: "💧"}, {ord: "vekt", symbol: "⚖️"}, {ord: "vest", symbol: "🦺"}, {ord: "vogn", symbol: "🛒"},
    {ord: "øks", symbol: "🪓"}, {ord: "øre", symbol: "👂"}
].map(item => ({
    ord: item.ord,
    symbol: `<span style="font-size: 28px; line-height: 1;">${item.symbol}</span>`
}));

// 2. OpenMoji-bildene
const openmojiDb = openmojiList.map(item => ({
    ord: item.label,
    symbol: `<img src="${item.path}" alt="${item.label}" style="width: 40px; height: 40px; object-fit: contain;">`
}));

// 3. Felles, alfabetisk sortert database som eksporteres
export const substantivDb = [...openmojiDb, ...emojiDb]
    .sort((a, b) => a.ord.localeCompare(b.ord, 'nb'));