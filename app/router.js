import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('signup', { path: '/'});
  this.route('signin');
  this.route('menu');
  this.route('cart');
  this.route('orders');
  this.route('signout');
});
