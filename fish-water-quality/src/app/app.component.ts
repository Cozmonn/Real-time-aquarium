import { Component } from '@angular/core';
import { WaterQualityComponent } from './water-quality/water-quality.component';
import { FormsModule } from '@angular/forms';

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
