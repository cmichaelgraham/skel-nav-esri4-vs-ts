import EMap = require("esri/Map");
import SceneView = require("esri/views/SceneView");
import ArcGISDynamicLayer = require("esri/layers/ArcGISDynamicLayer");
import FeatureLayer = require("esri/layers/FeatureLayer");
import SimpleRenderer = require("esri/renderers/SimpleRenderer");
import SimpleLineSymbol = require("esri/symbols/SimpleLineSymbol");
import domReady = require("dojo/domReady!");

export class EsriGlobe {
    map: EMap;
    view: SceneView;
    constructor() { }
    attached() {
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
            opacity: 0.33,
            renderer: new SimpleRenderer({
                "type": "simple",
                "symbol": new SimpleLineSymbol({
                    "color": [0,0,0, 255]
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
            map: this.map,
            scale: 50000000,
            center: [-101.17, 21.78]
        });
    }
}