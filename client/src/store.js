import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const URL_API = 'http://localhost:9000'

export default new Vuex.Store({
    state: {
        knights: []
    },
    mutations: {
        setKnights(state, knights) {
            state.knights = knights
        },

        addKnight(state, knight) {
            state.knights.push(knight)
        },

        deleteKnight(state, knightId) {
            state.knights = state.knights.filter(knight => knight._id !== knightId)
        },

        setCurrentKnight(state, knight) {
            state.currentKnight = knight
        }
    },
    actions: {
        async fetchKnights({ commit }, filter) {
            let url = `${URL_API}/knights`

            if (filter && filter.heroes) {
                url += `?heroes=${filter.heroes}`
            }

            try {
                const response = await fetch(url)
                const data = await response.json()

                commit('setKnights', data);
            } catch (error) {
                console.error('Erro ao buscar knights:', error)
            }
        },
        async fetchKnightById({ commit }, knightId) {
            try {
                const response = await fetch(`${URL_API}/knights/${knightId}`)
                const data = await response.json()

                if (data) {
                    commit('setCurrentKnight', data)
                } else {
                    console.error(`Knight com o ID ${knightId} não encontrado.`)
                }
            } catch (error) {
                console.error(`Erro ao buscar o knight com o ID ${knightId}:`, error)
            }
        },
        async createKnight({ commit }, newKnightData) {
            let url = `${URL_API}/knights`

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newKnightData)
                })

                commit('addKnight', newKnightData)

                if (!response.ok) {
                    throw new Error('Erro ao criar cavaleiro')
                }
            } catch (error) {
                console.error('Erro ao criar cavaleiro:', error.message)
            }
        },
        async updateKnight({ commit, state }, { knightId, knightData }) {
            try {
                const response = await fetch(`${URL_API}/knights/${knightId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(knightData)
                })

                if (response.ok) {
                    const updatedKnights = state.knights.map(knight => {
                        if (knight._id === knightId) {
                            return { ...knight, ...knightData }
                        }

                        return knight
                    })

                    commit('setKnights', updatedKnights)
                } else {
                    throw new Error('Erro ao atualizar cavaleiro')
                }
            } catch (error) {
                console.error('Erro ao atualizar cavaleiro:', error.message)
            }
        },
        async deleteKnight({ commit }, knightId) {
            try {
              const response = await fetch(`${URL_API}/knights/${knightId}`, {
                method: 'DELETE'
              })

              if (response.ok) {
                commit('deleteKnight', knightId)
              } else {
                throw new Error('Erro ao excluir cavaleiro')
              }
            } catch (error) {
              console.error('Erro ao excluir cavaleiro:', error.message)
            }
        }
    },
    modules: {}
})
