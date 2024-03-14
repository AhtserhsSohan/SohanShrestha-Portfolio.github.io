var map;

function GetMap() {
    map = new Microsoft.Maps.Map('#myMap', {
        credentials: 'AizdabDBYKYIuLoNk-mNInhICkUGiqqPM_qWYQalPycRyTyuerYG65FeaIjMK4Mz',
        center: new Microsoft.Maps.Location(-33.868820, 151.209290),
        mapTypeId: Microsoft.Maps.MapTypeId.aerial,
        zoom: 11,

        // For positioning
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,

        // disable the scrolling of the mouse 
        disableScrollWheelZoom: true,

    });

    //Create an infobox at the center of the map but don't show it.
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    //Assign the infobox to a map instance.
    infobox.setMap(map);

    //Create a pushpin at a random location in the map bounds.
    var randomLocation = new Microsoft.Maps.Location(-33.868820, 151.209290);
    var pin = new Microsoft.Maps.Pushpin(randomLocation, {
        title: "Default Location",
        subTitle: "Sohan's Suit",
        text: 'Sohan'
    });

    //Store some metadata with the pushpin.
    pin.metadata = {
        title: 'Sydney Office',
        description: '10 barrack st'
    };

    //Add a click event handler to the pushpin.
    Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);

    //Add the pushpin to the map
    map.entities.push(pin);



    function pushpinClicked(e) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }




    //Request the user's location
    navigator.geolocation.getCurrentPosition(function (position) {
        var loc = new Microsoft.Maps.Location(
            position.coords.latitude,
            position.coords.longitude);

        //Add a pushpin at the user's location.
        var pin1 = new Microsoft.Maps.Pushpin(loc, {
            title: "Users Location Identified",
            subTitle: "User's Suit",
            text: 'User'
        });

        //Store some metadata with the pushpin.
        pin1.metadata = {
            title: 'User Office',
            description: 'Lattitude: ' + position.coords.latitude + ' , ' + 'Longtitude: ' +
                position.coords.longitude
        };

        Microsoft.Maps.Events.addHandler(pin1, 'click', pushpinClicked);
        map.entities.push(pin1);

        //Center the map on the user's location.
        map.setView({ center: loc, zoom: 15 });
    });
}
