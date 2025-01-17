// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { __decorate } from "tslib";
// @Component({
//   selector: 'app-water-quality',
//   templateUrl: './water-quality.component.html',
//   styleUrls: ['./water-quality.component.css'],
// })
// export class WaterQualityComponent {
//   ph: number = 7; // Default value
//   temperature: number = 25; // Default value
//   dissolvedOxygen: number = 8; // Default value
//   waterQualityMessage: string = '';
//   checkWaterQuality() {
//     if (this.ph >= 6.5 && this.ph <= 8.5 &&
//         this.temperature >= 15 && this.temperature <= 30 &&
//         this.dissolvedOxygen >= 5) {
//       this.waterQualityMessage = 'The water is good for fishes.';
//     } else {
//       this.waterQualityMessage = 'The water is not suitable for fishes.';
//     }
//   }
// }
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
let WaterQualityComponent = class WaterQualityComponent {
    ph = 7; // Default value
    temperature = 25; // Default value
    dissolvedOxygen = 8; // Default value
    waterQualityMessage = '';
    checkWaterQuality() {
        if (this.ph >= 6.5 && this.ph <= 8.5 &&
            this.temperature >= 15 && this.temperature <= 30 &&
            this.dissolvedOxygen >= 5) {
            this.waterQualityMessage = 'The water is good for fishes.';
        }
        else {
            this.waterQualityMessage = 'The water is not suitable for fishes.';
        }
    }
};
WaterQualityComponent = __decorate([
    Component({
        selector: 'app-water-quality',
        standalone: true,
        imports: [FormsModule],
        templateUrl: './water-quality.component.html',
        styleUrls: ['./water-quality.component.css']
    })
], WaterQualityComponent);
export { WaterQualityComponent };
