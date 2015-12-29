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
define(["require", "exports", 'aurelia-dependency-injection', 'aurelia-templating', 'aurelia-router', 'aurelia-metadata', 'aurelia-pal'], function (require, exports, aurelia_dependency_injection_1, aurelia_templating_1, aurelia_router_1, aurelia_metadata_1, aurelia_pal_1) {
    var SwapStrategies = (function () {
        function SwapStrategies() {
        }
        // animate the next view in before removing the current view;
        SwapStrategies.prototype.before = function (viewSlot, previousView, callback) {
            var promise = Promise.resolve(callback());
            if (previousView !== undefined) {
                return promise.then(function () { return viewSlot.remove(previousView, true); });
            }
            return promise;
        };
        // animate the next view at the same time the current view is removed
        SwapStrategies.prototype.with = function (viewSlot, previousView, callback) {
            var promise = Promise.resolve(callback());
            if (previousView !== undefined) {
                return Promise.all([viewSlot.remove(previousView, true), promise]);
            }
            return promise;
        };
        // animate the next view in after the current view has been removed
        SwapStrategies.prototype.after = function (viewSlot, previousView, callback) {
            return Promise.resolve(viewSlot.removeAll(true)).then(callback);
        };
        return SwapStrategies;
    })();
    var swapStrategies = new SwapStrategies();
    var RouterViewEsri = (function () {
        function RouterViewEsri(element, container, viewSlot, router, viewLocator) {
            this.element = element;
            this.container = container;
            this.viewSlot = viewSlot;
            this.router = router;
            this.viewLocator = viewLocator;
            this.router.registerViewPort(this, this.element.getAttribute('name'));
        }
        RouterViewEsri.prototype.bind = function (bindingContext) {
            this.container.viewModel = bindingContext;
        };
        RouterViewEsri.prototype.process = function (viewPortInstruction, waitToSwap) {
            var _this = this;
            var component = viewPortInstruction.component;
            var childContainer = component.childContainer;
            var viewModel = component.viewModel;
            var viewModelResource = component.viewModelResource;
            var metadata = viewModelResource.metadata;
            var viewStrategy = this.viewLocator.getViewStrategy(component.view || viewModel);
            if (viewStrategy) {
                viewStrategy.makeRelativeTo(aurelia_metadata_1.Origin.get(component.router.container.viewModel.constructor).moduleId);
            }
            return metadata.load(childContainer, viewModelResource.value, null, viewStrategy, true).then(function (viewFactory) {
                viewPortInstruction.controller = metadata.create(childContainer, aurelia_templating_1.BehaviorInstruction.dynamic(_this.element, viewModel, viewFactory));
                if (waitToSwap) {
                    return;
                }
                _this.swap(viewPortInstruction);
            });
        };
        RouterViewEsri.prototype.swap = function (viewPortInstruction) {
            var previousView = this.view;
            var viewSlot = this.viewSlot;
            var swapStrategy;
            swapStrategy = this.swapOrder in swapStrategies
                ? swapStrategies[this.swapOrder]
                : swapStrategies.after;
            swapStrategy(viewSlot, previousView, addNextView);
            this.view = viewPortInstruction.controller.view;
            function addNextView() {
                viewPortInstruction.controller.automate();
                return viewSlot.add(viewPortInstruction.controller.view);
            }
        };
        __decorate([
            aurelia_templating_1.bindable, 
            __metadata('design:type', Object)
        ], RouterViewEsri.prototype, "swapOrder");
        RouterViewEsri = __decorate([
            aurelia_templating_1.customElement('router-view-esri'),
            aurelia_templating_1.noView,
            aurelia_dependency_injection_1.inject(aurelia_pal_1.DOM.Element, aurelia_dependency_injection_1.Container, aurelia_templating_1.ViewSlot, aurelia_router_1.Router, aurelia_templating_1.ViewLocator), 
            __metadata('design:paramtypes', [Object, Object, Object, Object, Object])
        ], RouterViewEsri);
        return RouterViewEsri;
    })();
    exports.RouterViewEsri = RouterViewEsri;
});
//# sourceMappingURL=router-view-esri.js.map