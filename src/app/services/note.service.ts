import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../models/group';
import { GroupNote } from '../models/groupNote';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { UserNote } from '../models/userNote';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  userId=Number(localStorage.getItem("userId"))
  apiUrl = 'https://localhost:44336/api/';
  constructor(private httpClient:HttpClient) { }


  getUserNotes():Observable<ListResponseModel<UserNote>>{
  
    let newPath=this.apiUrl+"UserNotes/getallbyuserid?id="+this.userId
    return this.httpClient.get<ListResponseModel<UserNote>>(newPath)
  }

  addUserNote(note:UserNote):Observable<ResponseModel>{
    note.userId=this.userId
    return this.httpClient.post<ResponseModel>(this.apiUrl+"UserNotes/add",note)
  }

  deleteUserNote(note:UserNote):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"UserNotes/delete",note)
  }
  
  addGroupNote(note:GroupNote):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"GroupNotes/add",note)
  }

  deleteGroupNote(note:GroupNote):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"GroupNotes/delete",note)
  }

  getGroupNotes(group:Group):Observable<ListResponseModel<GroupNote>>{
    let newPath=this.apiUrl+"GroupNotes/getallbygroup"
    return this.httpClient.post<ListResponseModel<GroupNote>>(newPath,group)
  }

  getGroups():Observable<ListResponseModel<Group>>{
    let newPath=this.apiUrl+"Users/usergroups?userId="+this.userId
    return this.httpClient.get<ListResponseModel<Group>>(newPath)
    
  }

}
