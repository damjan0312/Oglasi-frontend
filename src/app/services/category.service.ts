import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { categoryUrl } from 'server/server';
import { Category } from '../models/category';



@Injectable()
export class CategoryService{

    constructor(private http:HttpClient){

    }

    getAllCategories():Observable<Category[]>{
        return this.http.get<Category[]>(categoryUrl);
    }
}