import { Injectable } from '@angular/core';
import { Programme } from '../models/programme.model';


@Injectable({
    providedIn: 'root',
  })

  export class SelectedProgrammeService{
    private _programme: Programme|null=null;

    public setProgramme(programme:Programme){
        this._programme=programme;
    }

    public programme():Programme|null{
        return this._programme;
    }
  }