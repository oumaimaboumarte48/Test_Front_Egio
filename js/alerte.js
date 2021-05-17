var alerteForm = $("#alerte-form");
var divResponse = $("#response");
var divMarque = $("#div-vehicule-marque");
var selectMarque = $("#vehicule_marque");
var divModel = $("#div-vehicule-model");
addMarques();


// hide field dynamic
// divModel.hide()
// alerteForm.vInfoEtape = 1;

function message(label, message) {
    let alert = '<div class="alert alert-' + label + '">' + message + '</div>';
    divResponse.html(alert);
}

function hideInputs() {
    $("#div-vehicule-model").hide()
}

function addMarques(){
    let data = alerteForm.serialize();
    $.ajax({
        type: "post",
        url: URLFilterData,
        data: data,
        dataType: "json",
        async: true,
        success: function (response) {
            emptyDivResponse()
            let marques = response.marques;
            let models = response.models;

            if (response.success) {
                if (marques && marques.length > 0) {
                    let selectMarque = $("#vehicule_marque");
                    addOptions(marques, selectMarque)
                    $("#div-vehicule-marque").fadeIn(300)
                } else {
                    message('danger', noMarqueFound)
                }
            } else {
                if (response.error) {
                    $("#response").html(response.error);
                }
            }
            hideLoader()
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            emptyDivResponse()
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
            hideLoader()
        }
    });

}

function filter(input) {
    showLoader();
    //hideInputs();
    let data = alerteForm.serialize();
    $.ajax({
        type: "post",
        url: URLFilterData,
        data: data,
        dataType: "json",
        async: true,
        success: function (response) {
            emptyDivResponse()
            let marques = response.marques;
            let models = response.models;
            
            if (response.success) {
                if (models && models.length > 0) {
                    let selectModel = $("#vehicule_model");
                    addOptions(models, selectModel)
                    $("#div-vehicule-model").fadeIn(300)
                } else {
                    message('danger', noModelFound)
                }
                if (marques && marques.length > 0) {
                    let selectMarque = $("#vehicule_marque");
                    addOptions(marques, selectMarque)
                    $("#div-vehicule-marque").fadeIn(300)
                } else {
                    message('danger', noMarqueFound)
                }
            } else {
                if (response.error) {
                    $("#response").html(response.error);
                }
            }
            hideLoader()
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            emptyDivResponse()
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
            hideLoader()
        }
    });
}

function addOptions(array, select) {
    let oldValue = select.val(),
        attr = {};
    $.each(array, function (index, data) {
        if (index === 0) {
            select.html($("<option/>", {
                html: SELECTLabel,
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

function checkAndShowErrors(response, prefix, alert = true) {
    if (!response.success) {
        var errors = response.errors;
        if (errors) {
            $.each(errors, function (property, message) {
                let target = $('#' + prefix + property).parent()
                //target.children('.text-danger').remove()
                target.append('<p class="text-danger">' + message + '</p>')
            });
        }
    }
    if (alert && response.html) {
        divResponse.html(response.html);
    }
}

function emptyErrors() {
    var items = $('p.text-danger');
    if (items.length > 0) {
        $.each(items, function (index, item) {
            item.remove();
        })
    }
}

function emptyDivResponse() {
    divResponse.html('');
}



function regexNumber(input) {
    var value = $(input).val();
    var regex_cell = /[^[0-9+]]*/gi;
    var new_value = value.replace(regex_cell, '');
    $(input).val(new_value);
}

function showLoader() {
    $('.js-loading').show()
}

function hideLoader() {
    $('.js-loading').hide()
}
