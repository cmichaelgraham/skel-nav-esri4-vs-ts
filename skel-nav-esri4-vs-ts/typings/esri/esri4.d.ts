declare module "esri/Map" {
    class Map {
        constructor(obj: Object);
    }
    export = Map;
}

declare module "esri/views/SceneView" {
    class SceneView {
        constructor(obj: Object);
    }
    export = SceneView;
}

declare module "esri/layers/ArcGISDynamicLayer" {
    class ArcGISDynamicLayer {
        constructor(obj: Object);
    }
    export = ArcGISDynamicLayer;
}

declare module "dojo/domReady!" { }