class User {
	constructor(name = "Defaultname") {
		this.name = name;
		
		this.routes = {};
	}

	createRoute(name) {
		const route = new Route(name);
		this.routes[route.name] = route;
		return route;
	}

	selectRoute(name) {
		return this.routes[name];
	}

}