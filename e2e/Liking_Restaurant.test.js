const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorites');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.see('You have no favorite restaurants yet.', '.error-message');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('You have no favorite restaurants yet.', '.error-message');

  I.amOnPage('/');

  I.waitForElement('.restaurant-item__name a', 5);
  I.seeElement('.restaurant-item__name a');
  const firstRestaurant = locate('.restaurant-item__name a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorites');
  I.waitForElement('.restaurant-item__name a', 5);
  I.seeElement('.restaurant-item__name a');
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant-item__name a');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('removing one favorite restaurant', async ({ I }) => {
  I.see('You have no favorite restaurants yet.', '.error-message');

  I.amOnPage('/');

  I.waitForElement('.restaurant-item__name a', 5);
  I.seeElement('.restaurant-item__name a');
  const firstRestaurant = locate('.restaurant-item__name a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorites');
  I.waitForElement('.restaurant-item__name a', 5);
  I.seeElement('.restaurant-item__name a');
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant-item__name a');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  I.click(likedRestaurantTitle);
  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorites');
  I.see('You have no favorite restaurants yet.', '.error-message');
});

Scenario('unliking a restaurant from the details page', async ({ I }) => {
  I.see('You have no favorite restaurants yet.', '.error-message');

  I.amOnPage('/');

  I.waitForElement('.restaurant-item__name a', 5);
  I.seeElement('.restaurant-item__name a');
  const firstRestaurant = locate('.restaurant-item__name a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorites');
  I.waitForElement('.restaurant-item__name a', 5);
  I.seeElement('.restaurant-item__name a');
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant-item__name a');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  I.click(likedRestaurantTitle);
  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorites');
  I.see('You have no favorite restaurants yet.', '.error-message');
});

Scenario('verifying persistent liked state across page reloads', async ({ I }) => {
  I.see('You have no favorite restaurants yet.', '.error-message');

  I.amOnPage('/');

  I.waitForElement('.restaurant-item__name a', 5);
  I.seeElement('.restaurant-item__name a');
  const firstRestaurant = locate('.restaurant-item__name a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorites');
  I.waitForElement('.restaurant-item__name a', 5);
  I.seeElement('.restaurant-item__name a');
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant-item__name a');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  // Reload the page and verify the liked restaurant is still in the favorites list
  I.refreshPage();
  I.seeElement('.restaurant-item__name a');
  const reloadedLikedRestaurantTitle = await I.grabTextFrom('.restaurant-item__name a');
  
  assert.strictEqual(firstRestaurantTitle, reloadedLikedRestaurantTitle);
});
