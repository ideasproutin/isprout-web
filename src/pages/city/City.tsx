import React from 'react'
import { useParams } from 'react-router-dom'
import cityData from '../../content/city'

const City = () => {
    const {cityName} = useParams()
    console.log(cityData)

    const cityInfo = cityData.find(obj => obj.city.toLowerCase() === cityName?.toLowerCase());
    if (!cityInfo) {
        return <div>City not found</div>;
    }
  return (
    <div>{cityName}</div>
  )
}

export default City