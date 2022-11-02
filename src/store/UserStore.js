import { makeAutoObservable } from "mobx";
// import { deleteBasketDevice } from "../http/basketAPI"; 

export class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {}
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }
  setUser(user) {
    this._user = user;
  }

  // setStoreLoading(bool){
  //   this._storeLoading = bool
  // }

  // get storeLoading(){
  //   return this._storeLoading
  // }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }


  // removeBasketProd(basketProd) {
  //   deleteBasketDevice(basketProd.id)
  //   return this._basketProd = this._basketProd.filter((item) => item.id !== basketProd.id);
  // }


}