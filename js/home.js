$('.marque').on('change', function () {
    if (typeof ajax_path !== 'undefined') {
        var selectedMarque = $('option:selected', this).val();
        $.ajax({
            method: "POST",
            url: ajax_path,
            data: {
                action: "getModel",
                marque: selectedMarque
            },
            success: function (response) {
                addOptions(response, $('select[name=model]'), modelPlaceholder)
            }
        });
    }
});

$('.model').on('change', function () {
    if (typeof ajax_path !== 'undefined') {
        var selectedMarque = $('option:selected', '.marque').val();
        var selectedModel = $('option:selected', this).val();

        $.ajax({
            method: "POST",
            url: ajax_path,
            data: {
                action: "getCity",
                marque: selectedMarque,
                model: selectedModel
            },
            success: function (response) {
                addOptions(response.cities, $('select[name=city]'), cityPlaceholder)
                $('.km').html('<label for="kilometrage" class="range-slider-label">Kilométrage :</label>\n' +
                    '           <input type="text" id="kilometrage" class="range-slider-input" name="kilometrage"\n' +
                    '                  value="' + response['km'][0] + ' - ' + response['km'][1] + ' KM"/>\n' +
                    '           <div class="km-slider slider-range range-slider-range"\n' +
                    '                data-min="' + response['km'][0] + '"\n' +
                    '                data-max="' + response['km'][1] + '"\n' +
                    '                data-dmin="' + response['km'][0] + '"\n' +
                    '                data-dmax="' + response['km'][1] + '"></div>');

                reinitRangePrice('.km-slider');
            }
        });
    }
});

$('.city').on('change', function () {
    if (typeof ajax_path !== 'undefined') {
        var selectedMarque = $('option:selected', '.marque').val();
        var selectedModel = $('option:selected', '.model').val();
        var selectedCity = $('option:selected', this).val();

        $.ajax({
            method: "POST",
            url: ajax_path,
            data: {
                action: "getCarburant",
                marque: selectedMarque,
                model: selectedModel,
                city: selectedCity
            },
            success: function (response) {
                addOptions(response.carburant, $('select[name=carburant]'), carburantPlaceholder)

                $('.price-rg').html('<label for="amount" class="range-slider-label">Prix :</label>\n' +
                    '           <input type="text" id="amount" class="range-slider-input" name="amount"\n' +
                    '                  value="' + response['price'][0] + ' - ' + response['price'][1] + ' DHS"/>\n' +
                    '           <div class="price-slider slider-range range-slider-range"\n' +
                    '                data-min="' + response['price'][0] + '"\n' +
                    '                data-max="' + response['price'][1] + '"\n' +
                    '                data-dmin="' + response['price'][0] + '"\n' +
                    '                data-dmax="' + response['price'][1] + '"></div>');

                $('.ment-rg').html('<label for="amount2" class="range-slider-label">Mensualité :</label>\n' +
                    '           <input type="text" id="amount2" class="range-slider-input" name="monthly_payment"\n' +
                    '                  value="' + response['mentualite'][0] + ' - ' + response['mentualite'][1] + ' DHS"/>\n' +
                    '           <div class="ment-slider slider-range range-slider-range"\n' +
                    '                data-min="' + response['mentualite'][0] + '"\n' +
                    '                data-max="' + response['mentualite'][1] + '"\n' +
                    '                data-dmin="' + response['mentualite'][0] + '"\n' +
                    '                data-dmax="' + response['mentualite'][1] + '"></div>');

                reinitRangePrice('.price-slider');
                reinitRangePrice('.ment-slider');
            }
        });
    }
});

$('.carburant').on('change', function () {
    if (typeof ajax_path !== 'undefined') {
        var selectedMarque = $('option:selected', '.marque').val();
        var selectedModel = $('option:selected', '.model').val();
        var selectedCity = $('option:selected', '.city').val();
        var selectedCarburant = $('option:selected', this).val();

        $.ajax({
            method: "POST",
            url: ajax_path,
            data: {
                action: "getTransmission",
                marque: selectedMarque,
                model: selectedModel,
                city: selectedCity,
                carburant: selectedCarburant,
            },
            success: function (response) {
                addOptions(response, $('select[name=transmission]'), transmissionPlaceholder)
            }
        });
    }
});

$('.transmission').on('change', function () {
    if (typeof ajax_path !== 'undefined') {
        var selectedMarque = $('option:selected', '.marque').val();
        var selectedModel = $('option:selected', '.model').val();
        var selectedCity = $('option:selected', '.city').val();
        var selectedCarburant = $('option:selected', '.carburant').val();
        var selectedTransmission = $('option:selected', this).val();

        $.ajax({
            method: "POST",
            url: ajax_path,
            data: {
                action: "getYear",
                marque: selectedMarque,
                model: selectedModel,
                city: selectedCity,
                carburant: selectedCarburant,
                transmission: selectedTransmission,
            },
            success: function (response) {
                addOptions(response, $('select[name=year]'), yearPlaceholder)
            }
        });
    }
});


function reinitRangePrice(selector) {
    $(selector).each(function () {
        let min = $(this).data("min");
        let max = $(this).data("max");

        let dmin = $(this).data("dmin");
        let dmax = $(this).data("dmax");
        let unity = $(this).data("unity");

        if (!unity) {
            unity = "";
        } else {
            unity = " " + unity;
        }

        $(this).slider({
            range: true,
            min: min,
            max: max,
            values: [dmin, dmax],
            slide: function (event, ui) {
                var minV = ui.values[0],
                    maxV = ui.values[1];
                $(this).prev().val(minV + " - " + maxV + unity);
            }
        });
    })
}

/*function reInitSelect(selector) {
    var $this = $(selector), numberOfOptions = $(selector).children('option').length;
    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');
    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());
    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }
    var $listItems = $list.children('li');
    $(document).on('click', $listItems, function (e) {
        if ($('.select-options').is(':visible')) {
            e.stopPropagation();
            $list.hide();
        } else {
            e.stopPropagation();
            $('div.select-styled.active').each(function () {
                $(selector).removeClass('active').next('ul.select-options').hide();
            });
            $(selector).toggleClass('active').next('ul.select-options').toggle();
        }//end if
    });

    $(selector).on('click', $listItems, function (e) {
        e.stopPropagation();
        if ($this.val() !== null) {
            $styledSelect.text($(selector).text()).removeClass('active');
            $this.val($(selector).attr('rel'));
            $list.hide();
        }
    });

    $(document).on('click', function (e) {
        $styledSelect.removeClass('active');
        $list.hide();
    });
}*/

function addOptions(array, select, placeholder = defaultPlaceholder) {
    let oldValue = select.val(),
        attr = {};
    $.each(array, function (index, data) {
        if (index === 0) {
            select.html($("<option/>", {
                html: placeholder,
                value: ""
            }))
        }
        let value = data.value;
        if (oldValue === value) {
            attr = {
                selected: 'selected'
            }
        }
        select.append($("<option/>", {
            html: value,
            value: value,
            attr: attr
        }))
    });
    select.select2("val", oldValue);
}