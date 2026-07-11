# HANDOFF — tanyaegorova.space

## Что это
Персональный "coming soon" сайт для Tanya Egorova с набором встроенных
виджетов-утилит: тест скорости интернета, конвертер валют, мировые часы,
крипто-тикер (TON/BTC), фоновая музыка.

## Стек
- Cloudflare Pages: статика (index.html, vanilla JS/CSS) + Pages Functions
  (серверная логика в functions/api/)
- Функции (functions/api/):
  - weather.js
  - upload-test.js (вероятно для speed-test загрузки)
  - ping.js

## Виджеты в index.html
- Speed test: спидометр на базе SVG (uv-meter.svg/UV-Meter.svg),
  тестовый файл speedtest-6mb.bin для замера скорости скачивания
- Currency: конвертер валют (currency-row/currency-input/currency-select,
  строки ~153-256), модалка #currencyModal
- World Clock: Лондон/Пекин/Бангкок/Бали/Дели/Москва
- Crypto ticker: TON/BTC (вероятно через CoinGecko API)
- Фоновая музыка: morgan-ambient-calm-ambient-dreamscape-529861.mp3

## Инфраструктура
- GitHub repo: paninsergey1965-lgtm/tanyaegorova-site
- Hosting: Cloudflare Pages

## Не сделано / открыто
- HANDOFF.md создан только сейчас (11.07.2026), задним числом
- Не проверено назначение upload-test.js и ping.js — уточнить при
  следующей сессии, если понадобится их редактировать
- Не проверен провайдер погоды/крипто-данных в weather.js — уточнить API-ключи/лимиты
