const listLinks = [
    "/Users/jakeopie/weatherApp/images/sunnyWeather.jpeg",
    "/Users/jakeopie/weatherApp/images/rainyWeather.jpeg",
    "/Users/jakeopie/weatherApp/images/thunderStorm.jpeg"
]

let w = 0

function changeBg() {
    if (w === 2) {
        w = 0;
    } else {
        w += 1;
    }

    document.body.style.background = `url(${listLinks[w]}) no-repeat`;
    document.body.style.backgroundSize = 'cover';
}