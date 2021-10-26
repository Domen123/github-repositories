import { Component, OnInit,Input, OnChanges, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,OnChanges,OnDestroy {
  @Input() userName = ''; 
  public doesntExist: boolean=false;
  public showAnything: boolean=false;
  public loadingRepos: boolean=true;
  public userID: string;
  public userDetails: {} = {};
  public repos: {} = {};
  public totalRepos:number = 0;
  public pageSize:number = 6;
  public page:number = 1;
  private subscriptions = new Subscription();
  constructor(
    private api: ApiService
    ) { }

  ngOnInit(): void {
    this.getDetails();
  }
  ngOnChanges(){
    this.getDetails();
  }
  private getDetails(){
    this.doesntExist = false;
    this.userID = this.userName;
    if(this.userID){
      this.showAnything = true;
      this.getUserDetails(this.userID);
      this.getRepositories(this.userID,this.page,this.pageSize);
    }
    else{
      this.showAnything = false;
    }
  }

  private getUserDetails(userID){
    try{
      this.userDetails = null;
      this.subscriptions.add(this.api.getUserDetails(userID).subscribe((data) => {
        this.userDetails = data; 
        if(this.userDetails){
          this.totalRepos = _.get(this.userDetails,'public_repos',0);
        }
        else{
          this.doesntExist = true;
        }
      },
      (err) => {
        console.log('HTTP Error', err);
        this.totalRepos = _.get(this.userDetails,'public_repos',0);
        this.doesntExist = true;
      }));
    }
    catch{
      this.doesntExist = true;
    }
  }

  private getRepositories(userID,page,pageSize){
    try{
      this.loadingRepos = true;
      this.repos = [];
      this.subscriptions.add(this.api.getUserRepos(userID,page,pageSize).subscribe((data) => {
        this.repos = data;
        this.loadingRepos = false;
      },
      (err) => {
        console.log('HTTP Error', err);
        this.repos = [];
        this.loadingRepos = false;
      })
        );
    }
    catch{
      this.loadingRepos = false;
    }
  }

  changePage(page){
    this.page = page;
    this.getRepositories(this.userID,this.page,this.pageSize)
  }

  isEnabled(type,totalRepos,pagesize,page){
    if(type==-1){
      return page + type>=1 
    }
    else{
      return page + type <=  Math.floor(totalRepos/pagesize)+1;
    }
  }

  movePage(type){
    if(this.isEnabled(type,this.totalRepos,this.pageSize,this.page)){
      this.page = this.page + type;
      this.changePage(this.page)
    }
  }
  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

  public _get(obj, path,def){
    return _.get(obj, path, def);
  }
}
