<!-- GA SEI 32 Project 2: FrontEnd with API -->
<!-- ZY, 1 Oct 2021 -->

# LighTide

Get sunset/sunrise details + tide details based on the selected position on the map.  

##### ============Explore the app here: https://lightide.vercel.app/ ================

## Description

My goal is to create an app which would be useful to researchers/scientists/hobbyists/trekkers/anyone who need information regarding sunlight/tides. Upon selecting a location on the map, the coordinates (lat/long) are parsed into the sunlight&tides API and users can see the results on screen.

Knowing the tides are essential to the safety of people going to the sea/ocean/etc, and having the knowledge of sunrise/sunset can help in planning for the activity.

Screenshot from https://sunrise-sunset.org/ suggesting who might require sunset/sunrise details
<img src="Images/sunrise_sunset.png"/>

### Technology Used
Technologies used to build this project. 

```
- React
- React Router
- Leaflet
- React-leaflet
- Openstreetmaps
- Axios
- Styled components CSS
- Date-fns
```

### Wireframes
<img src="Images/wireframe.png"/>

### User Stories


```
To use the app, user should:

- Click a point on the map / Search a place in search box
- Click / Search registers a coordinate, gets a lat/long
- User confirms that is the point they are interested in, selects "get details" button
- On click, button will parse lat/long info into API, get the results and display on screen
- Date selection included so user can select the date they want and check the sunrise/tide information for that particular date

```

---

## Planning and Development Process
Plan:
App should have 3 useState, for sun/tide/map  
every click on map will update the coordinates for map (controlled input) [Forward geocoding]
1 useEffect, with 2 fetch API for sun/tide. changes the sun/tide state. On every [toggle], which is button click  


```
Timeline

30 Sept - look through the given APIs, selected the sunrise/sunset one. 
Couldn't find any on tides in the list so did own research and found one. 
Also decided to use the google maps one to incorporate my map.
1 Oct - Created readme and react app, started planning further details. 
Changed map API to geoapify/leaflet.
2 Oct - Test out sunrise/sunset API.
3 Oct - Test out tides API + geoapify map API.
4 Oct - Exploring leaflet and testing out various maps with react. Installed react leaflet to experiment too.
5 Oct - Added route/link and navbar, installed Axios and replaced fetch.
Added the search bar + submit button for the geoapify map search.
6 Oct - Added function to update the date state. 
Adjusted leaflet map + explore leaflet marker.
Added get details button to retrive and update sun/tide details.
Successfully shifted Map from App to its own component.
Added Mapbox static tile layer.
Got the map to focus on position on searching a place. MVP Done!
7 Oct - Results now show in another page. "get details" changed from input to button type.
Installed styled components for CSS styling.
8 Oct - Added favicon and tested deployment.
CSS styling overhaul to make App look better.
9 Oct - Modified tide component to account for reaching daily limit.
Modified home page contents.
10 Oct - Edited home page contents for clarity.
11 Oct - Attempt to convert date / time from UTC to local time, exploring date-fns library.
```

### Problem-Solving Strategy

Tides date/time format sample : "2021-10-03T04:21:00+00:00" given in UTC
Want to change to local time, use date-fns   


### Unsolved problems

Search currently only accepts English, might add support for other languages.
Tide API limit is 50 requests/day, too little...

## APIs Used

Geocoding API https://apidocs.geoapify.com/playground/geocoding  
Map static tiles API https://www.mapbox.com/  
Sunrise/sunset API https://sunrise-sunset.org/api  
Tides API https://docs.stormglass.io/#/  

---

## Acknowledgments


---

 ## References
Had to do some research to better understand the topic and here are some websites I visited:  

Read on tide details https://oceanservice.noaa.gov/education/tutorial_tides/tides05_lunarday.html  
Explore some lat/long coordinates https://www.satsig.net/maps/lat-long-finder.htm  
To hide API key https://stackoverflow.com/questions/48699820/how-do-i-hide-api-key-in-create-react-app  
Looking at space in URL https://stackoverflow.com/questions/13900835/the-origin-on-why-20-is-used-as-a-space-in-urls  
Leaflet https://leafletjs.com/examples/quick-start/  
React leaflet https://react-leaflet.js.org/  
Registering an event on clicking map https://stackoverflow.com/questions/64937948/adding-onclick-function-to-a-mapcontainer-from-react-leaflet-in-typescript-f  
Getting map to flyto position on searching https://stackoverflow.com/questions/65979955/how-to-set-the-map-to-a-geolocation-on-map-load-with-react-leaflet-v3  
Styled components CSS https://styled-components.com/docs/basics#getting-started  
Styling Link https://stackoverflow.com/questions/37669391/how-to-get-rid-of-underline-for-link-component-of-react-router  
Favicon https://favicon.io/  
Eslint ignore file https://eslint.org/docs/user-guide/configuring/ignoring-code  
App deployment https://github.com/vercel/vercel/discussions/5566  
Media queries for styled components https://jsramblings.com/how-to-use-media-queries-with-styled-components/  
Adding local image https://stackoverflow.com/questions/34582405/react-wont-load-local-images  