export const state = () => ({
  rooms: []
})

export const mutations = {
  setRooms (state, rooms) {
    state.rooms = rooms
  }
}
