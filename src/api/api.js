import axios from "axios";

export const fetchData = async (countryName) => {
  try {
    const res = await axios.get('https://pomber.github.io/covid19/timeseries.json')
    const data = res.data

    let confirmedTotal = 0, infectedTotal = 0, recoveredTotal = 0, deathTotal = 0,
      confirmedNew = 0, infectedNew = 0, recoveredNew = 0, deathNew = 0
    var latest_date, casesArray = []

    const chartDate = ["2020-1-22", "2020-5-24", "2020-8-14", "2021-1-25", "2021-5-1", "2021-8-14", "2022-1-1", "2022-3-10", "2022-3-19"]

    const countriesName = Object.keys(data)

    if (countryName === 'Thế giới') {
      countriesName.forEach((name) => {
        const countryData = data[name]
        latest_date = countryData[countryData.length - 1]["date"]

        confirmedTotal += countryData[countryData.length - 1]["confirmed"]
        recoveredTotal += countryData[countryData.length - 1]["recovered"]
        deathTotal += countryData[countryData.length - 1]["deaths"]

        confirmedNew += (countryData[countryData.length - 1]["confirmed"] - countryData[countryData.length - 2]["confirmed"])
        recoveredNew += (countryData[countryData.length - 1]["recovered"] - countryData[countryData.length - 2]["recovered"])
        deathNew += (countryData[countryData.length - 1]["deaths"] - countryData[countryData.length - 2]["deaths"])
      
        countryData.forEach((country) => {
          if (chartDate.includes(country["date"])) {
            var elIndex = casesArray.findIndex(el => el.name === country["date"])
            if(elIndex !== -1)
            {
              casesArray[elIndex].total += country["confirmed"]
              casesArray[elIndex].recovered += country["recovered"]
              casesArray[elIndex].death += country["deaths"]
              casesArray[elIndex].active += country["confirmed"] - (country["recovered"] + country["deaths"])
            }
            else
            {
              const data = {
                name: country["date"],
                total: country["confirmed"],
                active: country["confirmed"] - (country["recovered"] + country["deaths"]),
                recovered: country["recovered"],
                death: country["deaths"]
              }
    
              casesArray.push(data)
            }
          }
        })
      })
    }
    else {
      const countryData = data[countryName]
      latest_date = countryData[countryData.length - 1]["date"]

      confirmedTotal = countryData[countryData.length - 1]["confirmed"]
      recoveredTotal = countryData[countryData.length - 1]["recovered"]
      deathTotal = countryData[countryData.length - 1]["deaths"]

      confirmedNew = (countryData[countryData.length - 1]["confirmed"] - countryData[countryData.length - 2]["confirmed"])
      recoveredNew = (countryData[countryData.length - 1]["recovered"] - countryData[countryData.length - 2]["recovered"])
      deathNew = (countryData[countryData.length - 1]["deaths"] - countryData[countryData.length - 2]["deaths"])

      countryData.forEach((country) => {
        if (chartDate.includes(country["date"])) {
          const data = {
            name: country["date"],
            total: country["confirmed"],
            active: country["confirmed"] - (country["recovered"] + country["deaths"]),
            recovered: country["recovered"],
            death: country["deaths"]
          }

          casesArray.push(data)
        }
      })
    }

    infectedTotal = confirmedTotal - (recoveredTotal + deathTotal)
    infectedNew = confirmedNew - (recoveredNew + deathNew)
    return {
      countriesName, data, latest_date, confirmedTotal, infectedTotal, recoveredTotal, deathTotal,
      confirmedNew, infectedNew, recoveredNew, deathNew, casesArray
    }
  }
  catch (err) {
    console.log(err)
  }
}