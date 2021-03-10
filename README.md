# Plan a random trip around the United States!
Ever want to roadtrip around the US but have no idea where to go? Do you want to visit towns off the beaten path? Is spontaneity your thing? Then this is the tool for you! We will give you a list of random towns across America that you can turn into your roadtrip map. 

# Currently being hosted with Heroku [here](https://plan-random-trip.herokuapp.com/). 
(Note: This will take about 5-15 seconds to load as it is hosted with a free plan)

# How to run locally (requires npm and node be pre-installed)
1. Clone this repo with `git clone https://github.com/ambergfisher/plan-random-trip`
2. Install Nodemon globally (`sudo npm install -g nodemon`). This will be used for the backend server.
3. Set up a MongoDB database locally or through [MongoDB cloud](https://www.mongodb.com/) and import `cities.json` from this repo into it.
4. Get an API key for [Google Maps API](https://developers.google.com/maps).
5. Create `.env` files in both the root and client directories and add the following:
    - Root .env: `MONGO_URI=[MongoDB database url]`
    - Client .env: `REACT_APP_GOOGLE_API_KEY=[Google Maps API key]`
6. From the root folder, run `npm install` and then `nodemon server`. Your local backend server should be started. If it connected to your database correctly, it should tell you in the output.
7. From the client folder in a new terminal window, run `npm install`, then `npm start`. Your frontend should now be available for viewing at `localhost:3000`.
    

# Stages of development
1. (previous) Using Julia with some CSV reading to pick random towns or cities from around the US and just printing to terminal.
2. (previous) Turning the CSV file into an SQLite database (convert.jl) and using SQLite to optimize the processing time. This also has benefits for round three since the new database can be used by a server more easily than a CSV file.
3. (current) Creating a website that has a user interface for the city names as well as a map with points of all the cities chosen.

# Notes
1. You can still run the command line Julia files from the `initial-stage-terminal` branch.
2. In the previous (command line) iteration, there's a function called getRandomDumb() that implements the method that inspired this project. It is almost certainly the worst possible way that you could get a result, but I thought it was pretty funny and took minimal time to implement. View [this video](https://vm.tiktok.com/ZMeL7Cdox) demonstrating the "algorithm".

# Future add-ons?
1. Mapping out potential routes between cities
2. Exporting the list of cities (this would likely be pretty simple)
3. Adding suggestions for each city of what to do

# Data Source
All city data comes from https://simplemaps.com/data/us-cities . Thank you to them for providing the Free US Cities Database to all!
