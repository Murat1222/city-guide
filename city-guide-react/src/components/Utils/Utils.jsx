import './Loader.scss'

export const getLoadingIndicator = () => (
  <div className="loader-wrapper">
    <div className="loader"></div>
  </div>
);

export const debounce = (fn, timeoutMs = 250) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), timeoutMs);
  };
};

export const getUrlObject = (url, page, limit, title, category, sortBy, order) => {
  const urlObject = new URL(url);

  if (page) urlObject.searchParams.append('page', page);
  if (limit) urlObject.searchParams.append('limit', limit);
  if (title) urlObject.searchParams.append('title', title);
  if (category) urlObject.searchParams.append('category', category);
  if (sortBy) urlObject.searchParams.append('sortBy', sortBy);
  if (order) urlObject.searchParams.append('order', order);

  return urlObject;
};