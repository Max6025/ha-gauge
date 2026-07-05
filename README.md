# HA Gauge Card

Eine moderne, stark individualisierbare Gauge-Card (Tacho-Anzeige) für Home
Assistant Lovelace-Dashboards. Mit Zeiger, farbigen Schwellenwert-Segmenten,
Animationen und mehreren Design-Stilen — komplett per visuellem Editor
konfigurierbar, kein YAML notwendig.

![preview](https://img.shields.io/badge/status-work%20in%20progress-blue)

## Features

- **Zeiger (Needle)** ein-/ausschaltbar, mit sanfter Animation
- **Farbige Segmente/Schwellenwerte** – z. B. 0–60 grün, 60–85 gelb, 85–100 rot,
  frei definierbar über den Editor
- **5 Design-Stile**: `modern`, `neon` (Glow-Effekt), `minimal`, `gradient`
  (weicher Farbverlauf) und `flat`
- **Animationen** beim Ändern des Werts (Dauer einstellbar, oder ganz abschaltbar)
- **Halbkreis oder Dreiviertelkreis** Bogenform
- Skalenstriche, Titel, Einheit, Nachkommastellen, Min/Max frei einstellbar
- **Tap-, Halten- und Doppel-Tap-Aktionen** (Standard HA Actions, z. B. `more-info`,
  `toggle`, `navigate`, `perform-action`, …)
- Voller **visueller Editor** in der Lovelace-UI

## Installation

### Über HACS (empfohlen)

1. HACS → drei Punkte oben rechts → **Benutzerdefinierte Repositories**
2. Repository-URL dieses Projekts hinzufügen, Kategorie **Dashboard**
3. „HA Gauge Card" installieren und Home Assistant / den Browser-Cache neu laden

### Manuell

1. `dist/ha-gauge-card.js` aus diesem Repository herunterladen
2. Nach `config/www/ha-gauge-card.js` kopieren
3. Als Lovelace-Resource hinzufügen:

   ```yaml
   resources:
     - url: /local/ha-gauge-card.js
       type: module
   ```

## Verwendung

Karte über die UI hinzufügen (Suche nach „HA Gauge Card") oder per YAML:

```yaml
type: custom:ha-gauge-card
entity: sensor.cpu_temperature
name: CPU Temperatur
min: 0
max: 100
style: neon
sweep: 180
needle: true
animation: true
animation_duration: 900
show_value: true
show_ticks: true
decimals: 1
segments:
  - from: 0
    color: "#43a047"
  - from: 60
    color: "#fdd835"
  - from: 85
    color: "#e53935"
tap_action:
  action: more-info
```

## Konfigurationsoptionen

| Option               | Typ     | Standard   | Beschreibung                                                        |
| --------------------- | ------- | ---------- | --------------------------------------------------------------------- |
| `entity`              | string  | *(erforderlich)* | Entity mit numerischem Zustand                                  |
| `name`                | string  | Entity-Name | Titel unter dem Wert                                                |
| `unit`                | string  | Entity-Einheit | Überschreibt die angezeigte Einheit                              |
| `min` / `max`         | number  | `0` / `100` | Skalengrenzen                                                       |
| `decimals`            | number  | `1`        | Nachkommastellen des Werts                                           |
| `style`               | string  | `modern`   | `modern` \| `neon` \| `minimal` \| `gradient` \| `flat`               |
| `sweep`               | number  | `180`      | `180` (Halbkreis) oder `270` (Dreiviertelkreis)                       |
| `needle`              | boolean | `true`     | Zeiger anzeigen                                                       |
| `needle_color`        | string  | –          | CSS-Farbe für den Zeiger                                              |
| `show_value`          | boolean | `true`     | Digitalen Messwert anzeigen                                          |
| `show_ticks`          | boolean | `true`     | Skalenstriche an Min/Max/Segmentgrenzen                              |
| `animation`           | boolean | `true`     | Übergangsanimation bei Wertänderung                                  |
| `animation_duration`  | number  | `900`      | Animationsdauer in ms                                                |
| `glow`                | boolean | `false`    | Leuchteffekt (im `neon`-Stil automatisch aktiv)                      |
| `segments`            | list    | grün/gelb/rot | Farbsegmente: `[{ from: <Wert>, color: <CSS-Farbe> }, …]`         |
| `tap_action`          | action  | –          | Standard HA Tap-Action                                               |
| `hold_action`         | action  | –          | Standard HA Hold-Action                                              |
| `double_tap_action`   | action  | –          | Standard HA Double-Tap-Action                                        |

## Entwicklung

```bash
npm install
npm run watch      # esbuild im Watch-Modus -> dist/ha-gauge-card.js
npm run build      # minifizierter Produktionsbuild
npm run typecheck  # TypeScript ohne Emit
```

## Lizenz

MIT
