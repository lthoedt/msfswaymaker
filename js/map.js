const userLocation = {};

const initMap = () => {
	const map = L.map('mapid').setView([userLocation.lat, userLocation.lon], 13);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		maxZoom: 18,
		id: 'mapbox/satellite-streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoiZHV0Y2h0YSIsImEiOiJja2ZhM2NtdGEwbGt2MnFvZmlkMDZsbmpuIn0.nyR0Zfpm0uNIR9ZTK3eMgw'
	}).addTo(map);

	// var popup = L.popup();

	const onMapClick = (e) => {
		// popup
		// 	.setLatLng(e.latlng)
		// 	.setContent("You clicked the map at " + e.latlng.toString())
		// 	.openOn(map);
		switch(clickMode) {
			case "addWaypoints" :
				const pos = e.latlng;
				const wpt = new Waypoint(pos);
				selectedRoute[wpt.name] = wpt;
				L.marker([pos.lat, pos.lng]).addTo(map);
			break;
		}
	}

	map.on('click', onMapClick);
}


if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition((position) => {
		let lat = position.coords.latitude;
		let lon = position.coords.longitude;

		userLocation.lat = lat;
		userLocation.lon = lon;
		
		initMap();

	}, (error) => {
		console.log("Something went wrong with finding your location!");
		initMap();
	});
}