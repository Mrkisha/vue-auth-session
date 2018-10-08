'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var TOKEN_NAMESPACE = 'vue-auth-token';
var TOKEN_EXPIRES_NAMESPACE = 'vue-auth-token-expires';

function plugin(Vue) {
  Vue.auth = {
    setToken: function setToken(token, expires_at) {
      localStorage.setItem(TOKEN_NAMESPACE, token);

      if(undefined === expires_at) {
        var date = new Date();
        date.setDate(date.getDate() + 5000 );
        localStorage.setItem(TOKEN_EXPIRES_NAMESPACE, date.getTime());
      } else {
        var date$1;
        if (Number.isInteger(expires_at)) {
          date$1 = expires_at;
          if((new Date(date$1)).getYear() == 70) {
            throw new TypeError('Timestamp should be in miliseconds format (most likely you need to mutiple your timestamp by 1000)')
          }
        } else if (expires_at instanceof Date) {
          date$1 = expires_at.getTime();
        } else {
          date$1 = Date.parse(expires_at);
        }
        localStorage.setItem(TOKEN_EXPIRES_NAMESPACE, date$1);
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

    logout: function logout() {
      this.destroyToken();
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

exports.TOKEN_NAMESPACE = TOKEN_NAMESPACE;
exports.TOKEN_EXPIRES_NAMESPACE = TOKEN_EXPIRES_NAMESPACE;
exports.default = plugin;
