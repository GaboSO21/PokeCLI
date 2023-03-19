const axios = require('axios');

class Berry {

  pokeURL = '';
  berryName = '';
  effect = '';

  constructor(berry = '') {

    this.pokeURl = `https://pokeapi.co/api/v2/berry/${berry.replace(' ', '-').toLowerCase()}`;
    this.berryName = berry.replace(berry.charAt(0), berry.charAt(0).toUpperCase()) + ' Berry';

  }

  set berryEffect(value) {
    this.effect = value.effect_entries[0].effect;
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

      this.berryEffect = itemResp.data;

      return {

        berry: resp.data,
        berryImg: itemResp.data.sprites.default,
        itemData: itemResp.data,

      };

    } catch (error) {

      console.log('Berry not found.')

    }

  }

}

module.exports = {
  Berry
}
