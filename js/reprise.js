var repriseForm = $("#reprise-form");
var divResponse = $("#response");
var inputDate = $("#vehicule_date");
var divMarque = $("#div-vehicule-marque");
var selectMarque = $("#vehicule_marque");
var divModel = $("#div-vehicule-model");
var divCarburant = $("#div-vehicule-carburant");
var divTransmission = $("#div-vehicule-transmission");
var divVersion = $(".div-vehicule-version");
// hide field dynamic
divMarque.hide()
divModel.hide()
divCarburant.hide()
divTransmission.hide()
divVersion.hide()
repriseForm.vInfoEtape = 1;

$(document).on('click', '.btn-checked', function (event) {
    let input = $(this).children('input[name=vehicule_version]')
    if (input) {
        input.attr('checked', true)
    }
})

function message(label, message) {
    let alert = '<div class="alert alert-' + label + '">' + message + '</div>';
    divResponse.html(alert);
}

function hideInputs() {
    $("#div-vehicule-marque").hide()
    $("#div-vehicule-model").hide()
    $("#div-vehicule-carburant").hide()
    $("#div-vehicule-transmission").hide()
    $("#div-vehicule-version").hide()
}

function filter(input) {
    showLoader();
    hideInputs();
    let data = repriseForm.serialize();
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
            let carburants = response.carburants;
            let boites = response.boites;
            if (response.success) {
                if (response.versions) {
                    $("#div-vehicule-version").html(response.versions);
                    $(".div-vehicule-version").fadeIn(300)

                    $([document.documentElement, document.body]).animate({
                        scrollTop: $("#div-vehicule-version").offset().top - 160
                    }, 600);
                } else {
                    //message('danger', noVersionFound)
                }
                if (boites && boites.length > 0) {
                    let selectBoite = $("#vehicule_transmission");
                    addOptions(boites, selectBoite)
                    $("#div-vehicule-transmission").fadeIn(300)
                } else {
                    //message('danger', noTransmissionFound)
                }
                if (carburants && carburants.length > 0) {
                    let selectCarburant = $("#vehicule_carburant");
                    addOptions(carburants, selectCarburant)
                    $("#div-vehicule-carburant").fadeIn(300)
                } else {
                    //message('danger', noCarburantFound)
                }
                if (models && models.length > 0) {
                    let selectModel = $("#vehicule_model");
                    addOptions(models, selectModel)
                    $("#div-vehicule-model").fadeIn(300)
                } else {
                    //message('danger', noModelFound)
                }
                if (marques && marques.length > 0) {
                    let selectMarque = $("#vehicule_marque");
                    addOptions(marques, selectMarque)
                    $("#div-vehicule-marque").fadeIn(300)
                } else {
                    //message('danger', noMarqueFound)
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

if (repriseForm.length) {


    $(".btn-commence").click(function (e) { 
        e.preventDefault();
        $(".kia-qts, .reprise, .page-section-ptb").hide();
        $(".reprise-wizard").show();
        window.scrollTo(0,0);
    });

    let scrolY = 0;

    let nextText = repriseForm.data("next");
    let prevText = repriseForm.data("prev");
    let finishText = repriseForm.data("finish");
    let startIndex = repriseForm.data("startindex");
    repriseForm.steps({
        headerTag: ".step-title",
        bodyTag: "section",
        transitionEffect: "fade",
        titleTemplate: '<span class="step"></span> #title#',
        startIndex: startIndex,
        labels: {
            next: nextText,
            previous: prevText,
            finish: finishText
        },
        onStepChanging: function (event, currentIndex, newIndex) {

            repriseForm.validate().settings.ignore = ":disabled,:hidden:not([name=city])";
            scrolY =0;
            if (!repriseForm.valid()) {
                
                scrolY = $(window).scrollTop();
                return false
            }

            let vInfo = $(".vehicule-info");
            let data = repriseForm.serialize();
            let url = repriseForm.attr('action');
            let next = false;

            if (currentIndex === 0 && newIndex === 1) {
                divResponse.html('');
                showLoader()
                $.ajax({
                    type: "post",
                    url: url,
                    data: data + '&step=' + 1,
                    ataType: "json",
                    async: false,
                    success: function (response) {
                        emptyDivResponse()
                        emptyErrors();
                        repriseForm.attr('action', response.url)
                        next = response.success;
                        if (response.url) {
                            history.pushState({}, "",
                                response.url
                            );
                        }
                        checkAndShowErrors(response, '')
                        hideLoader()
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        emptyDivResponse()
                        console.log(XMLHttpRequest);
                        console.log(textStatus);
                        console.log(errorThrown);
                        next = false;
                        hideLoader()
                    }
                });
                return next;
            }
            if (currentIndex === 1 && newIndex === 2) {
                // STEP 2 parent
                if (repriseForm.vInfoEtape == 1) {
                    // step 2 - 1
                    showLoader()
                    $.ajax({
                        type: "post",
                        url: url,
                        data: data + '&step=' + 2,
                        ataType: "json",
                        async: false,
                        success: function (response) {
                            emptyDivResponse()
                            emptyErrors();
                            if (response.success) {
                                vInfo.hide();
                                $(".vehicule-info.vehicule-info-2").fadeIn();
                                repriseForm.vInfoEtape = 2;
                            }
                            checkAndShowErrors(response, 'vehicule_')
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            emptyDivResponse()
                            console.log(XMLHttpRequest);
                            console.log(textStatus);
                            console.log(errorThrown);
                        }
                    });
                    hideLoader()
                    // required false for newt step 2 - 2
                    return false;
                } else {
                    // step 2 - 2
                    var formData = new FormData(repriseForm[0]);
                    formData.append('step', '3');
                    formData.append('files', $('#file').files);
                    showLoader()
                    $.ajax({
                        type: "post",
                        url: url,
                        data: formData,
                        async: false,
                        cache: false,
                        contentType: false,
                        enctype: 'multipart/form-data',
                        processData: false,
                        success: function (response) {
                            emptyDivResponse()
                            emptyErrors();
                            next = response.success
                            checkAndShowErrors(response, 'vehicule_', false)
                            if (response.image_errors) {
                                $.each(response.image_errors, function (property, message) {
                                    let target = $("li:contains(" + message.file_name + ")")
                                    target = target.children('.file-info')
                                    target.append('<p class="text-danger">' + message.message_error + '</p>')
                                });
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
                    if (next) {
                        $('.actions > ul').attr('style', 'display:none');
                    }
                    return next;
                }
            }
            if (newIndex == 0) {
                if (repriseForm.vInfoEtape == 2) {
                    vInfo.hide();
                    $(".vehicule-info.vehicule-info-1").fadeIn();
                    repriseForm.vInfoEtape = 1;
                    return false;
                }
            }
            if (newIndex == 2) {
                //postRepriseForm();
                $('.reprise-wizard .wizard-content .wizard > .actions > ul').hide();
                $('.reprise-wizard .nb').hide();
            } else {
                $('.reprise-wizard .wizard-content .wizard > .actions > ul').show();
                $('.reprise-wizard .nb').show();
            }
            return true;
        }
    });

    if (startIndex === 2) {
        $('.reprise-wizard .wizard-content .wizard > .actions > ul').hide();
        $('.reprise-wizard .nb').hide();
    }

    $('a[href="#next"]').click(function (e) {
        e.preventDefault();
        $(window).scrollTop(scrolY);
    });
}

$('#vehicule_kilometrage').on("keyup", function () {
    regexNumber(this);
});

$('#vehicule_price').on("keyup", function () {
    regexNumber(this);
});

$('#phone').on("keyup", function () {
    regexNumber(this);

});

let listImages = [];


$(document).on("change", "#file", function (e) {

    // let listImages = $(this)[0].files;
    // let images = [];

    // if(listImages == null){
    //     listImages = images;
    // }else{
    //     for (let i = 0; i < images.length; i++) {

    //         images.files.push($("#file")[0].files[i])

    //     }
    // }
    let files = $(this)[0].files;

    // listImages = listImages.concat(files);
    listImages.push.apply(listImages, files);
    $("#file")[0].files = new FileListItem(listImages);


})

function FileListItem(a) {
    a = [].slice.call(Array.isArray(a) ? a : arguments)
    for (var c, b = c = a.length, d = !0; b-- && d;) d = a[b] instanceof File
    if (!d) throw new TypeError("expected argument to FileList is File or array of File objects")
    for (b = (new ClipboardEvent("")).clipboardData || new DataTransfer; c--;) b.items.add(a[c])
    return b.files
}
$(document).on("click", "#list > li .btn-remove", function (e) {
    e.preventDefault();
    let parent = $(this).parents("li");
    let index = $("#list > li").index(parent);
    parent.remove();
    // let imgTitle = $(this).data("name");

    // let list = $("#file")[0].files;

    // var files = [];

    // for (let i = 0; i < list.length; i++) {
    //     console.log(imgTitle + "   " + list[i].name);

    //     if (imgTitle != list[i].name) {
    //         console.log(index + "  " + (list.length - 1 - i));
    //         files.push($("#file")[0].files[i])
    //     }
    // }

    // var files = [
    //     new File(['content'], 'sample1.txt'),
    //     new File(['abc'], 'sample2.txt')
    // ];

    listImages.splice(index, 1)

    $("#file")[0].files = new FileListItem(listImages);
    



});

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