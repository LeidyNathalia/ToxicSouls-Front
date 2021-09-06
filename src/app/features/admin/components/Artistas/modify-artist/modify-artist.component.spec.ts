import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyArtistComponent } from './modify-artist.component';

describe('ModifyArtistComponent', () => {
  let component: ModifyArtistComponent;
  let fixture: ComponentFixture<ModifyArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyArtistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
