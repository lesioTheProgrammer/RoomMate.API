import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CityDto } from './dto/city-dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlatAddressService {

  protected getApiRoute(): string { // controllername
    return "Flat";
  }

  private wwwPath: string = environment.apiPath + this.getApiRoute();

  constructor(private httpClient: HttpClient) {
   }

   // this service will be without request helper

   //get request with params
   // public getCityByTwoLetters(letters: string): Observable<CityDto[]>{
   //   return this.createGetRequestByParams<CityDto[]>('GetCities', {letters})
   //   .pipe(map(data => <CityDto[]>data));
   // }

   public getCityByTwoLetters(letters: string): Observable<CityDto[]>{
     let httpParams = new HttpParams();


     return this.httpClient.get<CityDto[]>(this.wwwPath + "/" + this.getApiRoute()  )



     }



   }






