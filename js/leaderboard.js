var config = {
    apiKey: "AIzaSyA7PZ_Ef7eF0_KC6PrWxtcKSH5hABmp9sc",
    authDomain: "titanpowerup.firebaseapp.com",
    databaseURL: "https://titanpowerup.firebaseio.com",
    projectId: "titanpowerup",
    storageBucket: "titanpowerup.appspot.com",
    messagingSenderId: "910408833493"
};

firebase.initializeApp(config);
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword')

var database = firebase.database();

var scoreList;

function writeScore(score, nick) {
    // there is vuln here in nick b/c it is user defined
    database.ref('leaderboard').child(nick).set({
        score: score,
        name: nick
    });
}

function getScores() {
    return new Promise((resolve, reject) => {
        database.ref('leaderboard').once('value', function(snapshot) {
            // snapshot.forEach(function(childSnapshot) {
            //     // var  = childSnapshot.key;
            //     // var childData = childSnapshot.val();
            //     // console.log()
            // });
            var val = snapshot.val();
            var tempList = _.values(val);
            console.log('scorelist', scoreList);
            scoreList = tempList;
            resolve(scoreList);
        });
    });
}

// function getHighScore() {
//     return getScores().then(function(scoreList) {
//         var obj =  _.maxBy(scoreList, (aScore) => aScore.score);
//         var string = JSON.stringify(obj);
//         var text = JSON.parse(string);
//         // text.name = new Date(text.name);
//         return [text.name, text.score];
//     });
// }

getScores(); // initial data
    

// function readScore() {
//     var ref = firebase.database().ref();
//     ref.on("value", function(snapshot) {
//         output.innerHTML = JSON.stringify(snapshot.val(), null, 2);
//     });
// }