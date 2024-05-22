import axios from "axios";

const instance = axios.create({
  baseURL: "/api/v1/",
});

class PassageApi {
  #endpoint = "passages";

  async getAll() {
    return await instance.get(this.#endpoint);
  }

  async getById(id:number) {
    return await instance.get(`${this.#endpoint}/${id}`)
  }

  async getRandom() {
    return await instance.get(`${this.#endpoint}/random`)
  }
}

const passageApi = new PassageApi();
export { passageApi };
