import axios from "axios";
import colors from 'colors';

export class Berry {

  pokeURL = '';

  constructor(berry = '') {
    this.pokeURl = `https://pokeapi.co/api/v2/berry/${berry.replace(' ', '-').toLowerCase()}`;
  }

  async searchBerry() {

    const instance = axios.create({
      baseURL: this.pokeURl,
    })

    try {

      const resp = await instance.get()

      return resp.data;

    } catch (error) {

      console.log('Berry not found.')

    }

  }

}

