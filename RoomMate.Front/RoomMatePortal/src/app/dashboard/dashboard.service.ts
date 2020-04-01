import { HouseworkDto } from './../housework/dto/housework-dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestHelperService } from '../request-helper/request-helper.service';
import { WorkTypeEnum } from '../housework/dto/work-type-enum.enum';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends RequestHelperService {
  protected getApiRoute(): string {
    return 'Dashboard';
  }
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }
  public getHouseWorkByFlatId(flatId: number, workType: WorkTypeEnum): Observable<HouseworkDto[]>{
    return this.createGetRequestByParams<HouseworkDto[]>('GetHouseWorkByFlatId',
      {flatId: flatId, workType : workType}).pipe(map(data => <HouseworkDto[]>data));
  }


  public getHouseWorkByUserId(userId: number, workType: WorkTypeEnum): Observable<HouseworkDto[]>{
    return this.createGetRequestByParams<HouseworkDto[]>('GetHouseWorkByUserId',
      {userId: userId, workType : workType}).pipe(map(data => <HouseworkDto[]>data));
  }
  public addHouseWork(housework : HouseworkDto): Observable<boolean>{
    return this.createPostRequest('AddHouseWork', housework).pipe(map(data => <boolean>data));
  }

}
