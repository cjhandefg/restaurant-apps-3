import FavoriteRestaurantIdb from "../../data/favorite-restaurant";
import { createRestaurantItemTemplate } from "../templates/template-creator";

const Favorites = {
  async render() {
    return `
      <section class="restaurants" id="restaurants" aria-labelledby="restaurants-heading">
        <h2 id="restaurants-heading">Your Favorite Places</h2>
        <div class="loading" id="loading">Loading...</div>
        <div class="error-message" id="error-message"></div>
        <div class="restaurants__list" id="restaurant-list"></div>
      </section>
    `;
  },

  async afterRender() {
    const loadingIndicator = document.getElementById("loading");
    const errorMessage = document.getElementById("error-message");
    const restaurantsContainer = document.querySelector("#restaurant-list");

    loadingIndicator.classList.add("visible");

    try {
      const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
      loadingIndicator.classList.remove("visible");

      if (restaurants.length === 0) {
        errorMessage.textContent = "You have no favorite restaurants yet.";
      } else {
        restaurants.forEach((restaurant) => {
          restaurantsContainer.innerHTML +=
            createRestaurantItemTemplate(restaurant);
        });
      }
    } catch (error) {
      console.error(error);
      loadingIndicator.classList.remove("visible");
      errorMessage.textContent =
        "Failed to load favorite restaurants. Please try again later.";
    }
  },
};

export default Favorites;
