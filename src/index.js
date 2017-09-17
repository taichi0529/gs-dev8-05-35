import './index.css';
import * as $ from "jquery";
import * as firebase from "firebase";

$(() => {
    const userNameKey = "gs08-05-username";
    const defaultUserName = localStorage.getItem(userNameKey);
    if(defaultUserName){
        $("#username").val(defaultUserName);
    }


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

    

    const newPostRef = firebase.database().ref();

    $("#text").on("keydown", (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            const username = $("#username").val();

            localStorage.setItem(userNameKey, username);

            newPostRef.push({
                username: username,
                text: $("#text").val(),
                time: (new Date()).getTime()
            });
            $("#text").val("");
        }
    });

    newPostRef.on("child_added", (data) => {
        const v = data.val();
        // const k = data.key;
        const name = $("#username").val();
        let message = "";
        let d = new Date();
        let time = "";
        if(v.time){
            d.setTime(v.time);
            time = ("0" + d.getHours()).substr(-2) + ":"  + ("0" + d.getMinutes()).substr(-2);
        }
        if (name === v.username) {
            message = createRightMessage(v.username, v.text, time);
        } else {
            message = createLeftMessage(v.username, v.text, time);
        }

        const $board = $("#board");

        $board.append(message);
        $board.scrollTop(999999999);

    });

    const createLeftMessage = (username, message, time) => {
        return `
            <div class="row">
                <div class="row-wrapper">
                    <img src="images/icon01.png" class="left-image"/>
                    <p class="name">${username}</p>
                    <div class="left-message">
                        ${message}
                    </div>
                    <div class="left-time time">${time}</div>
                </div>
            </div>
        `;
    };

    const createRightMessage = (username, message, time) => {
        return `
            <div class="row">
                <div class="row-wrapper">
                    <div class="right-message">
                        ${message}
                    </div>
                    <div class="right-time time">${time}</div>
                </div>
            </div>
        `;
    };


});
