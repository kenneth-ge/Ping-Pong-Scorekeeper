# Ping-Pong-Scorekeeper

A scorekeeper for ping pong that keeps track of how many points each person has. Wins and points are logged in a database and displayed in a table in the leaderboard. Points are awarded to the winner only. A winner is declared if that person receives at least 11 points and is leading by at least 2 points. Point are only awarded to the winner. The leaderboard sorts by wins in descending order and points in ascending order (if someone has fewer points, it means they crushed the opponent). 

# To try this for yourself

FIrst, run `npm i` to install the dependencies. You might need to run `npm i sqlite3` for sqlite since npm sometimes doesn't install it if you just run `npm i`. 

THen, run `node index.js`. The server will automatically create a database for you if it doesn't exist. 

Finally, navigate to localhost:8080 and enjoy!
