function testMap() {
    var directionsRenderer = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    var arch = new google.maps.LatLng(38.624691, -90.184776);
    var map = new google.maps.Map(document.getElementById('map'), {zoom: 7, center: arch});

    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('bottom-panel'));

    calculateAndDisplayRoute(directionsService, directionsRenderer);
}

var items = [38.734259, -89.914724, 38.701784, -89.961667, 38.677606, -89.982400]; // [cracker barrel, circle k, domino's]
var waypoints = [];
for (var i = 0; i < items.length; i++) {
    var address = items[i];
    if (address !== "") {
        waypoints.push({
            location: address,
            stopover: true
        });
    }
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    var start = new google.maps.LatLng(41.872952, -87.624713); //Hilton chicago
    var end = new google.maps.LatLng(38.625587, -90.190871); //Hilton at the Ball Park
    directionsService.route({
        origin: start,
        destination: end,
        /*waypoints: waypoints, //an array of waypoints
        optimizeWaypoints: true, //set to true if you want google to determine the shortest route or false to use the order specified. */
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(response);
        } 
        else 
        {
            window.alert('Directions request failed due to ' + status);
        }
    });
}