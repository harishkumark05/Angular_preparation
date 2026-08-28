import { Component, Input, SimpleChanges } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, Subject, switchMap } from 'rxjs';
import { UserApiService } from '../user-api.service';

@Component({
  selector: 'app-on-changes-child',
  templateUrl: './on-changes-child.component.html',
  styleUrls: ['./on-changes-child.component.css']
})
export class OnChangesChildComponent {
 @Input() userId !:string;
  private searchSubject$ = new Subject<any>();
  user ?:any;
  errorMessage ?:any;
constructor(private userService:UserApiService ){}
  ngOnInit(){
    this.searchSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((id) =>{
        return this.userService.getUser(id).pipe(
        catchError(error => { 
          this.errorMessage = error;
          return EMPTY;
        }))
  })
    ).subscribe((data: any)=>{
      this.user = data
      console.log(this.user)
      this.errorMessage = undefined;
      // console.log(this.user)
    })
  }
  ngOnChanges(changes:SimpleChanges){
     console.log(changes)
     if(changes?.['userId']){
      this.searchSubject$.next(changes?.['userId'].currentValue)
     }

  }
}
