import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import Parser from "./helper/Parser.js";

/**
 * Client class to manage HTTP requests
 */
class Client {
    constructor() {
        this.jar = new CookieJar();
        this.client = wrapper(axios.create({ jar: this.jar }));
        this.options = {
          method: 'POST',
          url: 'https://projects.co.id/public/home/login',
          headers: {
            'cache-control': 'max-age=0',
            'content-type': 'application/x-www-form-urlencoded',
            origin: 'https://projects.co.id',
            referer: 'https://projects.co.id/public/home/login',
          },
          data: {},
        };
        this.parse = new Parser;
        this.basehtml;
      }

  /**
   * Login method to authenticate the user
   * @param {string} username - The user's username
   * @param {string} password - The user's password
   * @returns {Promise<object>} - The parsed user information
   */
  async login(username, password) {
    const options = {
      method: "POST",
      url: "https://projects.co.id/public/home/login",
      headers: {
        "cache-control": "max-age=0",
        "content-type": "application/x-www-form-urlencoded",
        origin: "https://projects.co.id",
        referer: "https://projects.co.id/public/home/login",
      },
      data: {
        "LoginActivity[_trigger_]": "1",
        "LoginActivity[user_name]": username,
        "LoginActivity[password]": password,
        "LoginActivity[remember]": "on",
      },
    };

    const {data} = await this.client.request(options);
    this.basehtml = data;
    const parseUser = this.parse.getUser(data);
    return parseUser;
  }

  /**
   * Get the user's bids
   * @returns {Promise<any>} - The parsed bids information
   */
  async getMyBids() {
    const options = {
      method: "GET",
      url: "https://projects.co.id/user/my_bids/listing",
      headers: {
        "cache-control": "max-age=0",
        "content-type": "application/x-www-form-urlencoded",
        origin: "https://projects.co.id",
        referer: "https://projects.co.id/public/home/login",
      },
    };

    const {data} = await this.client.request(options);
    return this.parse.parseMyBids(data)
  }

  /**
   * Get the new projects
   * @returns {any} - The parsed new projects information
   */
  getNewProject(){
    return this.parse.getNewProject(this.basehtml);
  }

  async seacrhProject(query){
    const options = {
      method: "GET",
      url: `https://projects.co.id/public/browse_projects/listing?search=${query}&page=1&ajax=1`,
      headers: {
        "cache-control": "max-age=0",
        "content-type": "application/x-www-form-urlencoded",
        origin: "https://projects.co.id",
        referer: "https://projects.co.id/public/home/login",
      },
    };

    const {data} = await this.client.request(options);
    return this.parse.searchProject(data)
  }
}

export default Client;

