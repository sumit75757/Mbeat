import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
//  bashUrl: string = 'http://localhost:8000/api/';
  bashUrl:string = "https://mbeatapi.onrender.com/api/"
  Role: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private http: HttpClient) {}
  headers: any;
  lodeheader() {
    this.headers = {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token') + '')}`,
    };
  }

  singup(data: any) {
    return this.http.post(this.bashUrl + 'user/signUp', data);
  }
  singin(data: any) {
    return this.http.post(this.bashUrl + 'user/login', data);
  }
  forgot(data: any) {
    return this.http.post(this.bashUrl + 'user/forgot', data);
  }
  me(data: any) {
    this.lodeheader();
    return this.http.post(this.bashUrl + 'user/me', data);
  }
  getAllUser() {
    //console.log(this.headers);

    this.lodeheader();
    return this.http.get(this.bashUrl + 'user/getusers', {
      headers: this.headers,
    });
  }

  addCity(data: any) {
    this.lodeheader();
    return this.http.post(this.bashUrl + 'city/insertCity', data, {
      headers: this.headers,
    });
  }

  getCity() {
    this.lodeheader();
    return this.http.get(this.bashUrl + 'city/getCity', {
      headers: this.headers,
    });
  }
  getCitybyid(id: any) {
    this.lodeheader();
    return this.http.get(this.bashUrl + 'city/getCityById?CityId=' + id, {
      headers: this.headers,
    });
  }
  updateCity(id: any, data: any) {
    this.lodeheader();
    return this.http.put(this.bashUrl + 'city/updateCity?CityId=' + id, data, {
      headers: this.headers,
    });
  }
  deleteCity(id: any) {
    this.lodeheader();
    return this.http.delete(this.bashUrl + 'city/deleteCity?CityId=' + id, {
      headers: this.headers,
    });
  }

  addDistributor(data: any) {
    this.lodeheader();
    return this.http.post(
      this.bashUrl + 'Distributor/insertDistributor',
      data,
      { headers: this.headers }
    );
  }

  getDistributor() {
    this.lodeheader();
    return this.http.get(this.bashUrl + 'Distributor/getAllDistributor', {
      headers: this.headers,
    });
  }
  getDistributorbyid(id: any) {
    this.lodeheader();
    return this.http.get(
      this.bashUrl + 'Distributor/getDistributorById?DistributorId=' + id,
      { headers: this.headers }
    );
  }
  updateDistributor(id: any, data: any) {
    this.lodeheader();
    return this.http.put(
      this.bashUrl + 'Distributor/updateDistributor?DistributorId=' + id,
      data,
      { headers: this.headers }
    );
  }
  deleteDistCity(distId:any,id: any) {
    this.lodeheader();
    return this.http.delete(
      this.bashUrl + 'Distributor/deleteDistCity?DistributorCityId=' + id +'&DistributorId='+distId,
      { headers: this.headers }
    );
  }
  deleteDistributor(id: any) {
    this.lodeheader();
    return this.http.delete(
      this.bashUrl + 'Distributor/deleteDistributor?DistributorId=' + id,
      { headers: this.headers }
    );
  }
  getDistributorbyCity(id: any) {
    this.lodeheader();
    return this.http.get(
      this.bashUrl + 'city/getDistributorFromCity?CityId=' + id,
      { headers: this.headers }
    );
  }

  addMerchant(data: any) {
    this.lodeheader();
    return this.http.post(this.bashUrl + 'merchant/insertMerchant', data, {
      headers: this.headers,
    });
  }

  getMerchant() {
    this.lodeheader();
    return this.http.get(this.bashUrl + 'merchant/getAllMerchant', {
      headers: this.headers,
    });
  }
  getMerchantbyid(id: any) {
    this.lodeheader();
    return this.http.get(
      this.bashUrl + 'merchant/getMerchantById?MerchantId=' + id,
      { headers: this.headers }
    );
  }
  updateMerchant(id: any, data: any) {
    this.lodeheader();
    return this.http.put(
      this.bashUrl + 'merchant/updateMerchant?MerchantId=' + id,
      data,
      { headers: this.headers }
    );
  }
  deleteMerchant(id: any) {
    this.lodeheader();
    return this.http.delete(
      this.bashUrl + 'merchant/deleteMerchant?MerchantId=' + id,
      { headers: this.headers }
    );
  }

  assingRoles(id: any, data: any) {
    this.lodeheader();
    return this.http.post(this.bashUrl + 'user/assignRole?UserId=' + id, data, {
      headers: this.headers,
    });
  }

  getmurchant(id: any) {
    this.lodeheader();
    return this.http.get(
      this.bashUrl + 'city/getMerchantFromDistributor?DistributorId=' + id,
      { headers: this.headers }
    );
  }

  insertProduct(data: any) {
    this.lodeheader();
    return this.http.post(this.bashUrl + 'product/insertProduct', data, {
      headers: this.headers,
    });
  }

  getproduct() {
    this.lodeheader();
    return this.http.get(this.bashUrl + 'product/getProducts', {
      headers: this.headers,
    });
  }
  updateProduct(id: any, data: any) {
    this.lodeheader();
    return this.http.put(
      this.bashUrl + 'product/updateProduct/?ProductId=' + id,
      data,
      {
        headers: this.headers,
      }
    );
  }
  deleteProduct(id: any) {
    this.lodeheader();
    return this.http.delete(
      this.bashUrl + 'product/deleteProduct?ProductId=' + id,
      { headers: this.headers }
    );
  }
  getbyproduct(id: any) {
    this.lodeheader();
    return this.http.get(this.bashUrl + 'product/getProducts?ProductId=' + id, {
      headers: this.headers,
    });
  }

  addcaogory(data: any) {
    this.lodeheader();
    return this.http.post(
      this.bashUrl + 'product/insertProductCategory',
      data,
      { headers: this.headers }
    );
  }
  updatecaogory(id: any, data: any) {
    this.lodeheader();
    return this.http.put(
      this.bashUrl + 'product/updateProductCategory?ProductCategoryId=' + id,
      data,
      { headers: this.headers }
    );
  }
  removecaogory(id: any) {
    this.lodeheader();
    return this.http.delete(
      this.bashUrl + 'product/deleteProductCategory?ProductCategoryId=' + id,
      { headers: this.headers }
    );
  }
  getbyproductId(id: any) {
    this.lodeheader();
    return this.http.get(
      this.bashUrl + 'product/getProductCategoryById?ProductId=' + id,
      {
        headers: this.headers,
      }
    );
  }

  getorder(id?: any) {
    if (!id) {
      this.lodeheader();
      return this.http.get(this.bashUrl + 'order/getOrders', {
        headers: this.headers,
      });
    } else {
      this.lodeheader();
      return this.http.get(
        this.bashUrl + 'order/getSalesmenOrders?SalesManId=' + id,
        {
          headers: this.headers,
        }
      );
    }
  }
  getbyorder(id: any) {
    this.lodeheader();
    return this.http.get(this.bashUrl + 'order/getOrderById?OrderId=' + id, {
      headers: this.headers,
    });
  }

  addorder(data: any) {
    this.lodeheader();
    return this.http.post(this.bashUrl + 'order/insertOrder', data, {
      headers: this.headers,
    });
  }
  updateorder(id: any, data: any) {
    this.lodeheader();
    return this.http.put(this.bashUrl + 'order/updateOrders?Id=' + id, data, {
      headers: this.headers,
    });
  }
  removeorder(id: any) {
    this.lodeheader();
    return this.http.delete(this.bashUrl + 'order/deleteOrder?Id=' + id, {
      headers: this.headers,
    });
  }
  getCityByDistributor(id: any) {
    this.lodeheader();
    return this.http.get(
      this.bashUrl + 'city/getCityByDistributorId?DistributorId=' + id,
      {
        headers: this.headers,
      }
    );
  }
  getMerchantByCity(id: any) {
    this.lodeheader();
    return this.http.get(
      this.bashUrl + 'merchant/GetMerchantByCityId?CityId=' + id,
      {
        headers: this.headers,
      }
    );
  }
}
