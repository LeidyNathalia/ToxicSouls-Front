import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListArtistComponent } from './view-list-artist.component';

describe('ViewListArtistComponent', () => {
  let component: ViewListArtistComponent;
  let fixture: ComponentFixture<ViewListArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewListArtistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewListArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
