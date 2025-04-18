import { DialogProgrammatic as Dialog } from 'buefy'
import { defineStore } from 'pinia'
import { useEndpointStore } from './endpoint.ts'
import { isProduction } from '@/config.ts'
import { parseJwt } from '@/utils.ts'

type User = {
  id: string
  suJwt?: string
  email: string
  admin: boolean
  firstName: string
}

interface State {
  jwt: string | null
  user: User | null
  working: {
    login: boolean | undefined
    logout: boolean | undefined
  }
  loading: {
    details: boolean | undefined
  }
  error: {
    details: null | string
    logout: null | string
    login: null | string
  }
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    jwt: null,
    user: null,
    working: {
      login: undefined,
      logout: undefined,
    },
    loading: {
      details: undefined,
    },
    error: {
      details: null,
      logout: null,
      login: null,
    },
  }),

  getters: {
    isAdminSu () {
      try {
        return this.jwtUser?.suJwt
      } catch (e) {
        return false
      }
    },
    isAdmin () {
      try {
        return this.jwtUser?.admin
      } catch (e) {
        return false
      }
    },
    isLoggedIn () {
      try {
        return this.jwtUser?.email.length > 0
      } catch (e) {
        return false
      }
    },
    jwtUser (): User | null {
      try {
        if (this.jwt) {
          return parseJwt(this.jwt) as User
        } else {
          return null
        }
      } catch (e) {
        return null
      }
    },
  },

  actions: {
    async logout() {
      this.working.logout = true
      try {
        const response = await fetch(useEndpointStore().logout, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + this.jwt,
          },
        })
        if (response.ok) {
          // did we get a new JWT (from logging out of switch-user)?
          const json = await response.json()
          if (json.jwt) {
            // save new JWT
            this.setJwt(json.jwt)
          } else {
            // remove JWT
            this.unsetJwt()
          }
        } else {
          this.error.logout = response.status + ' - ' + (await response.text())
        }
      } catch (e) {
        if (e instanceof Error) {
          this.error.logout = e.message
        } else {
          this.error.logout = 'Unknown error'
        }
      } finally {
        this.working.logout = false
      }
    },
    async getUser() {
      this.loading.details = true
      try {
        const response = await fetch(useEndpointStore().user, {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + this.jwt,
          },
        })
        if (response.ok) {
          this.user = await response.json()
        } else {
          this.error.details = response.status + ' - ' + (await response.text())
        }
      } catch (e) {
        if (e instanceof Error) {
          this.error.details = e.message
        } else {
          this.error.details = 'Unknown error'
        }
      } finally {
        this.loading.details = false
      }
    },
    setJwt(jwt: string) {
      try {
        // test parse JWT to user JSON
        parseJwt(jwt)
        // put JWT in state
        this.jwt = jwt
        // put JWT in localStorage
        window.localStorage.setItem('jwt', jwt)
        // get provision info for this user
        this.getUser()
      } catch (e) {
        // parseJwt failed - delete this invalid JWT
        this.unsetJwt()
      }
    },
    unsetJwt() {
      // remove JWT from state
      this.jwt = null
      // remove JWT from localStorage
      window.localStorage.removeItem('jwt')
    },
    login() {
      if (isProduction) {
        // production - forward to auth page for SSO
        window.location.href = '/auth'
      } else {
        // development - prompt for JWT
        new Dialog().prompt({
          title: 'Log In',
          message: 'Enter your JWT:',
          onConfirm: (jwt) => {
            this.setJwt(jwt)
          },
          canCancel: false,
          confirmText: 'Log In',
          type: 'is-success',
        })
      }
    },

    async checkJwt() {
      console.log('checkjwt')
      this.working.login = true
      // check jwt in browser local storage
      const jwt = window.localStorage.getItem('jwt')
      // if we found a token, check the web service to see if it's still valid
      if (jwt !== null && jwt.length > 40) {
        console.log('found existing JWT in localStorage')
        // store JWT in state
        this.setJwt(jwt)
      } else {
        // no JWT found - make the user log in
        this.login()
      }
    },
  },
})
