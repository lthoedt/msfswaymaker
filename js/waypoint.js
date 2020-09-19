class Waypoint {
	constructor( pos, name = `wpt${Object.keys(selectedRoute).length}`, type = "waypoint" ) {
		this.pos = pos;
		this.name = name;
		this.type = type;

		return this;
	}
}