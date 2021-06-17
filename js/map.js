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


	const onMapClick = (e) => {
		switch(clickMode) {
			case "addWaypoints" :
				const pos = e.latlng;
				const sp = Waypoint.selectedPropertys();
				const wpt = new Waypoint(pos, sp.name, sp.type, sp.region, sp.magvar);
				selectedRoute.waypoints[wpt.name] = wpt;
				wpt.marker = addMarker(e, map, wpt);
				updateUi();
			break;
		}
	}

	function addMarker(e, map, wpt) {
		const markerHtmlStyles = `
		  background-color: ${selectedRoute.color};
		  width: 35px;
		  height: 35px;
		  display: block;
		  left: -17.5px;
		  top: -17.5px;
		  position: relative;
		  border-radius: 5rem 5rem 0;
		  transform: rotate(45deg);
		  border: 1px solid #FFFFFF`
		
		const icon = L.divIcon({
		  className: "my-custom-pin",
		  iconAnchor: [0, 24],
		  labelAnchor: [-6, 0],
		  popupAnchor: [0, -36],
		  html: `<span style="${markerHtmlStyles}" />`
		})

		var geojsonFeature = {
	
			"type": "Feature",
			"properties": {},
			"geometry": {
					"type": "Point",
					"coordinates": [e.latlng.lat, e.latlng.lng]
			}
		}
	
		var marker;
	
		L.geoJson(geojsonFeature, {
	
			pointToLayer: function(feature, latlng){
	
				marker = L.marker(e.latlng, {
	
					title: "Resource Location",
					alt: "Resource Location",
					riseOnHover: true,
					draggable: true,
					icon: icon,
	
				}).bindPopup(`${e.latlng}<br><input type='button' value='Delete this marker' name="${wpt.name}" class='marker-delete-button'/>`);
	
				if (wpt) marker.bindTooltip(`${selectedRoute.name} - ${wpt.name}`, {permanent: true, direction: "right"}).openTooltip();
				
				marker.on("popupopen", onPopupOpen);
	
				return marker;
			}
		}).addTo(map);
		return marker;
	}
	
	function onPopupOpen() {
	
		var tempMarker = this;
	
		// To remove marker on click of delete button in the popup of marker
		$(".marker-delete-button:visible").click(function () {
			map.removeLayer(tempMarker);
			delete selectedRoute.waypoints[$(this).attr("name")];
			updateUi();
		});
	}

	map.on('click', onMapClick);
	$("#mapid").mouseup(updateUi);
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

