const downloadImages = (urls) => {
  return Promise.all(
    urls.map((url) =>
      fetch(url)
        .then((response) => response.text())
        .then((responseData) => responseData)
    )
  ).then((data) => {
    return data;
  });
};

export { downloadImages };
