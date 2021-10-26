import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  public userID:string = "";
  public query:string = "";
  constructor()  { }
  search = _.debounce(this.searchQuery,500)

  ngOnInit(): void {
  }
  go(){
    this.search();
    // this.route.navigate([`/user/${this.userID}`]);
  }
  searchQuery(){
    this.query = this.userID;
  }
}
