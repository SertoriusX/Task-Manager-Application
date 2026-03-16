import { Component } from '@angular/core';
import { BoardService } from '../../../service/BoardService/board-service';
import { BoardStateService } from '../../../service/BoardStateService/board-state-service';
import { FormsModule, NgForm } from '@angular/forms';
import { BoardModel } from '../../../models/BoardModel/board-model';

@Component({
  selector: 'app-board-create',
  imports: [FormsModule],
  templateUrl: './board-create.html',
  styleUrl: './board-create.css',
})
export class BoardCreate {
  constructor(private boardSer:BoardService,private boardState:BoardStateService){}

  boardAdd(form:NgForm){
    const dto:BoardModel=form.value
          this.boardSer.boardPost(dto).subscribe({
            next:(res)=>{
              this.boardState.addBoard(res)
            },
            error:(err)=>{
              console.log(err);
              
            }
            
          })

    }
  }