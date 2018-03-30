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

var myRef = firebase.database().ref('leaderboard');

if (localStorage.getItem("storKey") === null) {
    var key = firebase.database().ref('leaderboard').push().key;
    localStorage.setItem("storKey", key);
} else {
    var key = localStorage.getItem("storKey")
}


function writeScore(score, nick) {
    // A post entry.
    var postData = {
        score: score,
        name: nick
    };

    return myRef.child(key).set(postData);
}


function getScores() {
    return new Promise((resolve, reject) => {
        database.ref('leaderboard').once('value', function(snapshot) {
            var val = snapshot.val();
            var scoreList = _.values(val);
            scoreList.sort((a, b) => b.score - a.score);
            resolve(scoreList);
        });
    });
}

getScores(); // initial data
console.log(getScores());
