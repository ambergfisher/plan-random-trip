# Plan a random trip around the United States!
Ever want to roadtrip around the US but have no idea where to go? Do you want to visit towns off the beaten path? Is spontaneity your thing? Then this is the tool for you! We will give you a list of random towns across America that you can turn into your roadtrip map.

# Current Instructions for Use (must have Julia installed)
1. Clone the repository using ```git clone https://github.com/ambergfisher/plan-random-trip```
2. Run your local server within the repository folder and go to ```http://localhost:[your-port-num]```.

If you don't know how to run a local server, here is how I do it:
1. Run ```npm install -g http-server``` to install Node http-server.
2. Navigate to the repo in your terminal and run ```http-server```.
3. In your browser, go to ```https://localhost:[port]```. The default port should be ```8080```.

# Stages of development
1. (previous) Using Julia with some CSV reading to pick random towns or cities from around the US and just printing to terminal.
2. (previous) Turning the CSV file into an SQLite database (convert.jl) and using SQLite to optimize the processing time. This also has benefits for round three since the new database can be used by a server more easily than a CSV file.
3. (current) Creating a website that has a user interface for the city names as well as a map with points of all the cities chosen.

# Notes
1. You can still run the command line Julia files from inside the ```cmd-line``` folder. To create the database, run ```julia createDatabase.jl```. Then, to get the cities, run ```julia getRandomCity.jl [n]``` where ```[n]``` is how many cities you want.
2. In the previous (command line) iteration, there's a function called getRandomDumb() that implements the method that inspired this project. It is almost certainly the worst possible way that you could get a result, but I thought it was pretty funny and took minimal time to implement. View the video demonstrating the algorithm at https://vm.tiktok.com/ZMeL7Cdox

# Future add-ons?
1. Mapping out potential routes between cities
2. Exporting the list of cities (this would likely be pretty simple)
3. Adding suggestions for each city of what to do

# Data Source
All city data comes from https://simplemaps.com/data/us-cities . Thank you to them for providing the Free US Cities Database to all!
