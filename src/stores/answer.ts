import {
  ToastProgrammatic as Toast,
  DialogProgrammatic as Dialog
} from 'buefy/src'

import { defineStore } from 'pinia'
import { useEndpointStore } from './endpoint.ts'
import { useUserStore } from './user.ts'

interface State {
  kb: any
  working: {
    answers: boolean | undefined
  }
  loading: {
    answers: boolean | undefined
  }
  error: {
    answers: null | string
  }
}

export const useAnswerStore = defineStore('answer', {
  state: (): State => ({
    kb: {},
    working: {
      answers: undefined,
    },
    loading: {
      answers: undefined,
    },
    error: {
      answers: null,
    },
  }),

  actions: {
    async getKnowledgeBase () {
      this.loading.answers = true
      try {
        const response = await fetch(useEndpointStore().answers, {
          headers: {
            Authorization: 'Bearer ' + useUserStore().jwt
          }
        })
        if (response.ok) {
          this.kb = await response.json()
        } else if (response.status === 404) {
          // not found - no error message
        } else {
          // other error
          new Toast().open({
            message: 'Get Agent Answers knowledge base failed: ' + response.status + ' - ' + await response.text()
          })
        }
      } catch (e) {
        if (e instanceof Error) {
          this.error.answers = e.message
        } else {
          this.error.answers = 'Unknown error'
        }
      } finally {
        this.loading.answers = false
      }
    },
    async uploadFile (file: any) {
      this.working.answers = true
      try {

        const response = await fetch(useEndpointStore().answers, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + useUserStore().jwt
          },
          body: JSON.stringify({
            name: file.name,
            data: file.data
          })
        })
        if (response.ok) {
          // success
          // refresh kb display data
          this.getKnowledgeBase()
          // was it created or updated?
          if (response.status === 201) {
            // created - let user know it could be a while
            let message = 'Your Agent Answers knowledge base file has been '
            message += 'uploaded. Please allow 24-48 hours for your file to be '
            message += 'added to the demo platform.'
            new Dialog().alert({
              title: 'Upload Complete',
              message,
              type: 'is-success',
              confirmText: 'OK'
            })
          } else {
            // updated
            new Toast().open({
              type: 'is-success',
              message: 'Your Agent Answers knowledge base has been updated successfully.',
              duration: 5 * 1000
            })
          }
        } else {
          // error
          new Toast().open({
            type: 'is-danger',
            message: 'Failed to upload your Agent Answers:' + await response.text(),
            duration: 10 * 1000
          })
        }
      } catch (e) {
        if (e instanceof Error) {
          this.error.answers = e.message
        } else {
          this.error.answers = 'Unknown error'
        }
      } finally {
        this.working.answers = false
      }
    }
  },
})
