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
define(["require", "exports", 'aurelia-framework', './esri-globe-service', "esri/Map", "esri/views/SceneView", "esri/layers/ArcGISDynamicLayer", "esri/layers/FeatureLayer", "esri/renderers/SimpleRenderer", "esri/symbols/SimpleLineSymbol"], function (require, exports, aurelia_framework_1, esri_globe_service_1, EMap, SceneView, ArcGISDynamicLayer, FeatureLayer, SimpleRenderer, SimpleLineSymbol) {
    var EsriGlobe = (function () {
        function EsriGlobe(esriGlobeService) {
            this.esriGlobeService = esriGlobeService;
        }
        EsriGlobe.prototype.attached = function () {
            if (this.esriGlobeService.isConfigured) {
                return;
            }
            this.esriGlobeService.isConfigured = true;
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
            aurelia_framework_1.inject(esri_globe_service_1.EsriGlobeService), 
            __metadata('design:paramtypes', [esri_globe_service_1.EsriGlobeService])
        ], EsriGlobe);
        return EsriGlobe;
    })();
    exports.EsriGlobe = EsriGlobe;
});
//# sourceMappingURL=esri-globe.js.map