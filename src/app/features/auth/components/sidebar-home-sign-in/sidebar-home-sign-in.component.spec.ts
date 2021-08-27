import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarHomeSignInComponent } from './sidebar-home-sign-in.component';

describe('SidebarHomeComponent', () => {
  let component: SidebarHomeSignInComponent;
  let fixture: ComponentFixture<SidebarHomeSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarHomeSignInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarHomeSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
