var letters = Array.from(document.querySelectorAll('.letter--outline'));
var lettersContainer = document.querySelector('.letters');
var longestPath = 200; //Math.ceil(letters.reduce((x, y) => x > y.getTotalLength() ? x : y.getTotalLength(), 0));
var getScrollPercent = function () { return ((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100); };
var toggleOutline = function (e) {
    e.classList.remove('letter--fill');
    e.classList.add('letter--outline');
};
var toggleFill = function (e) {
    e.classList.add('letter--fill');
    e.classList.remove('letter--outline');
};
var scaleUpLetters = function (e) {
    e.classList.add('letters--scaled');
};
var scaleDownLetters = function (e) {
    e.classList.remove('letters--scaled');
};
document.addEventListener('scroll', function () {
    var scrollPercent = ((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100);
    if (scrollPercent > 97) {
        letters.forEach(toggleFill);
        scaleDownLetters(lettersContainer);
        return;
    }
    letters.forEach(function (l) { return (l.classList.contains('letter--fill')) ? toggleOutline(l) : null; });
    lettersContainer.classList.contains('letters--scaled') ? null : scaleUpLetters(lettersContainer);
    var offset = scrollPercent * (longestPath / 100);
    letters.forEach(function (l) { return l.style.strokeDashoffset = (longestPath - offset).toString(); });
});
var init = function () {
    letters.forEach(function (l) { return l.style.strokeDashoffset = longestPath.toString(); });
    letters.forEach(function (l) { return l.style.strokeDasharray = longestPath.toString(); });
};
init();
