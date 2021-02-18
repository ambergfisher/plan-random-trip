using Pkg
# comment out Pkg.add() lines for speed once already added
Pkg.add("CSV")
Pkg.add("DataFrames")
Pkg.add("Tables")
Pkg.add("SQLite")
using CSV
using DataFrames
using Tables
using SQLite

function main()
    file = CSV.File("simplemaps_uscities_basicv1.73/uscities.csv") |> DataFrame
    file = file[:, 1:3]

    # create database structure
    db = SQLite.DB("cities.db")
    SQLite.load!(file, db, "cities")

    println("Cities database created!")
end

main()
