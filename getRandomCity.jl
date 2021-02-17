# using Pkg
# Pkg.add("CSV")
# Pkg.add("DataFrames")
using CSV
using DataFrames
using Random

# for repeatability but can be commented out if you want
# different results every time you try
#Random.seed!(42)

function main()
    file = CSV.File("simplemaps_uscities_basicv1.73/uscities.csv") |> DataFrame
    file = file[:, 1:3]
    println("Cities dataframe loaded!")

    numCities = parse(Int64, ARGS[1])
    cities = DataFrame(city = String[], state_id = String[])
    for i in 1:numCities
        city = getRandomCity(file)
        push!(cities, city)
    end
    println(cities)
end

# finds all the cities where city != city_ascii
# this ends up being all towns with Spanish names
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
function getRandomCity(file)
    index = rand(1:size(file,1))
    return file[index, [1,3]]
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
