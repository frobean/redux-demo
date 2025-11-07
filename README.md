### React + redux demo app

This project was generated with react + vite

The intent here is to show how redux fits into a react application

This demo covers several areas.

Within the components 
* CRUD operations for todo items via redux
* Filter manipulation

Within the store
* providing access methods for the components 
* Providing filter behavior
* providing a CRUD client for the API

Incidentals provided to flesh out the demo include
* MSW based mock API so that the demo looks like it's talking to a real backend instead of local storage
* CSS in JSX components so it doesn't look like it was drawn by a 4 year old

Note: This is not intended to be an exhaustive reference.  This is a reflection of my understanding of redux after working with it for a few days.  I tried to cover a variety of cases and touch on the edges of how to think about performance in react + redux app, but the app itself is still simplistic and the scale is largely unexplored.

To run the demo:

Sync this repo locally
run npm install to get the dependencies
run npm run dev to launch locally