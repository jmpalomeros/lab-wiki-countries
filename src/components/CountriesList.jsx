import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CountriesList() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://ih-countries-api.herokuapp.com/countries')
      .then((response) => {
        console.log(response);
        setList(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoading === true) {
    return <h3>...loading</h3>;
  }

  return (
    <div className="col-5" style={{ maxHeight: '90vh', overflow: 'scroll' }}>
      <div className="list-group">
        {list.map((eachCountry) => {
          return (
            <p key={eachCountry.alpha3Code}>
              <Link to={`/${eachCountry.alpha3Code}`}>
                {eachCountry.name.common}
               </Link>

               <img src={`https://flagpedia.net/data/flags/icon/72x54/${eachCountry.alpha2Code.toLowerCase()}.png`} alt="flag" />

            </p>
            
          );
        })}
      </div>
    </div>
  );
}

export default CountriesList;
