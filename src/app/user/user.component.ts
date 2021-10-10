import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public doesntExist: boolean=false;
  public loadingRepos: boolean=true;
  public userID: string;
  public userDetails: any = null;
  public repos: any = null;
  public totalRepos:number = 0;
  public pageSize:number = 6;
  public page:number = 1;
  constructor(
    private route: ActivatedRoute,
    private api: ApiService
    ) { }

  ngOnInit(): void {
    this.userID = this.route.snapshot.paramMap.get('userID');
    setTimeout(()=>{
      this.getUserDetails(this.userID);
      this.getRepositories(this.userID,this.page,this.pageSize);
    },2000);
  }

  private async getUserDetails(userID){
    try{
      this.userDetails = await this.api.getUserDetails(userID);
      if(this.userDetails){
        this.totalRepos = this.userDetails.public_repos ? this.userDetails.public_repos : 0;
      }
      else{
        this.doesntExist = true;
      }
    }
    catch{
      this.doesntExist = true;
    }
  }

  private async getRepositories(userID,page,pageSize){
    this.loadingRepos = true;
    this.repos = [];
    this.repos = await this.api.getUserRepos(userID,page,pageSize) ;
    this.loadingRepos = false;
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

}
