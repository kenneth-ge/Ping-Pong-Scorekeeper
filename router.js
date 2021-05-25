const express = require('express');
const fs = require('fs');
const path = require('path')
const sqlite3 = require("sqlite3").verbose()

const router = express.Router();

const dbFile = path.join(__dirname, 'database.db')

let db = new sqlite3.Database(dbFile)

if(!fs.existsSync(dbFile)){
    //note that names must be < 256 characters long
    db.run(`
    CREATE TABLE scores (
        name varchar(255),
        wins int,
        score int
    );
    `)
    console.log('create table')
}

router.get('/', (req, res) => {
    db.all(`SELECT DISTINCT name from scores`, (e, r) => {
        if(e){
            res.render('error')
            return
        }

        console.log(r)
        res.render('index', {
            names: r
        })
    })
})

router.get('/addName', (req, res) => {
    let name = req.query.name

    db.run(`INSERT INTO scores (name, wins, score) VALUES (?, ?, ?)`, [name, 0, 0], e => {
        if(e){
            res.json({
                success: false
            })
        }else{
            res.json({
                success: true
            })
        }
    })
})

router.get('/game', (req, res) => {
    let name1 = req.query.name1
    let name2 = req.query.name2

    res.render('game', {
        name1, name2
    })
})

router.get('/updateLeaderboard', (req, res) => {
    let name1 = req.query.name1
    let name2 = req.query.name2

    let score1 = parseInt(req.query.score1)
    let score2 = parseInt(req.query.score2)

    var winnerName
    var winnerScore

    if(score1 > score2){
        winnerName = name1
        winnerScore = score1
    }else{
        winnerName = name2
        winnerScore = score2
    }

    console.log(`update leaderboard ${name1} ${name2} ${score1} ${score2}`)

    db.get(`SELECT * FROM scores WHERE name = ?`, winnerName, (e, r) => {
        if(e){
            console.error(e)
            res.json({success: false})
            return
        }

        db.run(`UPDATE scores SET wins = ?, score = ? WHERE name = ?`, [r.wins + 1, r.score + winnerScore, winnerName], (e, r) => {
            if(e){
                console.error(e)
                res.json({success: false})
                return
            }

            console.log('success')
            res.json({success: true})
        })
    })
})

router.get('/leaderboard', (req, res) => {
    db.all(`SELECT * FROM scores ORDER BY wins DESC, score ASC`, (e, r) => {
        if(e){
            console.error(e)
            res.render('error')
            return
        }

        console.log(r)

        res.render('leaderboard', {
            leaderboard: r
        })
    })
})

module.exports = router