export async function getAllCountries() {
  return await fetch('https://restcountries.eu/rest/v2/all')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error Connecting Server');
      }
    })
    .catch(error => console.log(error));
}
export async function getCountryDetails(name: String) {
  return await fetch(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error Connecting Server');
      }
    })
    .catch(error => console.log(error));
}
