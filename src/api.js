// API
const NYT_API_KEY = "T9Bpdq9CxNzb3ThGhJcYec6KVAP9uPc1";

export const newsApi = async (value, page) => {
  const json = await (
    await fetch(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${value}&page=${page}&api-key=${NYT_API_KEY}`
    )
  ).json();
  return json;
};
