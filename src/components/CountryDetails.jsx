import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios"
import { Link } from 'react-router-dom';



function CountryDetails() {

  //1. creo el estado para guardar los detalles

  const[info, setInfo] = useState(null)
  const[isLoading, setIsLoading] = useState(true)

  const{alpha3Code} = useParams()

  //2. contacto con la api con detalle en caso de tardar en respuesta
  //es CDM y CDU a la vez por eso le paso al array la info de alpha3Code

  useEffect(()=>{

    axios.get(`https://ih-countries-api.herokuapp.com/countries/${alpha3Code}`)
    .then((response)=>{
      console.log(response);
      setInfo(response.data)
      setIsLoading(false)

    }).catch((err)=>{
      console.log(err)
    })

  }, [alpha3Code])

  if (isLoading === true){
    return <h3>...loading</h3>
  }


  return (

    <div className="col-7">
       
    <img src={`https://flagpedia.net/data/flags/icon/72x54/${info.alpha2Code.toLowerCase()}.png`} alt="flag" />
    <h1>{info.name.common}</h1>
    <table className="table">
      <thead></thead>
      <tbody>
        <tr>
          <td style={{width: "30%"}}>Capital</td>
          <td>{info.capital}</td>
        </tr>
        <tr>
          <td>Area</td>
          <td>
            {info.area}
            <sup>2</sup>
          </td>
        </tr>
        <tr>
          <td>Borders</td>
          <td>
            
            
            {info.borders.map((eachBorder)=>{

            return<ul> <li> {<Link to={`/${alpha3Code}`}>
                {eachBorder}
               </Link>} </li> </ul>          

            })}
            {/* me quedaría por hacer que el link envie al pais limitrofe */}
            
          </td>
        </tr>
      </tbody>
    </table>
  </div>


  )
}

export default CountryDetails