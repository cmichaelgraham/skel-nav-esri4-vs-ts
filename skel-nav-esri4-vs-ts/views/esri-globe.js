var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-framework', './app', "esri/Map", "esri/views/SceneView", "esri/layers/ArcGISDynamicLayer", "esri/layers/FeatureLayer", "esri/renderers/SimpleRenderer", "esri/symbols/SimpleLineSymbol"], function (require, exports, aurelia_framework_1, app_1, EMap, SceneView, ArcGISDynamicLayer, FeatureLayer, SimpleRenderer, SimpleLineSymbol) {
    var EsriGlobe = (function () {
        function EsriGlobe(app) {
            this.app = app;
        }
        EsriGlobe.prototype.detached = function () {
            this.app.mapVisible = false;
        };
        EsriGlobe.prototype.attached = function () {
            var _this = this;
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
                layers: [eqLyr, poolPermitLyr]
            });
            this.map.add(usCountiesLyr);
            this.view = new SceneView({
                container: "globe",
                camera: { tilt: 80 },
                map: this.map,
                scale: 1000000,
                center: [-101.17, 21.78]
            });
            //Register events to control
            this.rotateAntiClockwiseSpan = window.document.getElementById("rotateAntiClockwiseSpan");
            this.rotateClockwiseSpan = window.document.getElementById("rotateClockwiseSpan");
            this.indicatorSpan = window.document.getElementById("indicatorSpan");
            this.tiltzoom = window.document.getElementById("tiltzoom");
            this.rotateClockwiseSpan.onclick = function (ev) { _this.rotateView(-1); };
            this.rotateAntiClockwiseSpan.onclick = function (ev) { _this.rotateView(1); };
            this.indicatorSpan.onclick = function (ev) { _this.tiltView; };
            this.tiltzoom.onclick = function (ev) {
                _this.map.layers = [];
                _this.view.animateTo({
                    position: [7.654, 45.919, 5183],
                    tilt: 80
                });
                _this.map.basemap = 'hybrid';
            };
            //Watch the change on view.camera
            this.view.watch("camera", function (cam) { _this.updateIndicator(cam); });
        };
        //Create the event's callback functions
        EsriGlobe.prototype.rotateView = function (direction) {
            var heading = this.view.camera.heading;
            // Set the heading of the view to the closest multiple of 45 degrees,
            // depending on the direction of rotation
            if (direction > 0) {
                heading = Math.floor((heading + 1e-3) / 45) * 45 + 45;
            }
            else {
                heading = Math.ceil((heading - 1e-3) / 45) * 45 - 45;
            }
            this.view.animateTo({
                heading: heading
            });
        };
        EsriGlobe.prototype.tiltView = function () {
            // Get the camera tilt and add a small number for numerical inaccuracies
            var tilt = this.view.camera.tilt + 1e-3;
            // Switch between 3 levels of tilt
            if (tilt >= 80) {
                tilt = 0;
            }
            else if (tilt >= 40) {
                tilt = 80;
            }
            else {
                tilt = 40;
            }
            this.view.animateTo({
                tilt: tilt
            });
        };
        EsriGlobe.prototype.updateIndicator = function (camera) {
            var tilt = camera.tilt;
            var heading = camera.heading;
            // Update the indicator to reflect the current tilt/heading using
            // css transforms.
            var transform = "rotateX(" + 0.8 * tilt +
                "deg) rotateY(0) rotateZ(" + -heading + "deg)";
            this.indicatorSpan.style["transform"] = transform;
            this.indicatorSpan.style["-webkit-transform"] = transform; //Solution for Safari
        };
        EsriGlobe = __decorate([
            aurelia_framework_1.inject(app_1.App), 
            __metadata('design:paramtypes', [app_1.App])
        ], EsriGlobe);
        return EsriGlobe;
    })();
    exports.EsriGlobe = EsriGlobe;
});
//# sourceMappingURL=esri-globe.js.map