import { Component } from '@angular/core';

@Component({
  selector: 'app-water-quality',
  templateUrl: './water-quality.component.html',
  styleUrls: ['./water-quality.component.css'],
})
export class WaterQualityComponent {
  ph: number = 7; // Default value
  temperature: number = 25; // Default value
  dissolvedOxygen: number = 8; // Default value
  waterQualityMessage: string = '';

  checkWaterQuality() {
    if (this.ph >= 6.5 && this.ph <= 8.5 &&
        this.temperature >= 15 && this.temperature <= 30 &&
        this.dissolvedOxygen >= 5) {
      this.waterQualityMessage = 'The water is good for fishes.';
    } else {
      this.waterQualityMessage = 'The water is not suitable for fishes.';
    }
  }
}
