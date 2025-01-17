import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { WaterQualityComponent } from './water-quality/water-quality.component';
let AppComponent = class AppComponent {
    title = 'angular-standalone-app';
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        standalone: true,
        imports: [WaterQualityComponent],
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
], AppComponent);
export { AppComponent };
