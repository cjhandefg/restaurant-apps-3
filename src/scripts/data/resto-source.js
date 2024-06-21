import API_ENDPOINT from "../globals/api-endpoint";

class restoSource {
  static async getRestaurants() {
    try {
      const response = await fetch(API_ENDPOINT.LIST);
      if (!response.ok)
        throw new Error(`Failed to fetch: ${response.statusText}`);
      const responseJson = (await response.json()).restaurants;
      return responseJson;
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      throw error;
    }
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      if (!response.ok)
        throw new Error(`Failed to fetch: ${response.statusText}`);
      const responseJson = await response.json();
      return responseJson.restaurant;
    } catch (error) {
      console.error(`Error fetching restaurant details for ID ${id}:`, error);
      throw error;
    }
  }
}

export default restoSource;
