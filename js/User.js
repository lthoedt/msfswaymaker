class User {
	constructor(name = "Defaultname") {
		this.name = name;
		
		this.routes = {};
	}

	createRoute( name = `route${Object.keys(this.routes).length}` ) {
		this.routes[name] = {};
	}

	selectRoute(name) {
		return this.routes[name];
	}

}