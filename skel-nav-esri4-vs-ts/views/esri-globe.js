define(["require", "exports", "esri/Map", "esri/views/SceneView"], function (require, exports, EMap, SceneView) {
    var EsriGlobe = (function () {
        function EsriGlobe() {
        }
        EsriGlobe.prototype.attached = function () {
            this.map = new EMap({
                basemap: "streets"
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