const user = new User();
const waypoints = {};

let clickMode = "addWaypoints";
let selectedRoute = null;

const mainComponent = <WayMakerApp />;
ReactDOM.render( mainComponent, document.getElementByTagName('body') );

