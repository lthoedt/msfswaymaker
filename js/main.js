const user = new User();
const waypoints = {};

let clickMode = "addWaypoints";
let selectedRoute = null;

const updateUi = () => {
	Route.updateUi();
	Waypoint.updateUi();
}

$("#selectorRoute select").on("change", function () {
	selectedRoute = user.routes[$(this).val()];
	updateUi();
})

$("#createRouteButton").on("click", (e) => {
	let routeName = $("input#input_route-name").val();

	if (routeName.length > 20) return undefined;
	if (routeName.length==0) routeName = undefined;

	const route = user.createRoute(routeName);
	if (route) UIkit.notification({message: `<span class = "notification-succes">Route with name: "${route.name}" created!</span>`, status: 'success'});
	updateUi();
})

$(document).ready(function(){
	$.getJSON("legtypes.json", (legtypes) => {
		for ( const legtype in legtypes ) {
			$("#add_wpt-region select").append( optionElement(legtype, legtypes[legtype]) );
		}
	}).fail(function(err){
		console.log(err);
	});
})

const optionElement = ( value, tooltip, selected = false ) => {
	return `<option value="${value}" ${(selected)? "selected":""} title="${tooltip}">${value}</option>`;
}

const routeManagement = (e) => {
	const routeName = $(e).attr("id");
	const route = user.routes[routeName];
	const modal = $("#editRouteModal");
	modal.find(".uk-modal-title").html(`Management of route: ${route.name} <div class = "color_box" style="background-color: ${route.color}"></div>`);
	$("#input_edit_route-name").val(route.name);
	$("#editRouteButton").val(route.name);
}

$("#editRouteButton").on("click", (e) => {
	const newName = $("#input_edit_route-name").val();
	user.routes[e.target.value].edit( newName );
	$(`#${e.target.value}`).attr("id", newName);
	user.routes[newName] = user.routes[e.target.value];
	delete user.routes[e.target.value];
	$(e.target).val(newName);
});

const size = (object) => Object.keys(object).length;