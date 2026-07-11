with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

old = '''<div class="speed-modal" id="currencyModal">
  <button class="speed-modal-close" id="currencyModalClose">&times;</button>
  <div class="speed-title">Currency</div>'''

new = '''<div class="speed-modal" id="weatherModal">
  <button class="speed-modal-close" id="weatherModalClose">&times;</button>
  <div class="speed-title">Weather</div>
  <div id="weatherList"></div>
</div>

<div class="speed-modal" id="currencyModal">
  <button class="speed-modal-close" id="currencyModalClose">&times;</button>
  <div class="speed-title">Currency</div>'''

count = content.count(old)
print(f"Found {count}")
if count == 1:
    content = content.replace(old, new)
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(content)
    print("PATCHED OK")
else:
    print("ABORTED")
