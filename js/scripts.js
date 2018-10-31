

OWM_APIKEY = '51321b16e3ff690958988351fabf98bf';

function getWeather() {
    let input = document.getElementById("city");
    let city = input.value.trim();
    if (city == '') {
        alert('Введите название города!');
        input.focus();
    } 
    else {
        // Получаем координаты города
        let request = new XMLHttpRequest();
        let query = "https://geocode-maps.yandex.ru/1.x/?format=json&results=2&geocode=" + city;
        request.open('GET', query, false);
        request.send();
        if (request.status != 200) {
            document.write(`${request.status} ${request.statusText.toUpperCase()}`);
        } 
        else {
            let yandex = JSON.parse(request.responseText);
            if ('0' == yandex.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.found) {
                alert(`Информации о городе "${city}" не найдено!`);
                input.focus();
            }
            else {
                let img = document.getElementsByClassName('map');
                let pos = yandex.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
                img[0].src = "https://static-maps.yandex.ru/1.x/?ll=" + pos[0] + ',' + pos[1] + "&size=650,450&z=7&l=map,skl";
                //For temperature in Celsius use units=metric
                query = "https://api.openweathermap.org/data/2.5/weather?lat=" + pos[1] + "&lon=" + pos[0] + "&units=metric&APPID=" + OWM_APIKEY;
                request.open('GET', query, false);
                request.send();
                if (request.status != 200) {
                    document.write(`${request.status} ${request.statusText.toUpperCase()}`);
                }
                else {
                    let owm = JSON.parse(request.responseText);
                    let weather_info = document.querySelector('div.weather-info');
                    weather_info.innerHTML = `<p>Сегодня: ${(new Date()).toLocaleString()}</p>
                        <p>Осадки: ${owm.weather[0].main}</p>
                        <p>Температура: ${owm.main.temp} C° (${owm.main.temp_min} C° - ${owm.main.temp_max} C°)</p>
                        <p>Давление: ${owm.main.pressure} мм. рт. ст.</p>
                        <p>Влажность воздуха: ${owm.main.humidity} %</p>
                        <p>Скорость ветра: ${owm.wind.speed} м/с</p>
                    `
                }
            }
        }
    }
}