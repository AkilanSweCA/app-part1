require("dotenv").config();

// Define the geocodeService function
export const getcoordinates = async function getCoordinates(address: string) {
  try {
    // Extract coordinates from the response

    // Make a request to the geocoding API
    const response = await fetch(
      `${process.env.GEO_API}&q=${encodeURIComponent(address)}`
    );

    const resp = await response.json();

    // Return the coordinates
    return resp.length > 0 ? [resp[0].lat, resp[0].lon] : undefined;
  } catch (e) {
    throw e;
  }
};
