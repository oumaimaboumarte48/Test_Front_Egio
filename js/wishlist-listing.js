function reload()
{
    let ids = getWishlist();
    $.ajax({
        type: "get",
        url: path,
        data: {
            ids: ids
        },
        dataType: "json",
        async: true,
        success: function (response) {
            divResult.html(response.html)
            onClick()
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}

function onClick()
{
    $('.addto').on('click', function (event) {
        event.preventDefault()
        event.stopPropagation()
        let id = $(this).data('id')
        addWishlistItem(id)
        updateCount()
        reload()
    })
}
reload()