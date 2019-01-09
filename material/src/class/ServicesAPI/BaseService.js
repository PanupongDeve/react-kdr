import axios from "axios";
import moment from "moment";
import Storage from "../Storage";
import { ServerURL } from './Config';

const RootURL = ServerURL;
export default class BaseService {
  constructor(domain) {
    this.axios = axios;
    this.RootURL = RootURL;
    this.TokenURL = 'api/authentication/refreshToken'
    this.domain = domain;
    this.moment = moment;
    this.storage = new Storage();
    this.config = null;
  }

  getDTO() {
    return this.dto;
  }

  getOTS() {
    return this.ots;
  }

  setAxiosConfig() {
    this.config = {
      headers: {
        authorization: this.storage.getToken()
      }
    };
  }

  async get() {
    try {
      // fetch data method get
      const res = await this.axios.get(
        `${this.RootURL}/${this.domain}`
      );
      return res.data.result;
    } catch (error) {
      if(error && error.response && error.response.data && error.response.data.result && error.response.data.result.name === 'TokenExpiredError') {
        this.storage.removeStorage();
        window.location.reload();
        return;
      }
      throw error;
    }
  }
  async getById(id) {
    try {
      // fetch data method get by Id
      const res = await this.axios.get(
        `${this.RootURL}/${this.domain}/${id}`
      );
      return res.data.result;
    } catch (error) {
      if(error && error.response && error.response.data && error.response.data.result && error.response.data.result.name === 'TokenExpiredError') {
        this.storage.removeStorage();
        window.location.reload();
        return;
      }
      throw error;
    }
  }

  async create(data) {
    this.setAxiosConfig();
    try {
      const resToken = await this.axios.get(`${this.RootURL}/${this.TokenURL}?token=${this.storage.getToken()}`);
      this.storage.saveToken(resToken.data.result.token);
      this.setAxiosConfig();
      const res = await this.axios.post(
        `${this.RootURL}/${this.domain}`,
        data,
        this.config
      );
      return res.data.result;
    } catch (error) {
      if(error && error.response && error.response.data && error.response.data.result && error.response.data.result.name === 'TokenExpiredError') {
        this.storage.removeStorage();
        window.location.reload();
        return;
      }
      throw error;
    }
  }
  async update(id, data) {
    try {
      const resToken = await this.axios.get(`${this.RootURL}/${this.TokenURL}?token=${this.storage.getToken()}`);
      this.storage.saveToken(resToken.data.result.token);
      this.setAxiosConfig();
      const res = await this.axios.patch(
        `${this.RootURL}/${this.domain}/${id}`,
        data,
        this.config
      );
      return res.data.result;
    } catch (error) {
      if(error && error.response && error.response.data && error.response.data.result && error.response.data.result.name === 'TokenExpiredError') {
        this.storage.removeStorage();
        window.location.reload();
        return;
      }
      throw error;
    }
  }
  async remove(id) {
    try {
      const resToken = await this.axios.get(`${this.RootURL}/${this.TokenURL}?token=${this.storage.getToken()}`);
      this.storage.saveToken(resToken.data.result.token);
      this.setAxiosConfig();
      const res = await this.axios.delete(
        `${this.RootURL}/${this.domain}/soft/${id}`,
        this.config
      );
      return res.data.result;
    } catch (error) {
      if(error && error.response && error.response.data && error.response.data.result && error.response.data.result.name === 'TokenExpiredError') {
        this.storage.removeStorage();
        window.location.reload();
        return;
      }
      throw error;
    }
  }
}
