class Waypoint {
	constructor( pos, name = `wpt`, type = "NAMED", region = "TF", magvar = 0 ) {
		this.pos = pos;
		this.name = name;
		this.type = type;
		this.region = region;
		this.magvar = magvar;

		const n = this.name;
		for ( const wpt of Object.keys(selectedRoute.waypoints) ) {
			if ( wpt.includes(n) && (wpt.search("^"+n+"[0-9]$")==0 || wpt.search("^"+n+"$")==0 ) ) {
				const number = wpt.replace(n, "");
				this.name = n + ( (number.length>0) ? parseInt(number) + 1 : 1 );
			}
		}
		
		return this;
	}

	static updateUi = () => { 
		const waypointsWrapper = $("#waypoints dl");

		
		if (selectedRoute == null) return undefined;
		
		const waypoints = selectedRoute.waypoints;
		
		// if ( waypointsWrapper.children().length/3 == size(waypoints)) return undefined;

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

	static selectedPropertys = () => {
		const name = $("#add_wpt-name").val();
		const magvar = $("#add_wpt-magvar").val();
		const type = $("#add_wpt-type select").val();
		const region = $("#add_wpt-region select").val();

		return {
			name: (name != "" && name.length <= 5) ? name: undefined,
			magvar: (magvar.length > 0 && magvar.length <= 5) ? magvar : undefined,
			type: (type == "NAMED" || type == "UNNAMED") ? type : undefined,
			region: (region.length == 2) ? region : undefined
		};

	}

	toXML() {
		return `<Waypoint lat="${this.pos.lat}" lon="${this.pos.lng}" magvar="${this.magvar}" waypointType="${this.type}" waypointRegion="${this.region}" waypointIdent="${this.name}"/>&#xD;`;
	}

}