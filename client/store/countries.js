export const state = () => ({
  data: []
})

export const mutations = {
  setCountries (state, countries) {
    state.data = countries
  }
}
