# Appway HTML5 ads

## Intro

This activity came about because we wished to work with [Demandbase](https://www.demandbase.com/).

We chose to build our ads as HTML5 instead of taking the GIF approach.

The reasons behind:

- File size: we need to stay under 300Kb and since GIFs need to re-render every single pixel during an animation, it will lead to an increase in file size, specially as the animations grow more complex. Compression can attenuate this, but usually it will impact colour quality.
- GIFs are not interactive...
- GIF ads are easier to build, but in this day and age, there are also tools to help you make HTML5 ads if needed (e.g. https://webdesigner.withgoogle.com/)

For our needs and purpose, we built our HTML5 ads in-house without any 3rd party visual studio.

As much as possible we tried to streamline the process for mass-production and at this point it seems to fit our needs. Of course, we might always consider other avenues in the future.

## Project Structure

Example) campaign IDs: campaign1, campaign2; banner size: 300x250; content version: A, B for each campaign.

- ads:
  - campaign1
    - A1_300x250.html (Generate an ad using version A of the copy + template 1_300x250.html)
    - B1_300x250.html
  - campaign2
    - A1_300x250.html
    - B1_300x250.html
- data:
  - campaign1.json (Contains all the copy versions for the campaign. A and B in this case)
  - campaign2.json
- images:
  - campaign1_1.png
  - campaign2_1.png
  - appway-logo--light.svg
- js:
  - ad.js (Small library to run the ads)
- layouts:
  - default.html (Skeleton of the final html output)
- partials:
  - 1_300x250.html
- sass:
  - \_background.scss
  - \_reset.scss
  - \_sizing.scss
  - \_variables.scss
  - \_typography.scss
  - \_spacing.scss
  - (...)
  - \_base.scss
  - campaign1.scss  ( imports \_base.scss and defines custom variables)
  - campaign2.scss ( imports \_base.scss and defines custom variables)

The build process will generate the final folders based on the structure above.

### E.g.) ads/campaign1/A1_300x250.html

```html
---
layout: default
title: Campaign 1
stylesheet: campaign1.css
data: campaign1.json
---

{{> 1_300x250 data=campaign1.A}}
```

## Setup

To get started run the following commands:

```bash
git clone https://github.com/mariana-farinha/appway-ads.git projectname
cd projectname
npm install
```

## Build Commands

Kick off the build process and open a browser tab with a server pointing to the projects output files.

```bash
npm run start
```

Build the project and optimize it for production.

```bash
npm run build
```

Build the project, optimize it for production and create a zip folder with the compressed files.

```bash
npm run zip
```
