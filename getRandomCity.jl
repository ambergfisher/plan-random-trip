using Pkg
# comment out Pkg.add() lines for speed once already added
Pkg.add("SQLite")
Pkg.add("CSV")
Pkg.add("DataFrames")
using SQLite
using Random
using CSV
using DataFrames

# for repeatability but can be commented out if you want
# different results every time you try
#Random.seed!(42)

# Smart for the best way, Dumb for the Tiktok way
global mode = "Smart"

function main()
    numCities = parse(Int64, ARGS[1])

    if mode == "Smart"
        db = SQLite.DB("cities.db")
        println("Cities database loaded!")

        cities = getCitiesList(db, numCities)
    elseif mode == "Dumb"
        file = CSV.File("simplemaps_uscities_basicv1.73/uscities.csv") |> DataFrame
        file = file[:, 1:3]
        println("Cities dataframe loaded!")

        cities = DataFrame(city = String[], state_id = String[])
        for i in 1:numCities
            city = getRandomCity(file)
            push!(cities, city)
        end
    end
    
    println(cities)
end

# finds all the cities where city != city_ascii
# this ends up being all towns with Spanish names
# current implementation only works in "Dumb" mode as it takes in a DataFrame
function difference(file)
    diff = DataFrame(city = String[], city_ascii = String[], state_id = String[])
    for i in 1:size(file, 1)
        if file[i, 1] != file[i, 2]
            push!(diff, file[i, 1:3])
        end
    end
    println(diff)
end

# the "right" way to do this
function getCitiesList(db, numCities)
    return DBInterface.execute(db, "SELECT city, state_id
                                    FROM cities
                                    ORDER BY RANDOM()
                                    LIMIT $numCities") |> DataFrame
end

# really dumb way that I saw on tiktok and thought was funny
# (aka remove one row at a time until only 1 city left)
function getRandomDumb(file)
    while size(file, 1) != 1
        index = rand(1:size(file, 1))
        file = file[setdiff(1:end, index), :]
    end
    return file[1, [1,3]]
end


main()
