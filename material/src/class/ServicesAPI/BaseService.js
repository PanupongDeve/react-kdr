import axios from "axios";
import moment from "moment";
import Storage from "../Storage";

const RootURL = "http://localhost:3001";

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

  setConfig() {
    this.config = {
      headers: {
        authorization: this.storage.getToken()
      }
    };
  }

  async get() {
    try {
      const resToken = await this.axios.get(`${this.RootURL}/${this.TokenURL}?token=${this.storage.getToken()}`);
      this.storage.saveToken(resToken.data.result.token);
      this.setConfig();
      const res = await this.axios.get(
        `${this.RootURL}/${this.domain}`,
        this.config
      );
      return res.data.result;
    } catch (error) {
      throw error;
    }
  }
  async getById(id) {
    try {
      const resToken = await this.axios.get(`${this.RootURL}/${this.TokenURL}?token=${this.storage.getToken()}`);
      this.storage.saveToken(resToken.data.result.token);
      this.setConfig();
      const res = await this.axios.get(
        `${this.RootURL}/${this.domain}/${id}`,
        this.config
      );
      return res.data.result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(data) {
    this.setConfig();
    try {
      const resToken = await this.axios.get(`${this.RootURL}/${this.TokenURL}?token=${this.storage.getToken()}`);
      this.storage.saveToken(resToken.data.result.token);
      this.setConfig();
      const res = await this.axios.post(
        `${this.RootURL}/${this.domain}`,
        data,
        this.config
      );
      return res.data.result;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      const resToken = await this.axios.get(`${this.RootURL}/${this.TokenURL}?token=${this.storage.getToken()}`);
      this.storage.saveToken(resToken.data.result.token);
      this.setConfig();
      const res = await this.axios.patch(
        `${this.RootURL}/${this.domain}/${id}`,
        data,
        this.config
      );
      return res.data.result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async remove(id) {
    try {
      const resToken = await this.axios.get(`${this.RootURL}/${this.TokenURL}?token=${this.storage.getToken()}`);
      this.storage.saveToken(resToken.data.result.token);
      this.setConfig();
      const res = await this.axios.delete(
        `${this.RootURL}/${this.domain}/soft/${id}`,
        this.config
      );
      return res.data.result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
