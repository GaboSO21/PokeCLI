const axios = require('axios');

class Berry {

  pokeURL = '';

  constructor(berry = '') {
    this.pokeURl = `https://pokeapi.co/api/v2/berry/${berry.replace(' ', '-').toLowerCase()}`;
  }

  async searchBerry() {

    const instance = axios.create({
      baseURL: this.pokeURl,
    })

    try {

      const resp = await instance.get();
      const { url } = resp.data.item;

      const itemInstance = axios.create({
        baseURL: url,
      })

      const itemResp = await itemInstance.get();

      return {

        berry: resp.data,
        berryImg: itemResp.data.sprites.default,

      };

    } catch (error) {

      console.log('Berry not found.')

    }

  }

}

module.exports = {
  Berry
}
