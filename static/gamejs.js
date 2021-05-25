let bluescore = document.getElementById('bluescore')
let redscore = document.getElementById('redscore')
let server = document.getElementById('server')

var bs = 0
var rs = 0

function blue(){
    bs++
    bluescore.innerHTML = bs

    checkwinner()
}

function red() {
    rs++
    redscore.innerHTML = rs

    checkwinner()
}

function updateServer(){
    var totalPoints = bs + rs;

    if(Math.floor(totalPoints / 2) % 2 == 0){
        server.innerHTML = `Server: ${redname}`
    }else{
        server.innerHTML = `Server: ${bluename}`
    }
}

function checkwinner(){
    updateServer();

    if(Math.abs(bs - rs) < 2){ //handles ties and 2 pt condition
        return
    }

    var max = Math.max(bs, rs)

    if(max > 10){
        if(bs == max){
            alert(`${bluename} won!`)
        }else{
            alert(`${redname} won!`)
        }

        fetch(`/updateLeaderboard?name1=${bluename}&name2=${redname}&score1=${bs}&score2=${rs}`).then(response => response.json()).then(response => {
            console.log('fetch')
            if(response.success){
                console.log('success')
                window.location.href="/leaderboard"
            }else{
                console.log('not a success')
                
                alert('Error submitting score')
            }
        })
    }
}

function stopEarly(){
    window.location.href="/"
}