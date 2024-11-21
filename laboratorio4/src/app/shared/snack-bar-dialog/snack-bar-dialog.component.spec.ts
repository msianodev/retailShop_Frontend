import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarDialogComponent } from './snack-bar-dialog.component';

describe('SnackBarDialogComponent', () => {
  let component: SnackBarDialogComponent;
  let fixture: ComponentFixture<SnackBarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnackBarDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackBarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
