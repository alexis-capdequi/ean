$(document).on('ready', function () {
    $(document).on('click', 'button', function () {
        var code = $('input[type=text]').val();
        
        if (!validateCode(code)) {
            return alert("Votre code n'est pas valide.");
        }
        showKey(code);
    });
});

function validateCode (code) {
    var length = code.length;
    
    if (length !== 12) {
        return false;
    }
    
    for(var i=0; i<length; i++) {
        var number = parseInt(code[i]);
        
        if (!$.isNumeric(number) || number < 0 || number > 9) {
            return false;
        }
    }
    
    return true;
}

function getKey (code) {
    var sum = 0;
    var count = code.length;
    
    for (var i=0; i<count; i+=2) {
        var n = parseInt(code[i]);
        sum += n;
    }
    
    for (var j=1; j<count; j+=2) {
        var n = parseInt(code[j]);
        sum += code[j] * 3;
    }
    
    var key = (sum % 10);
    if (key !== 0) {
        key = 10 - key;
    }
    
    return key;
}

function showKey (code) {
    var key = getKey(code);
    
    $('.result span').empty().text(key);
    
    if($('.result').is(':hidden')) {
        $('.arrow').fadeIn(200);
        $('.result').fadeIn(200);
    }
}