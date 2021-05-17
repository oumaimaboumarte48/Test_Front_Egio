$(document).ready(function () {

    $("#btnDrive").click(function () {
        $("#myLeadDrive").modal();
    });

    $("#btnInfo").click(function () {
        $("#myLeadInfo").modal();
    });

    var bookingFormEssai = $(".booking-form.booking-form-essai");
    var bookingFormInfo = $(".booking-form.booking-form-info");




    $(document).on("click", "#btnSubmitDrive", function (e) {
        e.preventDefault();

        if (bookingFormEssai.valid()) {
            $("#myLeadDrive .btn-send .load-icon").show();

            var formDataDrive = $('form[name=drive]').serialize();
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                data: formDataDrive,
                success: function (response) {
                    //inside of appel ajax
                    $("#myLeadDrive .booking-form").hide();
                    $("#myLeadDrive .success-box").show();
                    $("#myLeadDrive .btn-send .load-icon").hide();
                    $('form[name=drive]')[0].reset();
                    //-------

                },
                error: function (xhr, status, error) {
                    var errorMessage = xhr.status + ': ' + xhr.statusText

                }
            });
        }

    });


    $('#myLeadDrive').on('hidden.bs.modal', function () {
        $("#myLeadDrive .btn-send .load-icon").hide();
        $("#myLeadDrive .booking-form").show();
        $("#myLeadDrive .success-box").hide();
    })



    $(document).on("click", "#btnSubmitInfo", function (e) {
        e.preventDefault();
        if (bookingFormInfo.valid()) {
            $("#myLeadInfo .btn-send .load-icon").show();

            var formDataInfo = $('form[name=info]').serialize();
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                data: formDataInfo,
                success: function (response) {
                    $("#myLeadInfo .booking-form").hide();
                    $("#myLeadInfo .success-box").show();
                    $("#myLeadInfo .btn-send .load-icon").hide();
                    $('form[name=info]')[0].reset();

                },
                error: function (xhr, status, error) {
                    var errorMessage = xhr.status + ': ' + xhr.statusText
                }
            });

        }

    });
    $('#myLeadInfo').on('hidden.bs.modal', function () {
        $("#myLeadInfo .btn-send .load-icon").hide();
        $("#myLeadInfo .booking-form").show();
        $("#myLeadInfo .success-box").hide();
    })
});