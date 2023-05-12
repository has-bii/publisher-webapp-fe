export const state = () => ({
  id: 0,
  name: '',
})

export const mutations = {
  pushItem(state, newItem) {
    state.id = newItem.id
    state.name = newItem.name
  },
}
