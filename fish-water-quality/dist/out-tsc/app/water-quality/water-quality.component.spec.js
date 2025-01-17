import { TestBed } from '@angular/core/testing';
import { WaterQualityComponent } from './water-quality.component';
describe('WaterQualityComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WaterQualityComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(WaterQualityComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
