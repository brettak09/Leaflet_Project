# Leaflet Project
​
## Overview

Looks at earthquake magnitudes from the ​USGS site.

## Purpose/Objective

Utilize the GeoJson feed provided by the USGS on earthquake data and integrates the data into the D3 leaflet library.
​
## Conclusion

From the data collected, earthquake locations, and size can easily be identified and displayed. 
​
## Technologies Used

- D3
- JavaScript
- USGS API
- HTML
- Bootstrap CSS
​
#### Data Crunching

- sample data:
    {"type":"FeatureCollection","metadata":{"generated":1571769822000,"url":"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson","title":"USGS Magnitude 4.5+ Earthquakes, Past Week","status":200,"api":"1.8.1","count":95},"features":[{"type":"Feature","properties":{"mag":4.5999999999999996,"place":"17km ESE of Balao, Ecuador","time":1571760938294,"updated":1571767471244,"tz":-300,"url":"https://earthquake.usgs.gov/earthquakes/eventpage/us70005x7b","detail":"https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/us70005x7b.geojson","felt":4,"cdi":2.5,"mmi":null,"alert":null,"status":"reviewed","tsunami":0,"sig":327,"net":"us","code":"70005x7b","ids":",us70005x7b,","sources":",us,","types":",dyfi,geoserve,origin,phase-data,","nst":null,"dmin":0.63,"rms":1.0800000000000001,"gap":91,"magType":"mb","type":"earthquake","title":"M 4.6 - 17km ESE of Balao, Ecuador"},"geometry":{"type":"Point","coordinates":[-79.663399999999996,-2.9521000000000002,70.870000000000005]},"id":"us70005x7b"}


### How to Run

Will require adding a Mapbox ApI token add to the config.js file located at Project/static/js.