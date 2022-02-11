import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPokedexComponent } from './user-pokedex.component';

describe('UserPokedexComponent', () => {
  let component: UserPokedexComponent;
  let fixture: ComponentFixture<UserPokedexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPokedexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
