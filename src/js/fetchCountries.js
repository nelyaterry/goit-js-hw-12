import Notiflix from "notiflix";

export function fetchCountries(countryName) {
    
    let url = `https://restcountries.eu/rest/v2/name/${countryName}`;

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json()
        });
}