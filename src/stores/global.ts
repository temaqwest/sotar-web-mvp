import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    globalUrl: '',
  }),
  actions: {
    setGlobalUrl(url: string): void {
      this.globalUrl = url
    },
  },
})
