import EMap = require("esri/Map");
import SceneView = require("esri/views/SceneView");
import domReady = require("dojo/domReady!");

export class EsriGlobe {
    map: EMap;
    view: SceneView;
    constructor() { }
    attached() {
        this.map = new EMap({
            basemap: "streets"
        });

        this.view = new SceneView({
            container: "globe",
            map: this.map,
            scale: 50000000,
            center: [-101.17, 21.78]
        });
    }
}