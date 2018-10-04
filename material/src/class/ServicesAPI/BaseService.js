import axios from "axios";
import moment from "moment";

const RootURL = "http://localhost:3001";

export default class BaseService {
  constructor(domain) {
    this.axios = axios;
    this.RootURL = RootURL;
    this.domain = domain;
    this.moment = moment;
  }

  getDTO() {
    return this.dto;
  }

  getOTS() {
    return this.ots;
  }

  async get() {
    try {
      const res = await this.axios.get(`${this.RootURL}/${this.domain}`);
      return res.data.result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getById(id) {
    try {
      const res = await this.axios.get(`${this.RootURL}/${this.domain}/${id}`);
      return res.data.result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(data) {
    try {
      const res = await this.axios.post(`${this.RootURL}/${this.domain}`, data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      const res = await this.axios.patch(
        `${this.RootURL}/${this.domain}/${id}`,
        data
      );
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async remove(id) {
    try {
      const res = await this.axios.delete(
        `${this.RootURL}/${this.domain}/soft/${id}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
