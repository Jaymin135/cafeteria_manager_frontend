import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | cart', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:cart');
    assert.ok(controller);

    //controller.send('changeQuantity', 1);

    //assert.equal(controller.updated, true, 'quantity updated');
  });
});
