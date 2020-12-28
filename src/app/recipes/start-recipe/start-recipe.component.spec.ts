import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartRecipeComponent } from './start-recipe.component';

describe('StartRecipeComponent', () => {
  let component: StartRecipeComponent;
  let fixture: ComponentFixture<StartRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
