import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Plat } from '../model/plat';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  placehorlder = [];
  cartItem = new BehaviorSubject([]);
  quantiteAdd = new BehaviorSubject([]);

  constructor() {
    const ls = this.getCartdata();
    if (ls) {
      this.cartItem.next(ls);
    }
  }
  // tslint:disable-next-line: typedef
  addCart( plat: Plat){
    const ls = this.getCartdata();
    let exist: Plat;

    if (ls) {
      exist = ls.find((item) => {
        return item.id === plat.id;
      });
    }
    if (exist) {
      exist.quantite++;
      this.setCartData(ls);
    } else {
      if (ls) {
        const newData  = [...ls, plat];
        this.setCartData(newData);
        this.cartItem.next(this.getCartdata());
      } else {
        this.placehorlder.push(plat);
        this.setCartData(this.placehorlder);
        this.cartItem.next(this.placehorlder);
      }
    }

  }
  // tslint:disable-next-line: typedef
  setCartData(data: any){
    localStorage.setItem('cart', JSON.stringify(data));
  }
  // tslint:disable-next-line: typedef
  getCartdata(){
    return JSON.parse(localStorage.getItem('cart'));
  }

}
