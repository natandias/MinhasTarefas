import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/",
});

export default {
  async makeHttpRequest(
    method,
    resource,
    data = {},
    resourceNeedsAuthentication = false
  ) {
    try {
      const apiResult = await api({
        method: method,
        url: resource,
        data: data,
        headers: {
          user_id: localStorage.getItem("user_id"),
          token: localStorage.getItem("token"),
        },
      });

      return apiResult && apiResult.data ? apiResult.data : null;
    } catch (err) {
      console.log("err", err.response);
      return err.response && err.response.data ? err.response.data : false;
    }
  },
};
