import UrlParser from "../../routes/url-parser";
import restoSource from "../../data/resto-source";
import { createRestaurantDetailTemplate } from "../templates/template-creator";
import initFormHandler from "../../utils/form-handler";
import LikeButtonInitiator from "../../utils/like-button-initiator";

const Detail = {
  async render() {
    return `
      <div id="restaurant-detail" class="restaurant-detail" tabindex="0"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantDetailContainer =
      document.getElementById("restaurant-detail");

    try {
      const restaurant = await restoSource.detailRestaurant(url.id);
      restaurantDetailContainer.innerHTML =
        createRestaurantDetailTemplate(restaurant);

      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector("#likeButtonContainer"),
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          description: restaurant.description,
          pictureId: restaurant.pictureId,
          city: restaurant.city,
          rating: restaurant.rating,
        },
      });

      // Initialize form handler after rendering the template
      initFormHandler();
    } catch (error) {
      console.error("Failed to load restaurant detail:", error);
      restaurantDetailContainer.innerHTML =
        "<p>Failed to load restaurant details. Please try again later.</p>";
    }
  },
};

export default Detail;
