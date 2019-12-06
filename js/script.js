function onClick() {
    let searchText = document.querySelector('#searchTerm').value;
    let url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + searchText + '&units=metric&APPID=1bf7d2db8f859f721b0dc084ff8e20a4';
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
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
    let cardLeftCols = document.querySelectorAll(".leftcol");
    for (let i = 0, j = 1; i, j < data.list.length; i += 1, j += 1) {

        if (new Date(data.list[i].dt_txt).getUTCDate() == (new Date(data.list[j].dt_txt)).getUTCDate()) {
            if (new Date(data.list[i].dt_txt).getHours() == 12) {
                descriptions.push(data.list[i].weather[0].description);
            }
        }
    }
    for (let i = 1, j = 0; i < descriptions.length, j < cardLeftCols.length; i += 1, j += 1) {
        let image = document.createElement('img');
        image.src = "./img/clear.png";
        cardLeftCols[j].appendChild(image);
        let weatherDesc = document.createElement('p');
        cardLeftCols[j].appendChild(weatherDesc);
        weatherDesc.innerHTML = descriptions[i];
    }

    console.log(descriptions);
};

function forecastDays(data) {
    let dates = Array.from(new Set(data.list.map(item => item.dt_txt.slice(5, 10))));
    let cardHeaders = document.querySelectorAll(".card-header");
    for (let i = 1, j = 0; i < dates.length, j < cardHeaders.length; i += 1, j += 1) {
        cardHeaders[j].innerHTML = dates[i];
    }
}

function tempWriter(dataset) {
    let cardRightCol = document.querySelectorAll(".rightcol");
    for (let i = 1, j = 0; i < dataset.length, j < cardRightCol.length; i += 1, j += 1) {
        cardRightCol[j].innerHTML += dataset[i];
        cardRightCol[j].innerHTML += "<br>";
    }
}

function openTab(tabName) {
    var i, x;
    x = document.getElementsByClassName("containerTab");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
}