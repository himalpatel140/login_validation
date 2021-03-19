$(document).ready(function() {

    $('#uname,#submit').attr('disabled', "true");

    function checkSelectFields() {
        let fieldVal = true;
        $('#fullname,#confirm_password,#password').each(function() {
            if ($(this).val() == '') {
                fieldVal = false;
            }
        });
        return fieldVal;
    };


    $('#fullname').keyup(function() {
        $('#uname').val(UserController.getRandomUserName());
    });

    $('#password_btn').click(function() {
        $('#password').attr("type", "text");

        setTimeout(() => {
            $('#password').attr("type", "password");
        }, 1000 * 3);

    });

    $('#submit').click(function() {
        $(this).attr('disabled', 'true');
        UserController.Auth.signup();
        $('#password,#fullname,#confirm_password,#uname').val('');

    });

    $('#login').click(function() {
        UserController.Auth.login();
        console.log('Login success');
    });

    $("#confirm_password").keyup(function() {
        var password = $("#password").val();
        $("#checkPasswordMatch").html(password == $(this).val() ? "Passwords match." : "Passwords do not match!");
        if (password == $(this).val()) {
            $('#submit').removeAttr('disabled');
        }
    });
    $('#logout').click(function() {
        // console.log("do you want to log out");
        UserController.activeUser;
        let result = confirm("do you want to log out");
        if (result) {
            location.href = "file:///D:/Javascript%20Practice/UserAuth/index.html";
            UserController.Auth.logout();
        }

    });
    $('#edit_username').click(function() {
        let updatedVal = prompt("Change Your Value Here");
        console.log(updatedVal);
        userUpdate(updatedVal);
    });

    $('#username').keyup(function() {
        let userVal = $(this).val();
        let filteredList = JSON.parse(localStorage.getItem('Data')).filter(function(each) {
            if (each.username.includes(userVal)) {
                return true;
            }

        });

        // ?
        var index = 0;
        var selectUser = '';
        let buttons = filteredList.map(function(each, index) {

            index = index + 1;
            selectUser = `<button data-button-id="${index}" data-button-value="${each.username}" class="button_cool">${each.username}</button>`;

            return selectUser;

        });
        // Why Join?
        // -->  because our data is in array and we need to convert it to string in order to display it in text
        // Fix Blank buttons 
        // --> i believe we didn't gave </button> tag earlier in #75
        $(".suggestion-container").html(buttons.join(""));

        $(document).on("click", ".button_cool", (event) => {
            let buttonSelector = event.target;
            let user_val = $(buttonSelector).data("button-value");
            console.log(user_val);
            $('#username').val(user_val);
        });


    });





    // -------------------------------------------------------------------------------------

    MyBank = {
        balance: 0,

        add: (amount) => {
            MyBank.balance += amount;
            localStorage.setItem('Bal', MyBank.balance);

        },

        reduce: (amount) => {
            MyBank.balance -= amount;
            localStorage.setItem('Bal', MyBank.balance - amount);
        },

        init: function() {
            if (localStorage.getItem('Bal')) {
                MyBank.balance = localStorage.getItem('Bal');
            }
        }
    };

    MyBank.init();


});