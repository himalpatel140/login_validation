let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", '.'];
var Common = {
    getAlphabets: function(str) {
        result = str.split('').filter(function(each) {
            if (!numbers.includes(each)) {
                return true;
            }
        })
        return result.join('');
    },
};