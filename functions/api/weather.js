export async function onRequestGet({ request }) {
  const cf = request.cf || {};
  const lat = cf.latitude || 55.75;
  const lon = cf.longitude || 37.62;
  const city = cf.city || "Москва";

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const res = await fetch(url);
  const data = await res.json();
  const w = data.current_weather;

  const code = w.weathercode;
  let mood = "cloudy";
  if (code === 0) mood = "sunny";
  else if ([1, 2, 3, 45, 48].includes(code)) mood = "cloudy";
  else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) mood = "rain";
  else if ([71, 73, 75, 85, 86].includes(code)) mood = "snow";
  else if ([95, 96, 99].includes(code)) mood = "storm";

  return new Response(JSON.stringify({
    city, temp: Math.round(w.temperature), mood
  }), { headers: { "Content-Type": "application/json" } });
}
