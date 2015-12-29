import {Aurelia} from 'aurelia-framework' 

export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .globalResources('views/router-view-esri')
        .developmentLogging();

    (<any>aurelia).loader.textPluginName = 'text';
    aurelia.start().then(a => a.setRoot('views/app'));
}
