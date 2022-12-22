const fetcher = async (url : string) => {
    const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we throw an error with extra info attached.
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    // error.status = res.status;
    // error.info = await res.json();
    throw error;
  }

  return res.json();
  }

export default fetcher;