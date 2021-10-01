<!-- GA SEI 32 Project 2: FrontEnd with API -->
<!-- ZY, 1 Oct 2021 -->

# LighTide

Get sunset/sunrise details + tide details based on the selected position on the map.

## Description

My goal is to create an app which would be useful to researchers/scientists/hobbyists/trekkers/anyone who need information regarding sunlight/tides. Upon selecting a location on the map, the coordinates (lat/long) are parsed into the sunlight&tides API and users can see the results on screen.

Knowing the tides are essential to the safety of people going to the sea/ocean/etc, and having the knowledge of sunrise/sunset can help in planning for the activity.

### Technical Used
What technologies you used that helped you build this project. 

```

- React
```
<!-- - Bootstrap with react
- Ajax (axios) for API
- etc.. -->

### Wireframes

Your step by step planning sketch of your project, that you can post them as an image in here.

### User Stories


```
To use the app, user should:

- Click a point on the map
- Click registers a coordinate, gets a lat/long (useState)
- User confirms that is the point they are interested in, selects "get details" button
- Button will parse lat/long info into API, get the results and display on screen
- Bonus will be including a date selection so user can select the date they want and check the sunrise/tide information for that particular date

```

---

## Planning and Development Process

```
Timeline

30 Sept - look through the given APIs, selected the sunrise/sunset one. Couldn't find any on tides in the list so did own research and found one. Also decided to use the google maps one to incorporate my map
1 Oct - Created readme and react app, started planning further details.

```

### Problem-Solving Strategy

What strategy did you use to solve your problems.

### Unsolved problems

List unsolved problems which would be fixed in future iterations.

## APIs Used

List your APIs you have used in this project and explain why did you use it.

Map API to get coordinates (lat/long) https://developers.google.com/maps/documentation/geocoding/overview  
Sunrise/sunset API https://sunrise-sunset.org/api  
Tides API https://docs.stormglass.io/#/  

---

## Acknowledgments


---

 ## References