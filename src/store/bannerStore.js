import { makeAutoObservable } from "mobx";

export class BannerStore {
  constructor() {
    this._banner = [];
    makeAutoObservable(this);
  }


  setBanner(banner) {
    this._banner = banner;
  }


  get banner() {
    return this._banner;
  }
}
