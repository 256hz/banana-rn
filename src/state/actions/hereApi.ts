import railsAxios from '@util/railsAxios';

const getTravelTimes = async (
  jwt: string,
  donorId: number,
  clientLat: number,
  clientLong: number,
) => {
  const endpoint = `/clients/${donorId}/travel_times?client_lat=${clientLat}&client_long=${clientLong}`;

  try {
    const response = await railsAxios(jwt).get(endpoint);

    return {
      responseStatus: {
        code: response.status,
        message: response.statusText,
      },
      travelTimes: response.data.times,
    };
  // TODO: update type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      responseStatus: {
        code: error.response.status,
        message: error.response.statusText,
        travelTimes: {
          pedestrian: 'not available',
          publicTransport: 'not available',
          bicycle: 'not available',
        },
      },
    };
  }
};

export { getTravelTimes };
