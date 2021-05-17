let registrationForm = $("#registration-form");
let divResponse = $("#response");
window.onload = function () {
    const myInput = document.getElementById('confirmEmail');
    myInput.onpaste = function (e) {
        e.preventDefault();
    }
}
if (registrationForm.length) {

    let scrolY = 0;

    let nextText = registrationForm.data("next");
    let prevText = registrationForm.data("prev");
    let finishText = registrationForm.data("finish");
    let startIndex = registrationForm.data("startindex");
    registrationForm.steps({
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

            registrationForm.validate().settings.ignore = ":disabled,:hidden";
            if (currentIndex === 1) {
                registrationForm.validate().settings.ignore = ":disabled,:hidden:not([name=city])";
            }
            scrolY = 0;
            if (newIndex < currentIndex) {
                registrationForm.find("input.error").removeClass("error")
                return true;
            }

            console.log(currentIndex);
            console.log(registrationForm);

            if (!registrationForm.valid()) {
                scrolY = $(window).scrollTop();
                return false;
            }

            let data = registrationForm.serialize();;
            let url = registrationForm.attr('action');
            let next = false;

            if (currentIndex === 0 && newIndex === 1) {
                urldata = window.location.pathname;
                emptyDivResponse();
                showLoader();
                $.ajax({
                    type: "post",
                    url: urldata,
                    data: data + '&step=' + 1,
                    dataType: "json",
                    async: false,
                    success: function (response) {
                        emptyDivResponse();
                        emptyErrors();
                        next = response.success;
                        if (response.iduser) {
                            $('input[name=iduser]').val(response.iduser);

                        }

                        checkAndShowErrors(response, ''); //prefix
                        hideLoader();
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        emptyDivResponse();
                        console.log(XMLHttpRequest);
                        console.log(textStatus);
                        console.log(errorThrown);
                        next = false;
                        hideLoader();
                    }
                });

                return next;
            }
            if (currentIndex === 1 && newIndex === 2) {
                // STEP 2 parent
                urlstep2 = window.location.pathname;

                emptyDivResponse();
                showLoader();
                $.ajax({
                    type: "post",
                    url: urlstep2,
                    data: data + '&step=' + 2,
                    dataType: "json",
                    async: false,
                    success: function (response) {
                        emptyDivResponse();
                        emptyErrors();
                        next = response.success;
                        if (response.identreprise) {
                            $('input[name=identreprise]').val(response.identreprise);

                        }
                        checkAndShowErrors(response, '') //prefix
                        hideLoader()
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        emptyDivResponse();
                        console.log(XMLHttpRequest);
                        console.log(textStatus);
                        console.log(errorThrown);
                        next = false;
                        hideLoader();
                    }
                });

                return next;


            }
            if (currentIndex === 2 && newIndex === 3) {
                // STEP 3 parent

                var formData = new FormData(registrationForm[0]);
                formData.append('step', '3');
                formData.append('files', $('CNIEGerantFile').files);
                formData.append('files', $('registerCommerceFile').files);

                urlstep3 = window.location.pathname;

                emptyDivResponse();
                showLoader();
                $.ajax({
                    type: "post",
                    url: urlstep3,
                    data: formData,
                    dataType: "json",
                    async: false,
                    cache: false,
                    contentType: false,
                    enctype: 'multipart/form-data',
                    processData: false,
                    success: function (response) {
                        emptyDivResponse();
                        emptyErrors();
                        next = response.success;

                        checkAndShowErrors(response, ''); //prefix
                        hideLoader();
                        if (response.success) {
                            $(".wizard-content .wizard>.actions>ul>li").addClass("d-none");
                        }


                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        emptyDivResponse();
                        console.log(XMLHttpRequest);
                        console.log(textStatus);
                        console.log(errorThrown);
                        next = false;
                        hideLoader()
                    }
                });

                return next;
            }

        }
    });

    $('a[href="#next"]').click(function (e) {
        e.preventDefault();
        $(window).scrollTop(scrolY);
    });
}

function emptyDivResponse() {
    divResponse.html('');
}

function emptyErrors() {
    let items = $('p.text-danger');
    if (items.length > 0) {
        $.each(items, function (index, item) {
            item.remove();
        })
    }
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

function showLoader() {
    $('.js-loading').show();
}

function hideLoader() {
    $('.js-loading').hide();
}