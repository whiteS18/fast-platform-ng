import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // 全局提供该服务
})
export class ApiService {

  constructor(private http: HttpClient) {}

  // 封装 POST 请求
  postData<T>(url: string, body: Record<string, any>, params?: Record<string, any>): Observable<ApiResponse<T>|null> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        httpParams = httpParams.set(key, params[key]);
      });
    }

    return this.http.post<ApiResponse<T>>(url, body, { params: httpParams });
  }

  // 封装上传文件和 JSON 数据的方法
  postDataWithFile<T>(url:string, file: File | null, body: any, params?: Record<string, any>): Observable<ApiResponse<T>> {

    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        httpParams = httpParams.set(key, params[key]);
      });
    }

    const form = new FormData();

    // 添加文件（如果存在）
    if (file) {
      form.append('file', file, file.name);
    }

    // 将 JSON 数据转换为 Blob 并添加到 FormData
    const jsonBlob = new Blob([JSON.stringify(body)], {
      type: 'application/json',
    });
    form.append('body', jsonBlob);

    return  this.http.post<ApiResponse<T>>(url, form,{ params: httpParams });
  }





  // 使用泛型改进 GET 请求方法
  getData<T>(url: string, params?: Record<string, any>): Observable<ApiResponse<T>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        httpParams = httpParams.set(key, params[key]);
      });
    }

    return this.http.get<ApiResponse<T>>(url, { params: httpParams });
  }

}

interface ApiResponse<T> {
  code: number;
  msg: string;
  data?: T;
}
