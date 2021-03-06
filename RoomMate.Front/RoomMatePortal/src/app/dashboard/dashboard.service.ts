import { HouseworkDto } from './../housework/dto/housework-dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestHelperService } from '../request-helper/request-helper.service';
import { WorkTypeEnum } from '../housework/dto/work-type-enum.enum';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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

  public editHouseWork(housework: HouseworkDto): Observable<HouseworkDto>{
    const route = "EditHouseWork";
    return this.createPutRequest(route, housework).pipe(map(data => <HouseworkDto> data));
  }

  public removeHouseWork(housework: HouseworkDto): Observable<boolean>{
    const route = "RemoveHouseWork";
    return this.createPutRequest<boolean>(route, housework).pipe(map(data => <boolean>data));
  }

}
