export async function getAllCountries(){
   return await fetch('https://restcountries.eu/rest/v2/all')
  .then(response => response.json())
}
export async function getCountryDetails(name: String){
  return await fetch(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
 .then(response => response.json())
}
