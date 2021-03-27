import React from 'react';
import CountryList from './components/listCountries'
import styles from './styles.module.css';
function App() {
  return <div className={styles.wrapper}><CountryList/></div>;
}

export default App;
