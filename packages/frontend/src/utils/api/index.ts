import axios from "axios";

const { VITE_SERVER_HOST, VITE_SERVER_PORT } = import.meta.env;
const instance = axios.create({
  baseURL: `http://${VITE_SERVER_HOST}:${VITE_SERVER_PORT}/api/v1/`,
});

class PassageApi {
  #endpoint = "passages";

  async getAll() {
    return await instance.get(this.#endpoint);
  }

  async getById(id:number) {
    return await instance.get(`${this.#endpoint}/${id}`)
  }
}

const passageApi = new PassageApi();
export { passageApi };
