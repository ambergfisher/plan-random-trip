# Plan a random trip around the United States!
Ever want to roadtrip around the US but have no idea where to go? Do you want to visit towns off the beaten path? Is spontaneity your thing? Then this is the tool for you! We will give you a list of random towns across America that you can turn into your roadtrip map.

# Current Instructions for Use
1. Clone the repository using ```git clone https://github.com/ambergfisher/planRandomTrip```
2. If you don't want the same results every time, comment out ```Random.seed!(42)``` on line 10 of getRandomCity.jl. Otherwise, continue to step 3.
3. In the command line, run ```julia getRandomCity.jl [number of cities]``` from inside the repo folder, where ```[number of cities]``` is a whole number.

# Stages of development
1. (current) Using Julia with some CSV reading to pick random towns or cities from around the US and just printing to terminal.
2. (coming soon) Turning the CSV file into an SQLite database (convert.jl) and using SQLite to optimize the processing time. This also has benefits for round three since the new database can be used by a server more easily than a CSV file.
3. (coming soon) Creating a website that has a user interface for the city names as well as a map with points of all the cities chosen.

# Future add-ons?
1. Mapping out potential routes between cities
2. Exporting the list of cities (this would likely be pretty simple)
3. Adding suggestions for each city of what to do

# Notes
1. In the current iteration, there's a function called getRandomDumb() that implements the method that inspired this project. It is almost certainly the worst possible way that you could get a result but I thought it was pretty funny and took minimal time to implement. View the video demonstrating what the algorithm is at https://vm.tiktok.com/ZMeL7Cdox

# Data Source
All city data comes from https://simplemaps.com/data/us-cities . Thank you to them for providing the Free US Cities Database to all!
