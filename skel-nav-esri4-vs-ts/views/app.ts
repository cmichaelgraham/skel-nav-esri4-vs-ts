import {Router} from 'aurelia-router';

export class App {
    router: Router;

    configureRouter(config, router: Router) {
        config.title = 'Aurelia';
        config.map([
            { route: ['', 'welcome'], name: 'welcome', moduleId: './welcome', nav: true, title: 'Welcome' },
            { route: 'flickr', name: 'flickr', moduleId: './flickr', nav: true, title: 'Flickr' },
            { route: 'users', name: 'users', moduleId: './users', nav: true, title: 'Github Users' },
            { route: 'esri-globe', name: 'esri-globe', moduleId: './esri-globe', nav: true, title: 'ESRI Globe' },
            { route: 'child-router', name: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' }
        ]);

        this.router = router;
    }
}