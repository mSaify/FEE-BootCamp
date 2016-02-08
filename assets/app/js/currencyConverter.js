var template;

$(document).ready(function () {

    $.ajax({
        url: 'https://currencyconverter.p.mashape.com/availablecurrencies/',
        dataType: 'json',
        headers: {
            'X-Mashape-Key': 'Bs5BvTwMeNmshIVgyxatfWRfPMkNp1Dmi30jsnLUNZ8zyDyBW8'
        }
    }).done(function (data) {

        var i = 0,
            len = data.length,
            option,
            option2,
            datum,
            docFrag = document.createDocumentFragment(),
            docFrag2 = document.createDocumentFragment(),
            selectEl = $('.currency-selecter');

	    for (i = 0; i < len; i++) {
            datum = data[i];
            option = document.createElement('option');
            option.value = datum.id;
            option.text = datum.description.slice(4);
            option2 = document.createElement('option');
            option2.value = option.value;
            option2.text = option.text;
            docFrag.appendChild(option);
            docFrag2.appendChild(option2);
	    }

        selectEl[0].appendChild(docFrag);
        selectEl[1].appendChild(docFrag2);
	});

    $('.currency-From').on('keyup', function (e) {
        clearTimeout($.data(this, 'timer'));
        if (e.keyCode == 13) {
            getConvertedCurrencyVal();
        } else {
            $(this).data('timer', setTimeout(getConvertedCurrencyVal, 200));
        }
    });

    $(".js-currencyFrom").change(getConvertedCurrencyVal);

    $(".js-currencyTo").change(getConvertedCurrencyVal);

    function getConvertedCurrencyVal() {
        var fromCurrency = $('.js-currencyFrom').val();
        var toCurrency = $('.js-currencyTo').val();

        var fromAmount = $('.currency-From').val();

        if (fromAmount === '') {
            $('.js-error-message').text("Please Enter Amount to be Converted!!");
        } else {

            $('.js-error-message').text("");
            fromAmount = parseInt(fromAmount, 10);

            $.ajax({
                url: 'https://currencyconverter.p.mashape.com/?from=' + fromCurrency +
                    '&from_amount=' + fromAmount + '&to=' + toCurrency,
                dataType: 'json',
                headers: {
                    'X-Mashape-Key': 'Bs5BvTwMeNmshIVgyxatfWRfPMkNp1Dmi30jsnLUNZ8zyDyBW8'
                }
            }).done(function (data) {

               if (data.error !== undefined) {

                   $('.js-error-message').innerHTML("Invalid Input");

               } else {

                   $('.currency-converted-box').val(data.to_amount);
               }
           });
        }
       
    }
});