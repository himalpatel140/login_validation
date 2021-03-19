const UserController = {
    list: [],
    activeUser: {

    },
    Auth: {
        login: function() {
            let username = $("#username").val();
            let password = $('#password').val();
            let filteredUsers = UserController.list.filter(function(each) {
                if (each.username == username && each.password == password) {
                    return true;
                }
            });
            let result = filteredUsers.map(function(each) {
                each.password = null;
                return each;
            })
            console.log(result);
            if (result.length > 0) {
                UserController.activeUser = result[0];
                location.href = "file:///D:/Javascript%20Practice/UserAuth/home.html";
                localStorage.setItem('activeUser', JSON.stringify(result[0]));
                console.log("login called");
            }

        },
        signup: function() {
            let user = UserController.getObj();
            UserController.list.push(user);
            let UserList = UserController.list;
            localStorage.setItem('Data', JSON.stringify(UserList));
            console.log(JSON.parse(JSON.stringify(UserList)));
        },
        logout: function() {
            localStorage.removeItem("activeUser");
            console.log('logout called');
        },
    },
    getRandomUserName: function() {
        let randomStr = Math.random().toString(36).substring(0);
        return Common.getAlphabets(randomStr);

    },
    isValid: function() {
        let original_list = Object.keys(user);

        let result = Object.keys(user).filter(function(each) {
            if (user[each]) {
                return true;
            }
        });

        if (original_list.length == result.length) {
            return true;
        }

        return false;
    },
    getObj: function() {
        let fullName = $('#fullname').val();
        let userName = $('#uname').val();
        let passWord = $('#password').val();

        return {
            fullname: fullName,
            username: userName,
            password: passWord

        }

    },

};

function init() {
    let data = localStorage.getItem('Data');
    let activeUser = localStorage.getItem('activeUser');
    UserController.list = data ? JSON.parse(data) : [];
    UserController.activeUser = activeUser ? JSON.parse(activeUser) : [];
}

init();

function onlyAuth(redirect = false, redirectUrl = "file:///D:/Javascript%20Practice/UserAuth/login.html") {
    let user = localStorage.getItem("activeUser");

    if (user) {
        return true;
    } else {
        if (redirect) {
            location.href = redirectUrl
        }
        return false;
    }
};

function userUpdate(replaceTo) {
    key = UserController.activeUser.username;
    console.log("Key is " + key);
    let result = JSON.parse(localStorage.getItem('Data')).map(function(each) {
        if (each.username == key) {
            each['username'] = replaceTo;
            UserController.activeUser = each;
            localStorage.setItem('activeUser', JSON.stringify(each));
        }
        console.log(each);
        return each;
    })
    console.log("result" + JSON.stringify(result));
    localStorage.setItem('Data', JSON.stringify(result));
    return result;
};

// function getUrl(target, openInNewTab) {

//     if (target && openInNewTab) {
//         let popup = open(target, "hello", "width=400,height=400")
//     }

//     if (target) {
//         location.href = target;
//     }

//     return location.href;

// }