var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
                map: this.map,
                scale: 50000000,
                center: [-101.17, 21.78]
            });
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