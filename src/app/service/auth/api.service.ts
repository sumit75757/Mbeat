import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // bashUrl: string = 'http://localhost:8000/api/';
  bashUrl:string = "https://mbeatapi.onrender.com/api/"
  Role: BehaviorSubject<any> | any;

  constructor(private http: HttpClient) {
    this.Role = new BehaviorSubject('');
  }
  headers: any = {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token') + '')}`,
  };

  singup(data: any) {
    return this.http.post(this.bashUrl + 'user/signUp', data);
  }
  singin(data: any) {
    return this.http.post(this.bashUrl + 'user/login', data);
  }
  me(data: any) {
    return this.http.post(this.bashUrl + 'user/me', data);
  }
  getAllUser() {
    //console.log(this.headers);

    return this.http.get(this.bashUrl + 'user/getusers', {
      headers: this.headers,
    });
  }

  addCity(data: any) {
    return this.http.post(this.bashUrl + 'city/insertCity', data, {
      headers: this.headers,
    });
  }

  getCity() {
    return this.http.get(this.bashUrl + 'city/getCity', {
      headers: this.headers,
    });
  }
  getCitybyid(id: any) {
    return this.http.get(this.bashUrl + 'city/getCityById?CityId=' + id, {
      headers: this.headers,
    });
  }
  updateCity(id: any, data: any) {
    return this.http.put(this.bashUrl + 'city/updateCity?CityId=' + id, data, {
      headers: this.headers,
    });
  }
  deleteCity(id: any) {
    return this.http.delete(this.bashUrl + 'city/deleteCity?CityId=' + id, {
      headers: this.headers,
    });
  }

  addDistributor(data: any) {
    return this.http.post(
      this.bashUrl + 'Distributor/insertDistributor',
      data,
      { headers: this.headers }
    );
  }

  getDistributor() {
    return this.http.get(this.bashUrl + 'Distributor/getAllDistributor', {
      headers: this.headers,
    });
  }
  getDistributorbyid(id: any) {
    return this.http.get(
      this.bashUrl + 'Distributor/getDistributorById?DistributorId=' + id,
      { headers: this.headers }
    );
  }
  updateDistributor(id: any, data: any) {
    return this.http.put(
      this.bashUrl + 'Distributor/updateDistributor?DistributorId=' + id,
      data,
      { headers: this.headers }
    );
  }
  deleteDistributor(id: any) {
    return this.http.delete(
      this.bashUrl + 'Distributor/deleteDistributor?DistributorId=' + id,
      { headers: this.headers }
    );
  }
  getDistributorbyCity(id: any) {
    return this.http.get(
      this.bashUrl + 'city/getDistributorFromCity?CityId=' + id,
      { headers: this.headers }
    );
  }

  addMerchant(data: any) {
    return this.http.post(this.bashUrl + 'merchant/insertMerchant', data, {
      headers: this.headers,
    });
  }

  getMerchant() {
    return this.http.get(this.bashUrl + 'merchant/getAllMerchant', {
      headers: this.headers,
    });
  }
  getMerchantbyid(id: any) {
    return this.http.get(
      this.bashUrl + 'merchant/getMerchantById?MerchantId=' + id,
      { headers: this.headers }
    );
  }
  updateMerchant(id: any, data: any) {
    return this.http.put(
      this.bashUrl + 'merchant/updateMerchant?MerchantId=' + id,
      data,
      { headers: this.headers }
    );
  }
  deleteMerchant(id: any) {
    return this.http.delete(
      this.bashUrl + 'merchant/deleteMerchant?MerchantId=' + id,
      { headers: this.headers }
    );
  }

  assingRoles(id: any, data: any) {
    return this.http.post(this.bashUrl + 'user/assignRole?UserId=' + id, data, {
      headers: this.headers,
    });
  }

  getmurchant(id: any) {
    return this.http.get(
      this.bashUrl + 'city/getMerchantFromDistributor?DistributorId=' + id,
      { headers: this.headers }
    );
  }

  insertProduct(data: any) {
    return this.http.post(this.bashUrl + 'product/insertProduct', data, {
      headers: this.headers,
    });
  }

  getproduct() {
    return this.http.get(this.bashUrl + 'product/getProducts', {
      headers: this.headers,
    });
  }
  updateProduct(id: any, data: any) {
    return this.http.put(this.bashUrl + 'product/updateProduct/?ProductId=' + id, data, {
      headers: this.headers,
    });
  }
  deleteProduct(id: any) {
    return this.http.delete(
      this.bashUrl + 'product/deleteProduct?ProductId=' + id,
      { headers: this.headers }
    );
  }
  getbyproduct(id: any) {
    return this.http.get(this.bashUrl + 'product/getProducts?ProductId=' + id, {
      headers: this.headers,
    });
  }

  addcaogory(data: any) {
    return this.http.post(
      this.bashUrl + 'product/insertProductCategory',
      data,
      { headers: this.headers }
    );
  }
  updatecaogory(id: any, data: any) {
    return this.http.put(
      this.bashUrl + 'product/updateProductCategory?ProductCategoryId=' + id,
      data,
      { headers: this.headers }
    );
  }
  removecaogory(id: any) {
    return this.http.delete(
      this.bashUrl + 'product/deleteProductCategory?ProductCategoryId=' + id,
      { headers: this.headers }
    );
  }
  getbyproductId(id: any) {
    return this.http.get(this.bashUrl + 'product/getProductCategoryById?ProductId=' + id, {
      headers: this.headers,
    });
  }
  

  getorder(id?: any) {
    if (!id) {
      return this.http.get(this.bashUrl + 'order/getOrders', {
        headers: this.headers,
      });
    } else {
      return this.http.get(this.bashUrl + 'order/getOrders/?SalesManId=' + id, {
        headers: this.headers,
      });
    }
  }
  getbyorder(id: any) {
      return this.http.get(this.bashUrl + 'order/getOrderById?OrderId='+id, {
        headers: this.headers,
      });
    
  }

  addorder(data: any) {
    return this.http.post(this.bashUrl + 'order/insertOrder', data, {
      headers: this.headers,
    });
  }
  updateorder(id:any,data: any) {
    return this.http.put(this.bashUrl + 'order/updateOrders?Id='+id, data, {
      headers: this.headers,
    });
  }
  removeorder(id: any) {
    return this.http.delete(this.bashUrl + 'order/deleteOrder?Id='+id, {
      headers: this.headers,
    });
  }
}
