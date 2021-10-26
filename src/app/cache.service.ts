import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  constructor( ) { }
  
  public set(url,data:{}={},ttl:number=1) {
    const finalData = {
      "ttl":new Date().getTime() + 1000 * 60 * ttl,
      "data":data
    }
    localStorage.setItem(url,JSON.stringify(finalData));
  }

  public get(url) {
    const stored = JSON.parse(localStorage.getItem(url))
    if(stored){
      return this.checkIfWithinTTL(url,stored);
    }
    return null;
  }

  public remove(url) {
    localStorage.removeItem(url);
  }

  private checkIfWithinTTL(url,stored){
    if(stored.data && stored.ttl && stored.ttl >= new Date().getTime()){
      return stored.data;
    }
    else if(stored.ttl < new Date().getTime()){
      this.remove(url);
    }
    return null;
  }
}
