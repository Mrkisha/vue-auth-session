var TOKEN_NAMESPACE = 'vue-auth-token';
var TOKEN_EXPIRES_NAMESPACE = 'vue-auth-token-expires';

function plugin(Vue) {
  Vue.auth = {
    setToken: function setToken(token, expires_at) {
      localStorage.setItem(TOKEN_NAMESPACE, token);
      if(undefined !== expires_at) {
        localStorage.setItem(TOKEN_EXPIRES_NAMESPACE, new Date(expires_at).getTime());
      }
    },

    getToken: function getToken() {
      var token = localStorage.getItem(TOKEN_NAMESPACE);
      var expires_at = localStorage.getItem(TOKEN_EXPIRES_NAMESPACE);

      if (!expires_at || Date.now() > parseInt(expires_at)) {
        this.destroyToken();
        return null
      }

      return token
    },

    destroyToken: function destroyToken() {
      localStorage.removeItem(TOKEN_NAMESPACE);
      localStorage.removeItem(TOKEN_EXPIRES_NAMESPACE);
    },

    isAuthenticated: function isAuthenticated() {
      if(this.getToken()) {
        return true
      }

      return false
    },
  };

  Object.defineProperties(Vue.prototype, {
    $auth: {
      get: function get() {
        return Vue.auth
      }
    }
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
export { TOKEN_NAMESPACE, TOKEN_EXPIRES_NAMESPACE };