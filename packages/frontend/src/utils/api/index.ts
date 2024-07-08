import axios from "axios";

import { User } from "../../types/types";

const instance = axios.create({
  baseURL: "/api/v1/",
});

class PassageApi {
  #endpoint = "passages";

  async getAll() {
    return await instance.get(this.#endpoint);
  }

  async getById(id: number) {
    try {
      return await instance.get(`${this.#endpoint}/${id}`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response;
      }
    }
  }

  async getRandom() {
    try {
      return await instance.get(`${this.#endpoint}/random`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response;
      }
    }
  }

  async post(textInput: string) {
    const data = {
      text: textInput,
    };

    return await instance.post(`${this.#endpoint}`, data);
  }
}

class UserApi {
  private endpoint = "users";

  async register(formData: User.RegistrationFormData) {
    try {
      return await instance.post(`${this.endpoint}`, formData);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response;
      }
    }
  }
}

const passageApi = new PassageApi();
const userApi = new UserApi();
export { passageApi, userApi };
