import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      imports:[RouterTestingModule,HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should say true for the forward button enabled', () => {
    expect(component.isEnabled(1,16,6,2)).toBeTruthy();
  });
  it('should say false for the forward button enabled', () => {
    expect(component.isEnabled(1,16,6,3)).toBeFalsy();
  });
  it('should say true for the backward button enabled', () => {
    expect(component.isEnabled(-1,12,6,2)).toBeTruthy();
  });
  it('should say false for the backword button enabled', () => {
    expect(component.isEnabled(-1,16,6,1)).toBeFalsy();
  });
  
  it('should increase page number', () => {
    component.page=1;
    component.pageSize=6;
    component.totalRepos=16;
    var a = component.movePage(1);
    console.log(component.page)
    expect(component.page==2).toBeTruthy();
  });
});
