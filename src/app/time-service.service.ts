import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class TimeServiceService {

  constructor(private http:HttpClient) {
    
   }
   getData(){
    let url = "http://api.timezonedb.com/v2.1/get-time-zone?key=PF80HOO7ALW4&format=json&by=position&lat=47.7499627&lng=8.841999";
    return this.http.get(url);
  }
  // getTestData(){
  //   let testurl = "http://universities.hipolabs.com/search?country=United+States"
  //   return this.http.get(testurl)
  // }
}
