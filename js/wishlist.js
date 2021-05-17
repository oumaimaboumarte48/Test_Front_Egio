$('.addto').on('click', function (event) {
    event.preventDefault()
    event.stopPropagation()
    let id = $(this).data('id')
    addWishlistItem(id)
    updateIcon(id)
    updateCount()
})

function updateIcon(id) {
    let element = $('#addto-' + id +' i:first-child')
    if (element) {
        if (element.hasClass('fa-heart-o')) {
            element.removeClass('fa-heart-o')
            element.addClass('fa-heart')
        } else {
            element.removeClass('fa-heart')
            element.addClass('fa-heart-o')
        }
    }
}

function updateAllIcon()
{
    let ids = getWishlist()
    if (ids) {
        $.each(ids, function(index, id) {
            updateIcon(id)
        });
    }
    updateCount()
}

function addWishlistItem(id)
{
    let ids = getWishlist()
    let found = $.inArray(id, ids);
    if (found >= 0) {
        // Id was found, remove it.
        ids.splice(found, 1);
    } else {
        // Id was not found, add it.
        ids.push(id);
    }
    // Save
    localStorage["wishlist"] = JSON.stringify(ids);
}

function getWishlist()
{
    // Retrieve
    let wishlist = localStorage["wishlist"];
    if (wishlist) {
        return JSON.parse(localStorage["wishlist"]);
    }
    return [];
}

function updateCount()
{
    let ids = getWishlist()
    if (ids) {
        let count = ids.length ? ids.length : '';
        $('#addto-count span:first-child').html(count)
    }
}

updateAllIcon()