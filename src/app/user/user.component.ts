import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
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
      this.userDetails = await this.api.getUserDetails(userID)
      this.totalRepos = this.userDetails.public_repos ? this.userDetails.public_repos : 0;
  }

  private async getRepositories(userID,page,pageSize){
    this.repos = [];
    this.repos = await this.api.getUserRepos(userID,page,pageSize);
  }

  changePage(page){
    this.page = page;
    this.getRepositories(this.userID,this.page,this.pageSize)
  }

  isEnabled(type){
    if(type==-1){
      return this.page + type>=1 
    }
    else{
      return this.page + type <=  Math.floor(this.totalRepos/this.pageSize)+1;
    }
  }

  movePage(type){
    if(this.isEnabled(type)){
      this.page = this.page + type;
      this.changePage(this.page)
    }
  }

}
