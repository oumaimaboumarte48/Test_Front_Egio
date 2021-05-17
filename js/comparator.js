let inputCompares = $("input.compare");
let comparatorModal = $("#comparator-modal");
let titleModal = $("#comparator-modal-title");
let bodyModal = $("#comparator-modal-body");

$(document).ready(function () {
  if ($("#comparator-sticky .card-compare").length) {
    $("#comparator-sticky").show();
  } else {
    $("#comparator-sticky").hide();
  }
});

inputCompares.on("change", function (e) {
  e.preventDefault();
  let vehiculeId = e.target.value;
  let input = $(this);
  if (vehiculeId) {
    comparatorAjax(urlCompare, vehiculeId, input);
  } else {
    console.log("no vehicule id found");
  }
});
$(document).on("click", ".comparator-delete-item", function (e) {
  e.preventDefault();
  let url = $(this).attr("href");
  let vehiculeId = $(this).data("id");
  let input = $("#customCheck" + vehiculeId);
  if (vehiculeId) {
    comparatorAjax(url, vehiculeId, input);
  } else {
    console.log("no vehicule id found");
  }
});

$("#compare").on("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  let url = $(this).attr("href");
  let vehiculeId = $(this).data("id");
  let label = $(this).children(".label-compare");
  if (vehiculeId) {
    comparatorAjax(url, vehiculeId, null, label);
  } else {
    console.log("no vehicule id found");
  }
});

function comparatorAjax(urlCompare, vehiculeId, input = null, label = null) {
  $.ajax({
    type: "post",
    url: urlCompare,
    data: {
      vehicule_id: vehiculeId,
    },
    dataType: "json",
    async: true,
    success: function (response) {
      if (input != null) {
        if (response.in) {
          input.prop("checked", true);
        } else {
          input.prop("checked", false);
        }
      }
      if (label != null) {
        if (response.in) {
          label.html(labelDeleteFromComparisonList);
        } else {
          label.html(labelCompare);
        }
      }

      if (response.count) {
        $("#comparator-sticky").show();
      } else {
        $("#comparator-sticky").hide();
      }

      $(".js-count-comparator").html("(" + response.count + ")");
      $("#comparator-sticky .vehicuel-compare").html(response.sticky);
      titleModal.html(response.success ? titleSuccess : titleError);
      bodyModal.html(response.message);
      comparatorModal.modal("toggle");
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      console.log(XMLHttpRequest);
      console.log(textStatus);
      console.log(errorThrown);
      titleModal.html(titleError);
      bodyModal.html(msgError);
      comparatorModal.modal("toggle");
    },
  });
}
