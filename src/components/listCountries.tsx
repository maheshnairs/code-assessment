import React, { useEffect, useState, useCallback } from 'react';
import { getAllCountries, getCountryDetails } from '../apiUtil';
import styles from '../styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

type Props = {};
function CountryList(props: Props) {
  const [countries, setCountryList] = useState({ original: [], dirty: [] });
  const [sortDirection, setSortDirection] = useState(true);
  const [countryInfo, setCountryInfo] = useState<any>({});
  const [selectedCountry, setSelectedCountry] = useState('void');
  const [filterBy, setFilterBy] = useState('name');

  const filterByField = (searchString: string) => {
    const filteredData = {
      ...countries,
      dirty: [
        ...countries.original.filter((country: any) => {
          debugger
          return (country[filterBy].toLowerCase()).includes(searchString.toLowerCase())
        }
        )
      ]
    }
    setCountryList(filteredData);
  }
  const sortTable = useCallback(() => {
    const countriesSorted = {
      ...countries,
      dirty: [
        ...countries.dirty.sort((a: any, b: any) =>
          sortDirection ? b.population - a.population : a.population - b.population
        )
      ]
    };
    setCountryList(countriesSorted);
    setSortDirection(!sortDirection);
  }, [countries, sortDirection]);

  const readCountryDetails = (countryName: string) => {
    setSelectedCountry(countryName);
    if (countryInfo[countryName]) {
      return;
    }
    getCountryDetails(countryName).then(data => setCountryInfo({ ...countryInfo, [countryName]: data }));
  };
  const updateFilterBy = (event: any) => {
    setFilterBy(event.target.value);
  };

  const renderCurrencyDetails = (currencies: Array<Object>) => {
    return currencies.map((currency: any) => {
      return (
        <div key={currency.code}>
          <div>
            Code : {currency.code}, Name: {currency.name}, Symbol: {currency.symbol}
          </div>
        </div>
      );
    });
  };

  const renderCountryDetails = () => {
    return countryInfo[selectedCountry].map((country: any) => {
      return (
        <div key={country.name}>
          <div>Country Name : {country.name}</div>
          <div>Capital : {country.capital}</div>
          <div>Region : {country.region}</div>
          <div>Subregion : {country.subregion}</div>
          <div>Country Name : {country.name}</div>
          Currency Details : {renderCurrencyDetails(country.currencies)}
        </div>
      );
    });
  };
  useEffect(() => {
    getAllCountries().then(data => setCountryList({ original: data, dirty: data }));
  }, []);

  return (
    <>
      <div className={`${styles.card} ${styles.listingCard}`}>
        <div className={styles.cardHeader}>
          Country List
          <div className={styles.filterByContaier}>
            <span>Filter By</span>
            <div className={styles.filterByInputWrapper}>
              <select value={filterBy} onChange={updateFilterBy}>
                <option value="name">Name</option>
                <option value="alpha2Code">Code</option>
              </select>
              <input onChange={(event: any) => filterByField(event.target.value)} type="text" />
            </div>
          </div>
        </div>
        <div className={styles.cardContent}>
          <table>
            <thead>
              <tr>
                <th>Country Name</th>
                <th>Country Code</th>
                <th>
                  Population <FontAwesomeIcon onClick={sortTable} icon={faSort}></FontAwesomeIcon>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {countries.dirty &&
                countries.dirty.length > 0 &&
                countries.dirty.map((country: any) => {
                  return (
                    <tr key={country.alpha2Code}>
                      <td>{country.name}</td>
                      <td>{country.alpha2Code}</td>
                      <td>{country.population}</td>
                      <td>
                        <span onClick={() => readCountryDetails(country.name)}>More Info</span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <div className={`${styles.card} ${styles.detailCard}`}>
        <div className={styles.cardHeader}>Country Details</div>
        <div className={`${styles.cardContent} ${styles.countryDetailCardContent}`}>
          {countryInfo[selectedCountry] && renderCountryDetails()}
        </div>
      </div>
    </>
  );
}

export default CountryList;
