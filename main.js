/*In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), che accetta una città come input e recupera simultaneamente:
Nome completo della città e paese da  /destinations?search=[query]
(result.name, result.country, nelle nuove proprietà city e country).
Il meteo attuale da /weathers?search={query}
(result.temperature e result.weather_description nella nuove proprietà temperature e weather).
Il nome dell’aeroporto principale da /airports?search={query}
(result.name nella nuova proprietà airport).
Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.
Attenzione: le chiamate sono delle ricerche e ritornano un’array ciascuna, di cui devi prendere il primo risultato (il primo elemento).
Note del docente
Scrivi la funzione getDashboardData(query), che deve:
Essere asincrona (async).
Utilizzare Promise.all() per eseguire più richieste in parallelo.
Restituire una Promise che risolve un oggetto contenente i dati aggregati.
Stampare i dati in console in un messaggio ben formattato.
Testa la funzione con la query "london"
Esempio di utilizzo
getDashboardData('london')
    .then(data => {
        console.log('Dasboard data:', data);
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`+
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch(error => console.error(error));
Esempio di output atteso
// Risposta API
{
  city: "London",
  country: "United Kingdom",
  temperature: 18,
    weather: "Partly cloudy",
  airport: "London Heathrow Airport"
}
​
// Output in console
London is in United Kingdom. 
Today there are 18 degrees and the weather is Partly cloudy.
The main airport is London Heathrow Airport.
🎯 Bonus 1 - Risultato vuoto
Se l’array di ricerca è vuoto, invece di far fallire l'intera funzione, semplicemente i dati relativi a quella chiamata verranno settati a null e  la messaggio relativa non viene stampata. Testa la funzione con la query “vienna” (non trova il meteo).
// Risposta API
{
  city: "Vienna",
  country: "Austria",
  temperature: null,
    weather: null,
  airport: "Vienna International Airport"
}
​
// Output in console
Vienna is in Austria.
The main airport is Vienna International Airport.
🎯 Bonus 2 - Chiamate fallite
Attualmente, se una delle chiamate fallisce, Promise.all() rigetta l'intera operazione.

Modifica getDashboardData() per usare Promise.allSettled(), in modo che:
Se una chiamata fallisce, i dati relativi a quella chiamata verranno settati a null.
Stampa in console un messaggio di errore per ogni richiesta fallita.
Testa la funzione con un link fittizio per il meteo (es. https://www.meteofittizio.it).*/

//salvo url in una var
const API_URL = "http://localhost:3333";

//creo funzione per fare chiamate e restitire immediatamente un json
async function fetchJson(url) {
    const res = await fetch(url)
    const obj = await res.json()
    return obj
}

const getDashboardData = async (query) => {

    try {
        const promiseDestinations = fetchJson(`${API_URL}/destinations?search=${query}`);
        const promiseWeathers = fetchJson(`${API_URL}/weathers?search=${query}`);
        const promiseAirports = fetchJson(`${API_URL}/airports?search=${query}`);

        const promises = [promiseDestinations, promiseWeathers, promiseAirports];
        const [destinations, weathers, airports] = await Promise.all(promises);

        const destination = destinations[0]
        const weather = weathers[0]
        const airport = airports[0]

        return {
            city: destination ? destination.name : null,
            country: destination ? destination.country : null,
            temperature: weather ? weather.temperature : null,
            weather: weather ? weather.weather_description : null,
            airport: airport ? airport.name : null
        }

    } catch (error) {
        throw new Error(`errore recupero dati: ${error.messagge}`);
    }

}

//uso la funzione
getDashboardData('vienna')
    .then(data => {
        console.log("dasboard: ", data);
        let messaggio = ``
        if (data.city !== null && data.country !== null) {
            messaggio += `${data.city} si trova in ${data.country}. \n`
        }
        if (data.temperature !== null && data.weather !== null) {
            messaggio += `oggi ci sono ${data.temperature} gradi e il clima é ${data.weather}. \n`
        }
        if (data.airport !== null) {
            messaggio += `l'aeroporto principale é ${data.airport}. \n`
        }
        console.log(messaggio)   
})
.catch (error => console.error(error));