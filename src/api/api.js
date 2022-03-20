import axios from "axios";

export const fetchData = async (countryName) => {
  try {
    const res = await axios.get('https://pomber.github.io/covid19/timeseries.json')
    const data = res.data

    let confirmedTotal = 0, infectedTotal = 0, recoveredTotal = 0, deathTotal = 0,
      confirmedNew = 0, infectedNew = 0, recoveredNew = 0, deathNew = 0
    var latest_date

    const countriesName = Object.keys(data)

    if (countryName === 'Thế giới')
    {
      countriesName.forEach((name) => {
        const countryData = data[name]
        latest_date = countryData[countryData.length - 1]["date"]

        confirmedTotal += countryData[countryData.length - 1]["confirmed"]
        recoveredTotal += countryData[countryData.length - 1]["recovered"]
        deathTotal += countryData[countryData.length - 1]["deaths"]

        confirmedNew += (countryData[countryData.length - 1]["confirmed"] - countryData[countryData.length - 2]["confirmed"])
        recoveredNew += (countryData[countryData.length - 1]["recovered"] - countryData[countryData.length - 2]["recovered"])
        deathNew += (countryData[countryData.length - 1]["deaths"] - countryData[countryData.length - 2]["deaths"])
      })
    }
    else
    {
      const countryData = data[countryName]
      latest_date = countryData[countryData.length - 1]["date"]

      confirmedTotal = countryData[countryData.length - 1]["confirmed"]
      recoveredTotal = countryData[countryData.length - 1]["recovered"]
      deathTotal = countryData[countryData.length - 1]["deaths"]

      confirmedNew = (countryData[countryData.length - 1]["confirmed"] - countryData[countryData.length - 2]["confirmed"])
      recoveredNew = (countryData[countryData.length - 1]["recovered"] - countryData[countryData.length - 2]["recovered"])
      deathNew = (countryData[countryData.length - 1]["deaths"] - countryData[countryData.length - 2]["deaths"])
    }

    infectedTotal = confirmedTotal - (recoveredTotal + deathTotal)
    infectedNew = confirmedNew - (recoveredNew + deathNew)
    return {
      countriesName, data, latest_date, confirmedTotal, infectedTotal, recoveredTotal, deathTotal,
      confirmedNew, infectedNew, recoveredNew, deathNew
    }
  }
  catch (err) {
    console.log(err)
  }
}