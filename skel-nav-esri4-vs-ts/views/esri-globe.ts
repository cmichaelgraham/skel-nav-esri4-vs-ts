import {inject} from 'aurelia-framework';
import {App} from './app';

// esri imports
import EMap = require("esri/Map");
import SceneView = require("esri/views/SceneView");
import ArcGISDynamicLayer = require("esri/layers/ArcGISDynamicLayer");
import FeatureLayer = require("esri/layers/FeatureLayer");
import SimpleRenderer = require("esri/renderers/SimpleRenderer");
import SimpleLineSymbol = require("esri/symbols/SimpleLineSymbol");
import domReady = require("dojo/domReady!");

@inject(App)
export class EsriGlobe {
    map: EMap;
    view: SceneView;
    app: App;
    rotateAntiClockwiseSpan: HTMLElement;
    rotateClockwiseSpan: HTMLElement;
    indicatorSpan: HTMLElement;
    tiltzoom: HTMLElement;

    constructor(app: App) {
        this.app = app;
    }

    detached() {
        this.app.mapVisible = false;
    }

    attached() {
        this.app.mapVisible = true;

        if (this.app.mapInitialized) {
            return;
        }

        this.app.mapInitialized = true;

        // Pool permit layer
        var poolPermitLyr = new ArcGISDynamicLayer({
            url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/PoolPermits/MapServer"
        });

        // Earth quake layer
        var eqLyr = new ArcGISDynamicLayer({
            url: "https://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/Earthquakes/MapServer"
        });

        // Demographics layer
        //var demLyr = new ArcGISDynamicLayer({
        //    url: "http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer"
        //});

        // US Counties - Feature Layer
        var usCountiesLyr = new FeatureLayer({
            url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_Counties_Generalized/FeatureServer/0",
            opacity: 0.13,
            renderer: new SimpleRenderer({
                "type": "simple",
                "symbol": new SimpleLineSymbol({
                    "color": [0, 0, 0, 255]
                })
            })
        });

        this.map = new EMap({
            basemap: "streets",
            layers: [/*demLyr,*/ eqLyr, poolPermitLyr]
        });

        this.map.add(usCountiesLyr);

        this.view = new SceneView({
            container: "globe",
            camera: {tilt: 80},
            map: this.map,
            scale: 1000000,
            center: [-101.17, 21.78]
        });

        //Register events to control
        this.rotateAntiClockwiseSpan = window.document.getElementById("rotateAntiClockwiseSpan");
        this.rotateClockwiseSpan = window.document.getElementById("rotateClockwiseSpan");
        this.indicatorSpan = window.document.getElementById("indicatorSpan");
        this.tiltzoom = window.document.getElementById("tiltzoom");
        this.rotateClockwiseSpan.onclick = (ev: MouseEvent): any => { this.rotateView(-1); };
        this.rotateAntiClockwiseSpan.onclick = (ev: MouseEvent): any => { this.rotateView(1); };
        this.indicatorSpan.onclick = (ev: MouseEvent): any => { this.tiltView; };
        this.tiltzoom.onclick = (ev: MouseEvent): any => {
            this.map.layers = [];
            this.view.animateTo({
                position: [7.654, 45.919, 5183],
                tilt: 80
            });
            this.map.basemap = 'hybrid';
        };

        //Watch the change on view.camera
        this.view.watch("camera", (cam) => { this.updateIndicator(cam); });
    }
    //Create the event's callback functions
    rotateView(direction) {
        var heading = this.view.camera.heading;

        // Set the heading of the view to the closest multiple of 45 degrees,
        // depending on the direction of rotation
        if (direction > 0) {
            heading = Math.floor((heading + 1e-3) / 45) * 45 + 45;
        } else {
            heading = Math.ceil((heading - 1e-3) / 45) * 45 - 45;
        }

        this.view.animateTo({
            heading: heading
        });
    }

    tiltView() {
        // Get the camera tilt and add a small number for numerical inaccuracies
        var tilt = this.view.camera.tilt + 1e-3;

        // Switch between 3 levels of tilt
        if (tilt >= 80) {
            tilt = 0;
        } else if (tilt >= 40) {
            tilt = 80;
        } else {
            tilt = 40;
        }

        this.view.animateTo({
            tilt: tilt
        });
    }

    updateIndicator(camera) {
        var tilt = camera.tilt;
        var heading = camera.heading;

        // Update the indicator to reflect the current tilt/heading using
        // css transforms.
        var transform = "rotateX(" + 0.8 * tilt +
            "deg) rotateY(0) rotateZ(" + -heading + "deg)";

        this.indicatorSpan.style["transform"] = transform;
        this.indicatorSpan.style["-webkit-transform"] = transform; //Solution for Safari
    }
}