import axios from "axios";

const commonApi = axios.create({
  baseURL: "http://localhost:5000/api/",
});

const authenticatedApi = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    user_id: localStorage.getItem("user_id"),
    token: localStorage.getItem("token"),
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
