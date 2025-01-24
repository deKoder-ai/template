'use strict';

/**
 * Global Site Settings
 *
 * ss.get('key') to retrieve a value
 *
 * ss.set('key', 'value') to set a value
 */
let ss = (function () {
  let instance;

  function init() {
    let self = this;
    return {
      settings: { x: 123 },
    };
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = init();
      }
      return instance;
    },
    set: function (key, value) {
      this.getInstance().settings[key] = value;
    },
    get: function (key) {
      return this.getInstance().settings[key];
    },
  };
})();

export { ss };

// attach callback function to each key ->

// let siteSettings = (function() {
//   let instance;

//   function init() {
//     let self = this;
//     return {
//       settings: {},
//       onSettingChange: function(callback) {
//         Object.keys(this.settings).forEach(function(key) {
//           if (this.settings[key] !== undefined) {
//             this.settings[key].onChanged = callback;
//           }
//         }.bind(this));
//       }
//     };
//   }

//   return {
//     getInstance: function() {
//       if (!instance) {
//         instance = init();
//       }
//       return instance;
//     },
//     setSetting: function(key, value) {
//       this.getInstance().settings[key] = value;
//       if (this.getInstance().settings[key].onChanged) {
//         this.getInstance().settings[key].onChanged(key, value);
//       }
//     },
//     getSetting: function(key) {
//       return this.getInstance().settings[key];
//     }
//   };
// })();

// // Now, when you call setSetting, you can pass a callback function to be triggered when the key is changed
// siteSettings.getInstance().onSettingChange(function(key, value) {
//   console.log(`Setting ${key} changed to ${value}`);
// });

// siteSettings.setSetting('x', 123);
// In this example, the onSettingChange method is used to attach a callback function to each setting. When the setSetting method is called, it checks if a callback function is attached to the setting and triggers it if it is.

// You can also use a more robust event system, such as the one provided by a library like jQuery or a custom implementation.
