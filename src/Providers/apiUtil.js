const apiUtil = {
  url: () => {
    if (process.env.NODE_ENV === "production")
      return "https://oai-toolkit.herokuapp.com";

    if (process.env.NODE_ENV === "development") return "http://localhost:5000";

    if (process.env.NODE_ENV === "test") return "http://localhost:5000";
  },
};

export default apiUtil;
