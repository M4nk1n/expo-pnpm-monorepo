import { makeAutoObservable } from 'mobx'

const appStore = makeAutoObservable({
  counter: 0,

  increment() {
    appStore.counter++
  },

  decrement() {
    appStore.counter--
  },

  incrementAsync() {
    setTimeout(() => {
      appStore.counter++
    }, 1000)
  },
})

export default appStore
