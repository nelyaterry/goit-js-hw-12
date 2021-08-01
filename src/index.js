import './css/styles.css'
import Notiflix from 'notiflix';
import { debounce } from 'lodash';
import { fetchCountries } from './js/fetchCountries';
import cardsMarkup from './templates/countries-list.hbs'
import cardMarkup from './templates/country-card.hbs'

const DEBOUNCE_DELAY = 500;

const refs = {
    input: document.getElementById('search-box'),
    countryListElem: document.querySelector('.country-list'),
    countryInfoElem: document.querySelector('.country-info'),


}

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY)
);

function onSearch(event) {

    const countryName = event.target.value.trim();

    cleanMarkup();
    

    if (countryName !== '') {
        fetchCountries(countryName)
            .then(countries => {
                if (countries.length > 10) {
                    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                } else if (countries.length >= 2 && countries.length <= 10) {
                    onCreateCountryList(countries);
                } else if (countries.length === 1) {
                    onCreateCountryCard(countries);
                } ;
            })
            .catch(error => {
                Notiflix.Notify.failure("Oops, there is no country with that name!")
            });
        
        function onCreateCountryCard(countries) {
                
             countries.map(country => {
                const markup = cardMarkup(country);
                const countryLang = country.languages;
                const languages = countryLang.map(lang => lang.name).join(', ');
                const langMarkup = `<p class="country_detail">Languages: ${languages} </p>`;
                
                refs.countryInfoElem.insertAdjacentHTML('afterbegin', langMarkup);
                refs.countryInfoElem.insertAdjacentHTML('afterbegin', markup);
             });
             };

            function onCreateCountryList(countries) {
                const markup = cardsMarkup(countries)
                refs.countryListElem.innerHTML = markup;
            };
    }
}

function cleanMarkup() {
    refs.countryListElem.innerHTML = '';
    refs.countryInfoElem.innerHTML = '';
};