import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewArtist } from './viewArtist.component';

describe('ViewArtist', () => {
  let component: ViewArtist;
  let fixture: ComponentFixture<ViewArtist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewArtist ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewArtist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
