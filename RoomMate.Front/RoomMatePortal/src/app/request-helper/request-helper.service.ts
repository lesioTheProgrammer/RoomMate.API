import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export abstract class RequestHelperService {
  private wwwPath: string = environment.apiPath + this.getApiRoute();

  protected abstract getApiRoute(): string;

  constructor(protected http: HttpClient) {}

  public createGetRequest<T>(route: string): Observable<T> {
    return this.http.get<T>(this.wwwPath + "/" + route);
  }

  public createGetRequestById<T>(route: string, id: number): Observable<T> {
    return this.http.get<T>(this.wwwPath + "/" + route + "/" + id);
  }

  protected createGetRequestByParams<T>(
    route: string,
    requestData: Object
  ): Observable<T> {
    let httpParams = new HttpParams();
    Object.keys(requestData).forEach(function (key) {
      httpParams = httpParams.append(key, requestData[key]);
    });
    return this.http.get<T>(this.wwwPath + "/" + route, { params: httpParams });
  }

  public createPostRequest<T>(
    route: string,
    requestData: Object
  ): Observable<T> {
    return this.http.post<T>(
      this.wwwPath + "/" + route,
      JSON.stringify(requestData),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  }

  public createPutRequest<T>(
    route: string,
    requestData: Object
  ): Observable<T> {
    return this.http.put<T>(
      this.wwwPath + "/" + route,
      JSON.stringify(requestData),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  }
}
