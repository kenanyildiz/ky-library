// IE Fix
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) { return i; }
        }
        return -1;
    };
}

// Array insert
if (!Array.prototype.insert) {
    Array.prototype.insert = function (index, item) {
        this.splice(index, 0, item);
    };
}

// String count
String.prototype.count=function(s1) {
    return (this.length - this.replace(new RegExp(s1,"g"), '').length) / s1.length;
};

// outerHtml plugin
jQuery.fn.outerHtml = function() {
    return $($('<div></div>').html(this.clone())).html();
};

// tr case changer

String.prototype.trLowerCase = function() {

    return this.replace(/([\wöçşğüıİ])/gi,
        function(a, b){
            return b.replace("I","ı").replace("İ","i").toLowerCase();
        }
    );
};

String.prototype.trUpperCase = function() {

    return this.replace(/([\wöçşğüıİ])/gi,
        function(a, b){
            return b.replace("ı","I").replace("i","İ").toUpperCase();
        }
    );
};

jQuery.fn.trLowerCase = function() {

    var c = $(this).val().trLowerCase();
    $(this).val(c);

    return c;
};

jQuery.fn.trUpperCase = function() {

    var c = $(this).val().trUpperCase();
    $(this).val(c);

    return c;
};

jQuery.fn.capitalize = function () {

    $.each(this, function () {

        var split = this.value.split(' ');

        for (var i = 0, len = split.length; i < len; i++) {
            split[i] = split[i].charAt(0).toUpperCase() + split[i].slice(1);
        }

        this.value = split.join(' ');
    });

    return this;

};

/**
 * @param(text,number,seperator);
 * return limiterText;
 **/
cl(characterLimiter("Satranç hayat gibidir David, demişti babası. Her parçanın kendi işlevi vardır. Bazıları zayıftır," +
" bazıları ise güçlü. Bazıları oyunun başında işe yarar, bazılarıysa sonunda. Ama kazanmak için hepsini kullanmak zorundasın." +
" Aynen hayatta olduğu gibi, satrançta da skor tutulmaz. On parçanı kaybedip, yine de kazanabilirsin oyunu. Satrancın güzelliği budur işte." +
" İşler her an tersine dönebilir. Kazanmak için yapman gereken tek şey tahtanın üzerindeki olası hamleleri ve " +
"anlamlarını iyi bilmek ve karşındakinin ne yapacağını kestirebilmek.", 120, ' ...'));

function characterLimiter(text, number, seperator) {
    var len = text.length;
    if(len > number){
        var lastStringNum   = (len - 20) < number ? len : (len - 20);
        var last20Character = text.substring(number,lastStringNum);
        var splitData       = last20Character.split(' ');
        var addedText       = splitData[0]+seperator;
        var mergedText      = text.substring(0,number) + addedText;
        return mergedText;
    } else {
        return text;
    }
}
