# Movie Listings - Jordan Taylor React Task

This is a demo project for a Movie Listings project.

To view the app, it uses Node and npm modules to set up a local server.

## Getting Started

To install all necessary npm modules, please navigate to the root folder and run:
`npm install`

Then start up the server by running
`npm start`

A browser window should automatically open, with `http://localhost:3000` as the start page.


## Quick Notes

* TMDB only returns results in 'pages' of 20 movies at a time - to view more, please click the 'Load More' button at the bottom of the returned list, however this does need to call the API a second time.
* The genre sidebar name list is auto-populated by a call to the Movie Genres API.
* The slider for 'Ratings' has a small timeout delay to prevent too many calls from over-eager rating fans!
* Genre selected - works with multiple selections.
