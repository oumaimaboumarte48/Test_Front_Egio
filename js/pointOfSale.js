
function initMap() {

    var morocco = new google.maps.LatLng(33.869578, -5.539416);
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: morocco,
        zoom: 7,
        
    });
   
    var image = {
        url: logo,
        size: new google.maps.Size(30, 40),
        origin: new google.maps.Point(0, 0),
        
        scaledSize: new google.maps.Size(30, 40)
    };
    
    var icons = {
        kia: {
            icon: image
        }

    };

    var features = [];
    for (var i = 0; i < NbPoints; i++) {

        var latt = parseFloat(ObjectPoints[i]["lat"]);
        var langg = parseFloat(ObjectPoints[i]["lang"]);
        var feature = {
            position: new google.maps.LatLng(latt, langg),
            type: 'kia'
        };
        features.push(feature);
    }

    var contents = [];
    for (var i = 0; i < NbPoints; i++) {
        var add1 = ""
        var add2 = ""
        var imageLink = ""
        if (ObjectPoints[i]["address"] != null)
        {
            add1 = ObjectPoints[i]["address"] + '<br>';
        }
        if (ObjectPoints[i]["address2"] != null)
        {
            add2 = ObjectPoints[i]["address2"] + '<br>';
        }
        if (ObjectPoints[i]["image"] != null)
        {
            imageLink = '<img src="' + ObjectPoints[i]["image"] + '">' +
            '<br>';
        }

        var contentString = '<div class="card mb-3">' +
            '<div div class="card-body" >' +
            '<h4>' + ObjectPoints[i]["name"] + '</h4>' +
            '<br>' + imageLink +
             '<p class="pb-3">' + 
            add1 +
            add2 +
            ObjectPoints[i]["city"] +
            '<br> </p>' +
            '<a target="_blank" href="https://www.google.com/maps/dir/?api=1&destination=' + ObjectPoints[i]["lat"] + ',' + ObjectPoints[i]["lang"] + '">' +
            '<i class="icon-ic-location"></i> Itinéraire' +
            '</a>' +
            '</div>' +
            '</div>';
        contents.push(contentString);
    }

    var lastOpenedIW;
    var markers = [];
    var infowindows = [];

    for (var i = 0; i < NbPoints; i++) {
        var marker = new google.maps.Marker({
            position: features[i].position,
            icon: icons[features[i].type].icon,
            draggable: false,
            animation: google.maps.Animation.DROP,
            map: map,
            id: i + 1
        });
        infowindows[i] = new google.maps.InfoWindow({
            content: contents[i],
        });

        google.maps.event.addListener(marker, 'click', (function (marker, infowindow) {
            return function () {
                
                if (lastOpenedIW) {
                    lastOpenedIW.close();
                }
             
                if (lastOpenedIW == infowindow) {
                    lastOpenedIW = null;
                }
                else {
                    infowindow.open(map, marker);

                    lastOpenedIW = infowindow;
                }
            };
        })(marker, infowindows[i]));
        markers.push(marker);
    };

    $(".vente_card ").each(function (index) {
        $(this).on("click", function () {
            $(".vente_card ").removeClass("active");
            $(this).addClass("active");
            if (ObjectPoints[index]["lat"] != null && ObjectPoints[index]["lang"] != null) {
                centerMapOn(markers[index]);
                if (lastOpenedIW) {
                    lastOpenedIW.close();
                }

                if (lastOpenedIW == infowindows[index]) {
                    lastOpenedIW = null;
                }
                else {
                    infowindows[index].open(map, markers[index]);

                    lastOpenedIW = infowindows[index];
                }
            }
            
        });
    });

    $('select.click_option').change(function () { 
        if ($(this).val() != 0) 
            {
            for (var i = 0; i < NbPoints; i++)
                {
                if (ObjectPoints[i]["city"] == $(this).val()){
                    if (ObjectPoints[i]["lat"] != null && ObjectPoints[i]["lang"] != null )
                    {
                        centerMapOn(markers[i]);
                        map.setZoom(11);
                    }    
                }
            } 
        }
    });

}


function myPositionFunction() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var myMarker = new google.maps.Marker({
                position: pos,
                draggable: true,
                animation: google.maps.Animation.DROP,
                map: map
            });
            var myInfoWindow = new google.maps.InfoWindow({
                content: 'Votre position.',
                position: pos
            });
            centerMapOn(myMarker);
        }, function () {
            handleLocationError(true, myInfoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Votre navigateur ne support pas la geo-localisation :) .');
    infoWindow.open(map);
}

function centerMapOn(marker) {
    map.setCenter(marker.position);
    marker.animation = google.maps.Animation.BOUNCE,
    setTimeout(function () {
        marker.setAnimation(null);
    }, 1000);
}