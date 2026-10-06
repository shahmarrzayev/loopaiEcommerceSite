class Unistore {
  constructor() {
    // this.lng = localStorage.getItem("lang") || "az";
    this.baseUrl = "https://api.unistore.az/api/";
    this.baseUrlImage = "https://storage.unistore.az/";
    this.count = 0;
  }
   
  api() {
    const defaultHeaders = () => ({
      Accept: "application/json",
      "Content-Type": "application/json",
    //   "Accept-Language": localStorage.getItem("lang") || this.lng,
    });

    const request = async (endpoint, options = {}) => {
      const url = `${this.baseUrl}${endpoint}`;

      let headers = {
        ...defaultHeaders(),
        ...(options.headers || {}),
      };

      let body;

      if (options.data instanceof FormData) {
        delete headers["Content-Type"];
        body = options.data;
      } else if (options.data) {
        body = JSON.stringify(options.data);
      }

      const config = {
        method: options.method || "GET",
        headers,
        credentials: "include",
        body,
      };

      try {
        let response = await fetch(url, config);

        if (response.status === 403) {
          localStorage.removeItem("isLogin");
        }

        const pathnamesWithoutRefresh = ["/login"];

        if (pathnamesWithoutRefresh.includes(window.location.pathname)) {
          const data = await response.json();
          return { data, status: response.status };
        }

        if (response.status === 401 && this.count++ < 1) {
          console.warn("401 Unauthorized, trying refresh...");

          try {
            await fetch(`${this.baseUrl}auth/refresh`, {
              method: "POST",
              headers: defaultHeaders(), 
              credentials: "include",
            });

            response = await fetch(url, config);
          } catch (refreshError) {
            console.error("Session expired", refreshError);
            localStorage.removeItem("isLogin");
            window.location.href = "/login";
          }
        }

        const data = await response.json();

        if (!response.ok) throw { response, data };

        return { data, status: response.status };
      } catch (error) {
        console.log("Error -- ", error);
        return Promise.reject(error);
      }
    };

    return {
      get: (url, options) => request(url, { ...options, method: "GET" }),

      post: (url, data, options) =>
        request(url, { ...options, method: "POST", data }),

      put: (url, data, options) =>
        request(url, { ...options, method: "PUT", data }),

      delete: (url, options) => request(url, { ...options, method: "DELETE" }),
    };
  }
}
 
const unistoreSite = new Unistore();
export default unistoreSite;