import CONFIG from "../../globals/config";
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const createRestaurantDetailTemplate = (restaurant) => `
  <div class="restaurant-detail">
    <h2 class="restaurant__name">${restaurant.name}</h2>
    <img class="restaurant__poster" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" />
    <div class="restaurant__info">
      <h3>Information</h3>
      <h4>City</h4>
      <p>${restaurant.city}</p>
      <h4>Rating</h4>
      <p>${restaurant.rating}</p>
      <h4>Address</h4>
      <p>${restaurant.address}</p>
      <h4>Categories</h4>
      <p>${restaurant.categories.map((category) => category.name).join(", ")}</p>
      <h4>Foods</h4>
      <ul>
        ${restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join("")}
      </ul>
      <h4>Drinks</h4>
      <ul>
        ${restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join("")}
      </ul>
    </div>
    <div class="restaurant__description">
      <h3>Description</h3>
      <p>${restaurant.description}</p>
    </div>
    <div class="restaurant__reviews">
     <h3>Customer Reviews</h3>
     <ul>
       ${restaurant.customerReviews
         .map(
           (review) => `
         <li class="review">
           <p><strong>${review.name}</strong> (${review.date}):</p>
           <p>${review.review}</p>
         </li>
       `,
         )
         .join("")}
     </ul>
     <div class="review-form">
          <h3>Add Your Review</h3>
          <form id="addReviewForm">
            <input type="hidden" id="restaurantId" value="${restaurant.id}">
            <div>
              <label for="reviewerName">Name:</label>
              <input type="text" id="reviewerName" name="name" required>
            </div>
            <div>
              <label for="reviewText">Review:</label>
              <textarea id="reviewText" name="review" required></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  `;

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item" data-id="${restaurant.id}">
    <div class="restaurant-item__header">
      <div class="restaurant-item__image-container">
        <img class="restaurant-item__image lazyload" alt="${restaurant.name}" 
             src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}">
        <div class="restaurant-item__rating">
          <span aria-label="Rating: ${restaurant.rating}">${restaurant.rating}</span>
        </div>
      </div>
    </div>
    <div class="restaurant-item__content">
      <h3 class="restaurant-item__name">
          <a href="/#/detail/${restaurant.id}" class="restaurant-item__link">${restaurant.name}</a>
     </h3>
      <p class="restaurant-item__city">${restaurant.city}</p>
      <p class="restaurant-item__description">${restaurant.description}</p>
    </div>
  </div>
`;

const createRestaurantListTemplate = (restaurants) => {
  const restaurantList = document.createElement("div");
  restaurants.forEach((restaurant) => {
    const restaurantItem = document.createElement("div");
    restaurantItem.className = "restaurant-item";
    restaurantItem.innerHTML = createRestaurantItemTemplate(restaurant);
    restaurantList.appendChild(restaurantItem);
  });
  return restaurantList.innerHTML;
};

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createRestaurantListTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
