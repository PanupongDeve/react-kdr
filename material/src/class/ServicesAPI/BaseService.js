import axios from "axios";
import moment from "moment";

const RootURL = "http://localhost";

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
      return res.data;
    } catch (error) {
      console.log(error);
      return { error: true };
    }
  }
  async getById(id) {
    try {
      const res = await this.axios.get(`${this.RootURL}/${this.domain}/${id}`);
      return res.data[0];
    } catch (error) {
      console.log(error);
      return { error: true };
    }
  }

  async create(data) {
    try {
      const res = await this.axios.post(`${this.RootURL}/${this.domain}`, data);
      return res.data;
    } catch (error) {
      console.log(error);
      return { error: true };
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
      return { error: true };
    }
  }
  async remove(id) {
    try {
      const res = await this.axios.delete(
        `${this.RootURL}/${this.domain}/${id}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return { error: true };
    }
  }
}
