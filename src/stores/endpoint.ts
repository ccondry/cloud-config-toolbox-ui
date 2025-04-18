import { isProduction } from '@/config'
import { defineStore } from 'pinia'
// import { useAppStore } from './app.js'

export const useEndpointStore = defineStore('endpoint', {
  getters: {
    urlBase () {
      if (isProduction) {
        // production
        return '/api/v1/auth'
      } else {
        // development
        // return 'http://localhost:3032/api/v1/auth'

        // use production APIs
        return 'https://dcloud-collab-toolbox-rtp.cxdemo.net/api/v1/auth'
      }
    },
    apiVersion () {
      return this.urlBase + '/version'
    },
    logout () {
      return this.urlBase + '/logout'
    },
    user () {
      return this.urlBase + '/user'
    },
    answers () {
      return this.urlBase + '/answers/kb'
    },
  }
})
