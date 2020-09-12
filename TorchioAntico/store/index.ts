import { GetterTree, ActionTree, MutationTree } from 'vuex'
export const state = () => ({
  auth: null as string | null
})

export type RootState = ReturnType<typeof state>
export const getters: GetterTree<RootState, RootState> = {
  auth: state => state.auth
}
export const mutations: MutationTree<RootState> = {
  setAuth: (state, newToken: string) => (state.auth = newToken)
}
export const actions: ActionTree<RootState, RootState> = {
  updateAuth ({ commit }, newToken) {
    // Some async code
    commit('setAuth', newToken)
  }
}
