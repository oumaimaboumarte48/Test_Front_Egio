function initMap() {
    var myLatlng = new google.maps.LatLng(lat,lang);
    var mapOptions = {
        zoom: 12,
        center: myLatlng
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var contentString = '<div class="card border-danger mb-3" style="width: 18rem;">' +
        '<div div class="card-body text-danger" >' +
        '<h5>' + name + '</h5>' +
        '<br>' +
        '<img src="' + pointOfSale.image + '" style = "height: 100px; width: 100%;" alt="' + name +'">' +
        '<br>' +
        pointOfSale.address + '<br>';
    if (address2) {
        contentString += address2 + '<br>';
    }
    contentString += pointOfSale.email + '<br>' +
        pointOfSale.phone + '<br>' +
        pointOfSale.city + '<br>' +
        '<a href="' + pointOfSale.itineraireUrl + '" target="_blank">' +
        'Itinéraire' +
        '</a>' +
        '</div>' +
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    var image = {
        url: logo,
        size: new google.maps.Size(91, 91),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(30, 30)
    };

    var icons = {
        kia: {
            icon: image
        }
    };

    var feature = {
        position: new google.maps.LatLng(lat, lang),
        type: 'kia'
    };

    var marker = new google.maps.Marker({
        position: myLatlng,
        title: pointOfSale.name,
        icon: icons[feature.type].icon
    });

    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });

    // To add the marker to the map, call setMap();
    marker.setMap(map);
}