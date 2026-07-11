with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

old = '<span id="weather-widget" class="weather"></span>'
new = '<span id="weather-widget" class="weather speed-link"></span>'

count = content.count(old)
print(f"Found {count}")
if count == 1:
    content = content.replace(old, new)
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(content)
    print("PATCHED OK")
else:
    print("ABORTED")
