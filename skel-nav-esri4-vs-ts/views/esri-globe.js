define(["require", "exports", "esri/Map", "esri/views/SceneView", "esri/layers/ArcGISDynamicLayer"], function (require, exports, EMap, SceneView, ArcGISDynamicLayer) {
    var EsriGlobe = (function () {
        function EsriGlobe() {
        }
        EsriGlobe.prototype.attached = function () {
            // Earth quake layer
            var poolPermitLyr = new ArcGISDynamicLayer({
                url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/PoolPermits/MapServer"
            });
            var eqLyr = new ArcGISDynamicLayer({
                url: "https://tmservices1.esri.com/arcgis/rest/services/LiveFeeds/Earthquakes/MapServer"
            });
            this.map = new EMap({
                basemap: "streets",
                layers: [eqLyr, poolPermitLyr]
            });
            this.view = new SceneView({
                container: "globe",
                map: this.map,
                scale: 50000000,
                center: [-101.17, 21.78]
            });
        };
        return EsriGlobe;
    })();
    exports.EsriGlobe = EsriGlobe;
});
//# sourceMappingURL=esri-globe.js.map