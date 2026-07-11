with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

old = '''fetch('/api/weather')
  .then(function(r){ return r.json(); })
  .then(function(data){
    document.body.setAttribute('data-weather', data.mood);
    var el = document.getElementById('weather-widget');
    if (el) {
      var sign = data.temp > 0 ? '+' : '';
      el.textContent = data.city + ', ' + sign + data.temp + '°';
      el.classList.add('visible');
    }
  })
  .catch(function(){});'''
new = '''fetch('/api/weather')
  .then(function(r){ return r.json(); })
  .then(function(data){
    if (!Array.isArray(data) || data.length === 0) return;
    document.body.setAttribute('data-weather', data[0].mood);
    var el = document.getElementById('weather-widget');
    if (el) {
      var sign = data[0].temp > 0 ? '+' : '';
      el.textContent = data[0].city + ', ' + sign + data[0].temp + '°';
      el.classList.add('visible');
    }
    var list = document.getElementById('weatherList');
    if (list) {
      list.innerHTML = data.map(function(c){
        var s = c.temp > 0 ? '+' : '';
        return '<div class="currency-row"><span>' + c.city + '</span><span>' + s + c.temp + '° (' + c.min + '°...' + c.max + '°)</span></div>';
      }).join('');
    }
    var wModal = document.getElementById('weatherModal');
    var wLink = document.getElementById('weather-widget');
    var wClose = document.getElementById('weatherModalClose');
    if (wLink && wModal) {
      wLink.addEventListener('click', function(){ wModal.classList.add('open'); });
    }
    if (wClose && wModal) {
      wClose.addEventListener('click', function(){ wModal.classList.remove('open'); });
    }
  })
  .catch(function(){});'''

count = content.count(old)
print(f"Found {count}")
if count == 1:
    content = content.replace(old, new)
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(content)
    print("PATCHED OK")
else:
    print("ABORTED")
