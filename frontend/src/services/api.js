import axios from "axios";

const commonApi = axios.create({
  baseURL: "http://localhost:5000/api/",
});

const authenticatedApi = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    user_id: 1,
    token: "$2b$10$eJsVv733sjl6rcRa1Pf1O.073Iz8ioehz7ACgDyBT7jiKZl3Lq4uu",
  },
});

export default {
  async makeHttpRequest(
    method,
    resource,
    data = {},
    resourceNeedsAuthentication = false
  ) {
    let api = resourceNeedsAuthentication ? authenticatedApi : commonApi;

    try {
      const apiResult = await api({
        method: method,
        url: resource,
        data: data,
      });

      return apiResult && apiResult.data ? apiResult.data : null;
    } catch (err) {
      console.log("err", err.response);
      return err.response && err.response.data ? err.response.data : false;
    }
  },
};
