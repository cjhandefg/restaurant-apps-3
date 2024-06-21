import API_ENDPOINT from "../globals/api-endpoint";

const handleFormSubmit = async (event) => {
  event.preventDefault();

  const restaurantId = document.getElementById("restaurantId").value;
  const reviewerName = document.getElementById("reviewerName").value;
  const reviewText = document.getElementById("reviewText").value;

  const reviewData = {
    id: restaurantId,
    name: reviewerName,
    review: reviewText,
  };

  try {
    const response = await fetch(API_ENDPOINT.REVIEW, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    const result = await response.json();

    if (!result.error) {
      // Update the reviews list
      const reviewsList = document.querySelector(".reviews-list");
      reviewsList.innerHTML = result.customerReviews
        .map(
          (review) => `
        <li class="review">
          <p><strong>${review.name}</strong> (${review.date}):</p>
          <p>${review.review}</p>
        </li>
      `,
        )
        .join("");

      // Clear the form
      document.getElementById("addReviewForm").reset();
    } else {
      console.error("Failed to add review:", result.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const initFormHandler = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("addReviewForm");
    if (form) {
      form.addEventListener("submit", handleFormSubmit);
    }
  });
};

export default initFormHandler;
