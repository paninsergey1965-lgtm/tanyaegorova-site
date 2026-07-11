export async function onRequestGet() {
  const cities = [
    { name: "Москва", lat: 55.7558, lon: 37.6173 },
    { name: "Иваново", lat: 57.0004, lon: 40.9739 },
    { name: "Ярославль", lat: 57.6261, lon: 39.8845 }
  ];

  function getMood(code) {
    if (code === 0) return "sunny";
    if ([1, 2, 3, 45, 48].includes(code)) return "cloudy";
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "rain";
    if ([71, 73, 75, 85, 86].includes(code)) return "snow";
    if ([95, 96, 99].includes(code)) return "storm";
    return "cloudy";
  }

  const results = await Promise.all(cities.map(async (c) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=Europe%2FMoscow`;
    const res = await fetch(url);
    const data = await res.json();
    const w = data.current_weather;
    return {
      city: c.name,
      temp: Math.round(w.temperature),
      min: Math.round(data.daily.temperature_2m_min[0]),
      max: Math.round(data.daily.temperature_2m_max[0]),
      mood: getMood(w.weathercode)
    };
  }));

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" }
  });
}
