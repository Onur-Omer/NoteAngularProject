import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group';
import { GroupNote } from 'src/app/models/groupNote';
import { UserNote } from 'src/app/models/userNote';
import { NoteService } from 'src/app/services/note.service';
import { ToastrService } from 'ngx-toastr';
import {FormGroup,FormControl, Validators, FormBuilder  } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  addForm:FormGroup;
  
  Notes:any=[]
  groups:Group[]=[]
  groupPage=false
  userPage=true


  constructor(private noteService:NoteService
    ,private toastrService:ToastrService,
    private formBuilder:FormBuilder,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getGroups()
    this.createAddform()

    this.activatedRoute.params.subscribe(params=>{
      if(params["index"]){
        this.groupPage=true
        this.userPage=false

      }else{
        this.getUserNotes()
        this.groupPage=false
        this.userPage=true
      }
    })
  }

  getUserNotes(){

    this.noteService.getUserNotes().subscribe(response=>{
      this.Notes=response.data
      this.toastrService.success(response.message,"Success")
    },responseError=>{
      /* if(responseError.error.Errors.length>0){
         for (let i = 0; i <responseError.error.Errors.length; i++) {
           this.toastrService.error(responseError.error.Errors[i].ErrorMessage)
         }       
       } */
       this.toastrService.error(responseError.error)
     })
  }


  getGroupNotes(group:Group){
  console.log(group)
    this.noteService.getGroupNotes(group).subscribe(response=>{
      this.Notes=response.data
    })
  }

  getGroups(){
    
    this.noteService.getGroups().subscribe(response=>{
      this.groups=response.data
    })
  }


  createAddform(){
    this.addForm = this.formBuilder.group({
      noteTitle: ["",Validators.required],
      note:["",Validators.required]
    })
  } 

  addUserNote(){
    console.log("user")
    if(this.addForm.valid){
      let addModel :UserNote= Object.assign({},this.addForm.value)
      this.noteService.addUserNote(addModel).subscribe(response=>{
        this.toastrService.success(response.message,"Success")
        window.location.reload();
        },responseError=>{
         /* if(responseError.error.Errors.length>0){
            for (let i = 0; i <responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage)
            }       
          } */
          this.toastrService.error(responseError.error)
        })

      }
    
    else{
      this.toastrService.error("Note Title is Required","Error")
    }
  }

  addGroupNote(){
    console.log("group")
    if(this.addForm.valid){
      let addModel :GroupNote= Object.assign({},this.addForm.value)
      this.noteService.addGroupNote(addModel).subscribe(response=>{
        this.toastrService.success(response.message,"Success")
        window.location.reload();
        },responseError=>{
         /* if(responseError.error.Errors.length>0){
            for (let i = 0; i <responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage)
            }       
          } */
          this.toastrService.error(responseError.error)
        })

      }
    
    else{
      this.toastrService.error("Note Title is Required","Error")
    }
  }

  delete(note:UserNote){
    this.noteService.deleteUserNote(note).subscribe(response=>{
      this.toastrService.success(response.message,"Success")
      },responseError=>{
       /* if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage)
          }       
        } */
        this.toastrService.error(responseError.error)
      })
  }
  //delete(note:GroupNote){}

}
