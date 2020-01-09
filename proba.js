function onSearchClick() {
    //let searchText = document.querySelector('#searchTerm').value;
    let proxyurl = 'https://cors-anywhere.herokuapp.com/';
    let url = 'http://api.weatherunlocked.com/api/resortforecast/54883717?num_of_days=3&app_id=9c5299b0&app_key=487420b72374e394b4d26708d4e5d498';
    fetch(proxyurl + url)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //backgroundPainter();
            console.log(data);


        });


};
