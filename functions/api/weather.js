const CITIES = [
  { city: "Москва", lat: 55.7558, lon: 37.6173 },
  { city: "Иваново", lat: 57.0000, lon: 40.9739 },
  { city: "Ярославль", lat: 57.6261, lon: 39.8845 }
];

export async function onRequest(context) {
  const results = await Promise.all(CITIES.map(fetchCity));
  return new Response(JSON.stringify(results), {
    headers: { "content-type": "application/json" }
  });
}

async function fetchCity({ city, lat, lon }) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,precipitation,weather_code,wind_speed_10m` +
    `&hourly=temperature_2m,precipitation_probability,precipitation,weather_code` +
    `&daily=temperature_2m_max,temperature_2m_min` +
    `&timezone=auto&forecast_days=1`;

  const r = await fetch(url);
  const d = await r.json();

  return {
    city,
    temp: Math.round(d.current.temperature_2m),
    wind: d.current.wind_speed_10m,
    min: Math.round(d.daily.temperature_2m_min[0]),
    max: Math.round(d.daily.temperature_2m_max[0]),
    hourly: d.hourly.time.map((t, i) => ({
      time: t.slice(11, 16),
      temp: Math.round(d.hourly.temperature_2m[i]),
      precipProb: d.hourly.precipitation_probability[i],
      precipMm: d.hourly.precipitation[i]
    }))
  };
}
