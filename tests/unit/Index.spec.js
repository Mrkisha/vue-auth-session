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

  it('Return null if token has expired', () => {
    Vue.auth.setToken('asd111', '2018-04-01')

    expect(Vue.auth.getToken()).toBeNull()
  })

  it('Destroy tokens', () => {
    Vue.auth.setToken('dsa', '3000-12-12')
    Vue.auth.destroyToken()
    expect(Vue.auth.getToken()).toBeNull()
    expect(localStorage.getItem(TOKEN_NAMESPACE)).toBeNull()
    expect(localStorage.getItem(TOKEN_EXPIRES_NAMESPACE)).toBeNull()
  })

  it('Is authenticated if token exists', () => {
    Vue.auth.setToken('auth', '3000-12-12')
    // console.log(localStorage.getItem(TOKEN_EXPIRES_NAMESPACE))
    // console.log(localStorage.getItem(TOKEN_NAMESPACE))
    // console.log(Vue.auth.getToken())

    expect(Vue.auth.isAuthenticated()).toEqual(true)
  })

  it('Returns false when no token ', () => {
    expect(Vue.auth.isAuthenticated()).toEqual(false)
  })

  it('Deletes token if no expiry date', () => {
    Vue.auth.setToken('auth')
    localStorage.removeItem(TOKEN_EXPIRES_NAMESPACE)

    expect(Vue.auth.getToken()).toBeNull()
    expect(localStorage.getItem(TOKEN_NAMESPACE)).toBeNull()
  })

  it('Expiry date is set if non provided', () => {
    Vue.auth.setToken('auth')
    expect(Vue.auth.isAuthenticated()).toBe(true)
  })

  it('Logout removes token', () => {
    Vue.auth.setToken('asdff')

    Vue.auth.logout()
    expect(Vue.auth.isAuthenticated()).toBe(false)
  })

  it('Set token expiration time when timestamp is passed', () => {
    Vue.auth.setToken('dddd', 1506427667000) // Tuesday, September 26, 2017 12:07:47 PM

    expect(Number.parseInt(localStorage.getItem(TOKEN_EXPIRES_NAMESPACE))).toEqual(1506427667000)
  })

  it('Set token expiration by passing Date object', () => {
    Vue.auth.setToken('dddd', new Date(1506427667000)) // Tuesday, September 26, 2017 12:07:47 PM

    expect(Number.parseInt(localStorage.getItem(TOKEN_EXPIRES_NAMESPACE))).toEqual(1506427667000)
  })

  it('It fails setting expiration as string', () => {
    Vue.auth.setToken('dddd', '2017-09-26 12:07:47 GMT')

    expect(Number.parseInt(localStorage.getItem(TOKEN_EXPIRES_NAMESPACE))).toEqual(1506427667000)
  })

  it('Throws error if timestamp is not in miliseconds format', () => {
    expect(() => { Vue.auth.setToken('dddd', 1506427667) }).toThrow();
    expect(() => { Vue.auth.setToken('dddd', 1506427667) }).toThrowError('Timestamp should be in miliseconds format (most likely you need to mutiple your timestamp by 1000)');
  })

})
