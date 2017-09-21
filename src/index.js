import './css/reset.css';
import './css/sanitize.css';
import './css/index.css';
import * as $ from "jquery";
import * as firebase from "firebase";
import phpDatabase from "./PhpDataBase";

$(() => {
    let currentUser;
    // Initialize Firebase
    const config = {
        apiKey: "AIzaSyCMWVmBm8pRWEIxAtIgXVnomkLLZXqeAgw",
        authDomain: "gs-dev08-05-35.firebaseapp.com",
        databaseURL: "https://gs-dev08-05-35.firebaseio.com",
        projectId: "gs-dev08-05-35",
        storageBucket: "",
        messagingSenderId: "891653328727"
    };
    firebase.initializeApp(config);

    //ログインしているかしていないかで処理を分ける
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {//ログインしてたら
            console.log(user);
            currentUser = user;
            $(".profile__photo").attr("src", currentUser.photoURL);
            $(".profile__displayName").text(currentUser.displayName);
            $(".login").hide();
            $(".chat").show();
            init();
        } else {
            $(".login").show();
            $(".chat").hide();
        }
    });

    $(".profile__logout").on("click", (e) => {
        e.preventDefault();
        firebase.auth().signOut().then(() => {
            console.log("Signed out.");
        });
    });

    //facebookログインをする
    $(".login__button-facebook").on("click", (e) => {
        e.preventDefault();
        const provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('public_profile');
        // provider.setCustomParameters({
        //     'display': 'popup'
        // });

        firebase.auth().signInWithRedirect(provider).then((result) => {
        }).catch(function(error) {
            // Handle Errors here.
            alert("ログインエラー");
            console.error(error.code);
            console.error(error.message);
        });
    });

    $(".profile__photo").on("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        $(".profile__index").show();
    });


    $("html").on("click", (e) => {
        e.preventDefault();
        $(".profile__index").hide();
    });




    const init = () => {
        const newPostRef = firebase.database().ref();
        // const newPostRef = new phpDatabase();

        $("#message").on("keydown", (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                const $this = $(e.currentTarget);
                newPostRef.push({
                    uid: currentUser.uid,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                    message: $this.val(),
                    time: (new Date()).getTime()
                });
                $this.val("");
            }
        });

        newPostRef.on("child_added", (data) => {
            const v = data.val();
            console.log(v);
            // const k = data.key;
            let message = "";
            let d = new Date();
            if (v.time) {
                d.setTime(v.time);
                v.time = ("0" + d.getHours()).substr(-2) + ":" + ("0" + d.getMinutes()).substr(-2);
            }
            if (currentUser.uid === v.uid) {
                message = createRightMessage(v);
            } else {
                message = createLeftMessage(v);
            }

            const $board = $("#board");

            $board.append(message);
            $board.scrollTop(999999999);

        });
    };



    const createLeftMessage = (data) => {
        return `
            <div class="row">
                <div class="row-wrapper">
                    <img src="${data.photoURL}" class="left-image"/>
                    <p class="name">${data.displayName}</p>
                    <div class="left-message">
                        ${data.message}
                    </div>
                    <div class="left-time time">${data.time}</div>
                </div>
            </div>
        `;
    };

    const createRightMessage = (data) => {
        return `
            <div class="row">
                <div class="row-wrapper">
                    <div class="right-message">
                        ${data.message}
                    </div>
                    <div class="right-time time">${data.time}</div>
                </div>
            </div>
        `;
    };


});
