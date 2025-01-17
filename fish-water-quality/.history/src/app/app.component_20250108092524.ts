import { Component } from '@angular/core';
import { WaterQualityComponent } from './water-quality/water-quality.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WaterQualityComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-standalone-app';
}
