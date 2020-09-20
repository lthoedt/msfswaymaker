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
	// $(this).val(selectedRoute);
})

$("#createRouteButton").on("click", (e) => {
	let routeName = $("input#input_route-name").val();

	if (routeName.length > 20) return undefined;
	if (routeName.length==0) routeName = undefined;

	const route = user.createRoute(routeName);
	if (route) UIkit.notification({message: `<span class = "notification-succes">Route with name: "${route.name}" created!</span>`, status: 'success'});
	updateUi();
})




const size = (object) => Object.keys(object).length;