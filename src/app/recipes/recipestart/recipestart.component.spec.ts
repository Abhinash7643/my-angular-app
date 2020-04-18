import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipestartComponent } from './recipestart.component';

describe('RecipestartComponent', () => {
  let component: RecipestartComponent;
  let fixture: ComponentFixture<RecipestartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipestartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipestartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
