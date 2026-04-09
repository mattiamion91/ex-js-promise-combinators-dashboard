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
Se l’array di ricerca è vuoto, invece di far fallire l'intera funzione, semplicemente i dati relativi a quella chiamata verranno settati a null e  la frase relativa non viene stampata. Testa la funzione con la query “vienna” (non trova il meteo).
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
    const promiseDestinations = fetchJson(`${API_URL}/destinations?search=${query}`);
    const promiseWeather = fetchJson(`${API_URL}/weathers?search=${query}`);
    const promiseAirport = fetchJson(`${API_URL}/airports?search=${query}`);

    const promises = [promiseDestinations, promiseWeather, promiseAirport];
    const [destinations, weather, airport] = await Promise.all(promises);

    return {
        city: destinations[0].name,
        country: destinations[0].country,
        temperature: weather[0].temperature,
        weather: weather[0].weather_description,
        airport: airport[0].name
    }
}

//uso la funzione appena creata
(async () => {
    const data = await getDashboardData('london')
    console.log(`dashboard: `, data);
    console.log(`
        ${data.city} si trova in ${data.country}
        oggi ci sono ${data.temperature} gradi e il clima é ${data.weather}
        l'aeroporto principale é ${data.airport}
        `);
})()