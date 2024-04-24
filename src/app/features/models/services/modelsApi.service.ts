import { HttpClient } from '@angular/common/http';
import { Injectable, model } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelListItemDto } from '../models/model-list-item-dto';
import { ModelDetailsDto } from '../models/model-details-dto';
import { CreateModelRequest } from '../models/create-model-request';
import { CreateModelResponse } from '../models/create-model-response';

@Injectable({
  providedIn: 'root',
})
export class ModelsApiService {
  constructor(private http: HttpClient) {}

  getList(
    brandId: number | null = null,
    searchBrandName: string | null = null,
    pageIndex: number = 0,
    pageSize: number = 10,
  ): Observable<ModelListItemDto[]> {
    const requestQueryParams: any = {
      _page: pageIndex + 1,
      _limit: pageSize,
    };
    if (brandId !== null) requestQueryParams.brandId = brandId;
    if (searchBrandName) requestQueryParams.name_like = searchBrandName;

    return this.http.get<ModelListItemDto[]>('http://localhost:3000/models', {
      params: requestQueryParams, 
    });
  }

  getById(id:number): Observable<ModelDetailsDto>{
    return this.http.get<ModelDetailsDto>('http://localhost:3000/models/'+id);
  }
  
    
  postModel(model: CreateModelRequest): Observable<CreateModelResponse> {
    return this.http.post<CreateModelResponse>(
      'http://localhost:3000/models',
      model
    );
  }
  putModel(model: CreateModelRequest, id:number): Observable<CreateModelResponse> {
    return this.http.put<CreateModelResponse>(
      'http://localhost:3000/models/'+ id,
      model
    );
  }
}
