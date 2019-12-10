function onSearchClick() {
    let searchText = document.querySelector('#searchTerm').value;
    let url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + searchText + '&units=metric&APPID=1bf7d2db8f859f721b0dc084ff8e20a4';
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //backgroundPainter();
            dataCutter(data);
            forecastDays(data);

            console.log(data);
        });
    document.querySelector("#cityName").innerHTML = searchText;

};


function dataCutter(data) {
    let slicedData = [];
    slicedData.push([data.list[0]]);
    for (let i = 0, j = 1; i, j < data.list.length; i += 1, j += 1) {
        if (new Date(data.list[i].dt_txt).getUTCDate() != (new Date(data.list[j].dt_txt)).getUTCDate()) {
            var set = [];
            set.push(data.list[i]);
            slicedData.push(set);
        }
    }
    for (let i = 0; i < slicedData.length; i += 1) {
        for (let j = 0; j < data.list.length; j += 1) {
            if ((new Date(slicedData[i][0].dt_txt)).getUTCDate() == new Date(data.list[j].dt_txt).getUTCDate()) {

                slicedData[i].push((data.list[j]));
            }

        }

    }
    slicedData = slicedData.slice(2, 6);
    slicedData = slicedData.map(arr => arr.slice(1));
    console.log(slicedData)
    maxTempCalculator(slicedData);
    minTempCalculator(slicedData);
    weatherDescription(slicedData);
    detailedDataWriter(slicedData);
}

function maxTempCalculator(dataArr) {
    let dailyMaxTempArr = [];
    for (let i = 0; i < dataArr.length; i += 1) {
        let maxTemp = dataArr[i][0].main.temp_max
        for (let j = 0; j < dataArr[i].length; j += 1) {
            if (dataArr[i][j].main.temp_max > maxTemp) {
                maxTemp = dataArr[i][j].main.temp_max;
            }
        }
        dailyMaxTempArr.push(`Maximum: ${maxTemp} °C`);
    }
    dataWriter(dailyMaxTempArr, '.maxTemp');
    console.log(dailyMaxTempArr);
}

function minTempCalculator(dataArr) {
    let dailyMinTempArr = [];
    for (let i = 0; i < dataArr.length; i += 1) {
        let minTemp = dataArr[i][0].main.temp_min
        for (let j = 0; j < dataArr[i].length; j += 1) {
            if (dataArr[i][j].main.temp_min < minTemp) {
                minTemp = dataArr[i][j].main.temp_min;
            }
        }
        dailyMinTempArr.push(`Minimum: ${minTemp} °C`);
    }
    dataWriter(dailyMinTempArr, '.minTemp');
    console.log(dailyMinTempArr);
}


function weatherDescription(dataArr) {
    let descriptions = [];
    let mainDescriptions = [];
    for (let i = 0; i < dataArr.length; i += 1) {
        descriptions.push(dataArr[i][3].weather[0].description);
        mainDescriptions.push(dataArr[i][3].weather[0].main);
    }
    console.log(descriptions, mainDescriptions);
    dataWriter(descriptions, '.descrDiv');
    imageWriter(mainDescriptions, '.icon_img')
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

function dataWriter(dataset, selector) {
    let selectedTags = document.querySelectorAll(selector);
    for (let i = 0, j = 0; i < dataset.length, j < selectedTags.length; i += 1, j += 1) {
        selectedTags[j].innerHTML = dataset[i];
    }
}
function imageWriter(dataset, selector) {
    let selectedTags = document.querySelectorAll(selector);
    for (let i = 0, j = 0; i < dataset.length, j < selectedTags.length; i += 1, j += 1) {
        let img = document.createElement('img');
        selectedTags[j].appendChild(img);
        img.src = `./img/${dataset[i]}.png`;
    }
}

function detailedDataWriter(dataArr) {
    let contentDivs = document.querySelectorAll('.content');
    for (let i = 0, j = 0; i < contentDivs.length, j < dataArr.length; i += 1, j += 1) {
        let dateH2 = document.createElement("h2");
        dateH2.classList.add('d-block');
        contentDivs[i].appendChild(dateH2);
        dateH2.innerHTML = `${new Date(dataArr[j][0].dt_txt).getMonth()}.${new Date(dataArr[j][0].dt_txt).getDate()}.`;
        for (let k = 0; k < dataArr[j].length; k += 1) {
            let bigDiv = document.createElement('div');
            contentDivs[i].appendChild(bigDiv);
            let p = document.createElement('p');
            bigDiv.classList.add("d-inline");
            bigDiv.classList.add("bigDiv");
            bigDiv.appendChild(p);
            p.classList.add("d-inline");
            let time = `${new Date(dataArr[j][k].dt_txt).getHours()}:00`;
            p.innerHTML = time;
            p.innerHTML += '<br>'
            p.innerHTML += dataArr[j][k].weather[0].description;
            p.innerHTML += '<br>'
            p.innerHTML += `Temperature: ${dataArr[j][k].main.temp} °C`;
            p.innerHTML += '<br>'
        }
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

