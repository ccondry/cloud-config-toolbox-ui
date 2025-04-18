import { defineStore } from 'pinia'
// import { useEndpointStore } from './endpoint.ts'
import {version as uiVersion} from '../../package.json'
import { isProduction } from '@/config'

// const endpointStore = useEndpointStore()

interface State {
  isProduction: boolean
  loading: {
    apiVersion: boolean | undefined
  }
  error: {
    apiVersion: null | string
  }
  uiVersion: string
  apiVersion: string
}

export const useAppStore = defineStore('app', {
  state: (): State => ({
    isProduction,
    // working: {
    // },
    loading: {
      apiVersion: undefined,
    },
    error: {
      apiVersion: null,
    },
    uiVersion,
    apiVersion: 'Loading...'
  }),
  actions: {
    async getApiVersion () {
      // get Auth REST API version
      this.loading.apiVersion = true
      try {
        // const response = await fetch(endpointStore.apiVersion, {
        const response = await fetch('https://dcloud-collab-toolbox-rtp.cxdemo.net/api/v1/auth/version', {
          headers: {
            Accept: 'application/json'
          }
        })
        if (response.ok) {
          const json = await response.json()
          this.apiVersion = json.version
        } else {
          this.error.apiVersion = response.status + ' - ' + await response.text()
        }
      } catch (e) {
        if (e instanceof Error) {
          this.error.apiVersion = e.message
        } else {
          this.error.apiVersion = 'Unknown error'
        }
      } finally {
        this.loading.apiVersion = false
      }
    },
    async copyToClipboard ({string, type = 'Text'}: {string: string, type: string}) {
      // copy text to clipboard
      try {
        await navigator.clipboard.writeText(string)
        // Toast.open({
        //   message: type + ' Copied to Your Clipboard',
        //   queue: false
        // })
      } catch (e) {
        const message = `failed to copy ${type} to clipboard`
        if (e instanceof Error) {
          console.log(message, e.message)
        } else {
          console.log(message)
        }
      }
    }
  },
})
