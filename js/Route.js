class Route {
	constructor( name = `route${Object.keys(user.routes).length}` ) {
		this.name = name;
		this.waypoints = {};
		this.color = '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
		return this;
	}

	static updateUi = () => {
		const selectorWrapper = $("#selectorRoute select");
		const routesWrapper = $("#courses dl");
		const routes = user.routes;

		// nieuwe route bij
		if ( selectorWrapper.children().length != size(routes)) selectorWrapper.children().remove();
		
		
		routesWrapper.children().remove();
		
		if (size(routes) == 0) routesWrapper.append("<span>You have no routes.</span>");
		else
		for (const routename in routes) {
			if (!Object.prototype.hasOwnProperty.call(routes, routename)) break;
			const route = routes[routename];
			
			routesWrapper.append(route.Element());

			if ( selectorWrapper.children().length != size(routes)) selectorWrapper.append(route.ElementSelector());
		}
	}

	Element = () => {
		let route = "";
		route += `<div onclick="routeManagement(this)" class = "clickable" id = "${this.name}" href="#editRouteModal" uk-toggle>`;
			route += `<dt class = "title">${this.name} <div class = "color_box" style="background-color: ${this.color}"></div></dt>`;
			route += `<dd class = "sub-title"> Has ${size(this.waypoints)} waypoints.</dd>`;
		route += `</div>`;
		return route;
	}

	ElementSelector = () => {
		if (size(user.routes)==1) selectedRoute = this;
		return `<option ${(size(user.routes)==1 || selectedRoute.name==this.name)?"selected":""} value="${this.name}">${this.name}</option>`;
	}

	toXML = () => {
		let wptsXML = "";
		for ( const wptName in this.waypoints ) {
			wptsXML += this.waypoints[wptName].toXML();
		}
		return wptsXML;
	}

	edit = ( name ) => {
		this.name = (name!=undefined && name!=null && name!="" && name.length<20) ? name : this.name;
	}
}