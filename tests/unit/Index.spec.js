import VueSimpleAuth from '../../src'
import Vue from 'vue'
import { TOKEN_NAMESPACE, TOKEN_EXPIRES_NAMESPACE } from '../../src'

Vue.config.productionTip = false;
Vue.use(VueSimpleAuth);

describe('vue-simple-auth', () => {

  beforeEach(() => {
    localStorage.clear()
  })

  it('LocalStorage is available', () => {
    expect(localStorage != undefined).toBeTruthy()
  })

  it('Vue-simple-auth is installed', () => {
    expect(Vue.auth != undefined).toBeTruthy()
  })

  it('Stores auth data to localstorage', () => {
    Vue.auth.setToken('asdasd')

    expect(localStorage.getItem('vue-auth-token')).toEqual('asdasd')
  })

  it('Retrieves token', () => {
    Vue.auth.setToken('asd123')

    expect(Vue.auth.getToken()).toEqual('asd123')
  })

  it('Returns null if no token saved', () => {
    expect(Vue.auth.getToken()).toBeNull()
  })

  it("Return null if token has expired", () => {
    Vue.auth.setToken('asd111', '2018-04-01')

    expect(Vue.auth.getToken()).toBeNull()
  })

  it("Destroy tokens", () => {
    Vue.auth.setToken('dsa', '3000-12-12')
    Vue.auth.destroyToken()
    expect(Vue.auth.getToken()).toBeNull()
    expect(localStorage.getItem(TOKEN_NAMESPACE)).toBeNull()
    expect(localStorage.getItem(TOKEN_EXPIRES_NAMESPACE)).toBeNull()
  })

  it("Is authenticated if token exists", () => {
    Vue.auth.setToken('auth', '3000-12-12')
    expect(Vue.auth.isAuthenticated()).toEqual(true)
  })

  it("Returns false when no token ", () => {
    expect(Vue.auth.isAuthenticated()).toEqual(false)
  })

  it("Deletes token if no expiry date", () => {
    Vue.auth.setToken('auth')
    localStorage.removeItem(TOKEN_EXPIRES_NAMESPACE)

    expect(Vue.auth.getToken()).toBeNull()
    expect(localStorage.getItem(TOKEN_NAMESPACE)).toBeNull()
  })

  it("Expiry date is set if non provided", () => {
    Vue.auth.setToken('auth')
    expect(Vue.auth.isAuthenticated()).toBe(true)
  })

})
