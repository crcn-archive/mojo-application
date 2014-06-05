var bindable      = require("bindable"),
nofactor          = require("nofactor");

function Application (options) {
  if (!options) options = {};
  Application.parent.call(this, this);
  this.nodeFactory = options.nodeFactory || nofactor["default"];
  this.models      = new bindable.Object();
  this.registerPlugins();

  var self = this;

  this.once("initialize", function () {
    self.onInitialize.apply(this, arguments);
  })
}

module.exports = bindable.Object.extend(Application, {

  /**
   */

  registerPlugins: function () {
    // OVERRIDE ME
  },

  /**
   */

  onInitialize: function () {

  },

  /**
   * Plugins to use for the mojo application.
   *
   * @method use
   * @param {Function} plugins... must be defined as `function (app) { }`
   */

  use: function (test) {

    // simple impl - go through each arg and pass self ref
    for(var i = 0, n = arguments.length; i < n; i++) {
      arguments[i](this);
    }

    return this;
  },

  /**
   */

  initialize: function () {
    this.emit.apply(this, ["initialize"].concat(Array.prototype.slice.call(arguments, 0)));
  }
});


module.exports.main = new Application();