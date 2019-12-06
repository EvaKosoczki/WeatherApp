function onClick() {
    let searchText = document.querySelector('#searchTerm').value;
    let url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + searchText + '&units=metric&APPID=1bf7d2db8f859f721b0dc084ff8e20a4';
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            backgroundPainter();
            forecastDays(data);
            maxTempCalculator(data);
            minTempCalculator(data);
            weatherDescription(data);

            console.log(data);
        });
    document.querySelector("#cityName").innerHTML = searchText;

};
function maxTempCalculator(data) {
    let maxTemp = data.list[0].main.temp_max;
    let maxTemperatures = [];
    for (let i = 0, j = 1; i, j < data.list.length; i += 1, j += 1) {
        if (new Date(data.list[i].dt_txt).getUTCDate() == (new Date(data.list[j].dt_txt)).getUTCDate()) {
            if (data.list[j].main.temp_max > data.list[i].main.temp_max) {
                maxTemp = data.list[j].main.temp_max;
            }
        }
        else {
            maxTemperatures.push("Maximum: " + maxTemp + " °C");
        }
    }
    console.log(maxTemperatures);
    tempWriter(maxTemperatures)
}

function minTempCalculator(data) {
    let minTemp = data.list[0].main.temp_min;
    let minTemperatures = [];
    for (let i = 0, j = 1; i, j < data.list.length; i += 1, j += 1) {
        if (new Date(data.list[i].dt_txt).getUTCDate() == (new Date(data.list[j].dt_txt)).getUTCDate()) {
            if (data.list[j].main.temp_min < data.list[i].main.temp_min) {
                minTemp = data.list[j].main.temp_min;
            }
        }
        else {
            minTemperatures.push("Minimum: " + minTemp + " °C");
        }
    }
    console.log(minTemperatures);
    tempWriter(minTemperatures);
}

function weatherDescription(data) {
    let descriptions = [];
    let mainDescriptions = [];
    let descriptionDiv = document.querySelectorAll(".descrDiv");
    for (let i = 0, j = 1; i, j < data.list.length; i += 1, j += 1) {

        if (new Date(data.list[i].dt_txt).getUTCDate() == (new Date(data.list[j].dt_txt)).getUTCDate()) {
            if (new Date(data.list[i].dt_txt).getHours() == 12) {
                descriptions.push(data.list[i].weather[0].description);
                mainDescriptions.push(data.list[i].weather[0].main);
            }
        }
    }



    for (let i = 1, j = 0, k = 1; i < descriptions.length, j < descriptionDiv.length, k < mainDescriptions.length; i += 1, j += 1, k += 1) {
        let image = document.createElement('img');
        image.src = `./img/${mainDescriptions[k]}.png`;
        descriptionDiv[j].appendChild(image);
        let weatherDesc = document.createElement('p');
        descriptionDiv[j].appendChild(weatherDesc);
        weatherDesc.innerHTML = descriptions[i];
    }

    console.log(mainDescriptions);
};

function forecastDays(data) {
    let fullDates = Array.from(new Set(data.list.map(item => item.dt_txt.slice(0, 10))));
    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";


    let cardHeaders = document.querySelectorAll(".date");
    for (let i = 1, j = 0; i < fullDates.length, j < cardHeaders.length; i += 1, j += 1) {
        cardHeaders[j].innerHTML = fullDates[i];
        let day = new Date(fullDates[i]).getDay()
        cardHeaders[j].innerHTML += '<br>';
        cardHeaders[j].innerHTML += weekday[day];

    }

}

function tempWriter(dataset) {
    let cardRightCol = document.querySelectorAll(".temp");
    for (let i = 1, j = 0; i < dataset.length, j < cardRightCol.length; i += 1, j += 1) {
        cardRightCol[j].innerHTML += dataset[i];
        cardRightCol[j].innerHTML += "<br>";
    }
}
/*
function backgroundPainter() {
    let bgImg = 'url("/img/Rain.jpg")';
    document.styleSheets[0].insertRule('container-fluid:after { background-image: url("/img/Rain.jpg"); }', 0);
}*/


function openTab(tabName) {
    let acContent = document.getElementById(tabName)

    var i, x;
    x = document.getElementsByClassName("content");
    for (i = 0; i < x.length; i++) {
        x[i].style.maxHeight = null;
    }
    if (acContent.style.maxHeight) {
        acContent.style.maxHeight = null;
    } else {
        acContent.style.maxHeight = acContent.scrollHeight + "px";
    }
}

