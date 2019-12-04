function onClick() {
    let searchText = document.querySelector('#searchTerm').value;
    let url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + searchText + '&units=metric&APPID=1bf7d2db8f859f721b0dc084ff8e20a4';
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            dataCleaner(data);

            console.log(data);
        });
    document.querySelector("#cityName").innerHTML = searchText;

};
function dataCleaner(data) {
    let maxTemp = 0;
    for (let i = 0, j = 1; i, j < data.list.length; i += 1, j += 1) {
        if (new Date(data.list[i].dt_txt).getUTCDate() == (new Date(data.list[j].dt_txt)).getUTCDate()) {
            if (data.list[j].main.temp_max > data.list[i].main.temp_max) {
                maxTemp = data.list[j].main.temp_max;

            }

        }
        else {
            console.log('nono')
        }
    }
    console.log(maxTemp);
}

$(function () {
    $('.toggle').on('click', function () {

        var isMaximizing = $(this).hasClass('fa-expand') === true;
        var card = $(this).parent('.card');
        var animationDelay = 500; // in ms

        /**
          Ordering of animations is different depending on if we maximize or minimize a card
        **/
        if (isMaximizing) {
            card.toggleClass('top');
            $('.card').toggleClass('center');
            // Wait for cards to center, then maximize
            setTimeout(function () {
                card.toggleClass('card-small card-large');
            }, animationDelay);
        } else {
            card.toggleClass('card-small card-large');
            // Wait until card has minized, then re-position cards
            setTimeout(function () {
                $('.card').toggleClass('center');

                // Reset z-index after cards are in their rightful place
                setTimeout(function () {
                    card.toggleClass('top');
                }, animationDelay);
            }, animationDelay);
        }

        $(this).toggleClass('fa-expand fa-compress');
    });
});