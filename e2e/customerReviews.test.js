const assert = require("assert");

Feature("Customer Reviews");

Before(({ I }) => {
  I.amOnPage("/");
});

Scenario("seeing customer reviews on restaurant detail page", async ({ I }) => {
  I.seeElement(".restaurant-item__name a");
  const firstRestaurant = locate(".restaurant-item__name a").first();
  I.click(firstRestaurant);

  I.waitForElement(".restaurant__reviews", 5); // Wait for the reviews section to appear
  I.seeElement(".restaurant__reviews");

  const reviews = await I.grabTextFromAll(".review");
  console.log("Reviews found:", reviews);
  assert(reviews.length > 0, "No reviews found"); // Ensure there are reviews
});

Scenario("adding a new customer review", async ({ I }) => {
  I.seeElement(".restaurant-item__name a");
  const firstRestaurant = locate(".restaurant-item__name a").first();
  I.click(firstRestaurant);

  I.waitForElement(".review-form", 5); // Wait for the review form to appear
  I.seeElement(".review-form");

  const reviewerName = "Valentino Rossi";
  const reviewText = "Disini makanannya enak banget!";

  I.fillField("#reviewerName", reviewerName);
  I.fillField("#reviewText", reviewText);
  I.click('button[type="submit"]');

  I.waitForElement(".restaurant__reviews", 5); // Wait for the reviews section to appear again
  I.seeElement(".restaurant__reviews");

  const reviews = await I.grabTextFromAll(".review");
  console.log("Reviews after adding new:", reviews);
  const newReview = reviews.find(
    (review) => review.includes(reviewerName) && review.includes(reviewText),
  );
  assert(newReview, "New review was not added");
});
