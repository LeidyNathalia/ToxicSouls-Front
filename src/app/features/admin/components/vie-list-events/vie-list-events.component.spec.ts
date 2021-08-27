import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VieListEventsComponent } from './vie-list-events.component';

describe('VieListEventsComponent', () => {
  let component: VieListEventsComponent;
  let fixture: ComponentFixture<VieListEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VieListEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VieListEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
