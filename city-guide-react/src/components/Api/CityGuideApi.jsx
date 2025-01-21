const cityGuideApiUrl = 'https://6734e04a5995834c8a9132b6.mockapi.io/attractions';

const fetchAttractionsData = async (urlObject) => {
  const options = {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  };

  const response = await fetch(urlObject, options);

  if (response.ok) {
    return response.json();
  } else {
    if (response.status === 404) throw new Error('404, Ничего не найдено');
    if (response.status === 500) throw new Error('500, Внутренняя ошибка сервера');
    throw new Error(response.status);
  }
};

export { cityGuideApiUrl, fetchAttractionsData };
