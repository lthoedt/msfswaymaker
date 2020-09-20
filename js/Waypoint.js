class Waypoint {
	constructor( pos, name = `wpt${Object.keys(selectedRoute.waypoints).length}`, type = "waypoint" ) {
		this.pos = pos;
		this.name = name;
		this.type = type;

		return this;
	}

	static updateUi = () => { 
		const waypointsWrapper = $("#waypoints dl");

		
		if (selectedRoute == null) return undefined;
		
		const waypoints = selectedRoute.waypoints;
		
		if ( waypointsWrapper.children().length/3 == size(waypoints)) return undefined;

		waypointsWrapper.children().remove();
		
		if (size(waypoints) == 0) waypointsWrapper.append("<span>This route has no waypoints.</span>");

		for (const waypointname in waypoints) {
			if (!Object.prototype.hasOwnProperty.call(waypoints, waypointname)) break;
			const waypoint = waypoints[waypointname];
			
			waypointsWrapper.append(waypoint.Element());	
		}
	}

	Element = () => {
		let waypoint = "";
		waypoint += `<dt class = "title">${this.name}</dt>`;
		waypoint += `<dd class = "sub-title">Lat, Lon: ${this.pos.lat}, ${this.pos.lng}</dd>`;
		waypoint += `<dd class = "text">Type: ${this.type}</dd>`;
		return waypoint;
	}

	set pos(pos){};

	get pos() {
		return this.marker._latlng;
	}

}