var letters = Array.from(document.querySelectorAll('.letter--outline'));
var lettersContainer = document.querySelector('.letters');
var longestSvgPathLength = Math.ceil(letters.map(function (x) { return x.getTotalLength(); }).sort(function (a, b) { return b - a; })[1]);
var fuzz = 20;
var longestPath = longestSvgPathLength + fuzz;
var enableDrawingInProgress = function (e) {
    e.classList.remove('letter--fill');
    e.classList.add('letter--outline');
};
var enableDrawingComplete = function (e) {
    e.classList.remove('letter--outline');
    e.classList.add('letter--fill');
};
var scaleUpLetters = function (e) { return e.classList.add('letters--scaled-up'); };
var scaleDownLetters = function (e) { return e.classList.remove('letters--scaled-up'); };
document.addEventListener('scroll', function () {
    var scrollPercent = ((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100);
    // Close enough to bottom, turn fill on and stop drawing.
    if (scrollPercent > 97) {
        letters.forEach(enableDrawingComplete);
        scaleDownLetters(lettersContainer);
        return;
    }
    // If scrolling from bottom to top, need to make sure we're scaling up again
    if (!lettersContainer.classList.contains('letters--scaled-up')) {
        scaleUpLetters(lettersContainer);
    }
    // If scrolling from bottom to top, need to make sure we turn on outline and turn off fill.
    letters.forEach(function (l) { return (l.classList.contains('letter--fill')) ? enableDrawingInProgress(l) : null; });
    // Update SVG Stoke Dash Offset to 'draw'
    var offset = scrollPercent * (longestPath / 100);
    letters.forEach(function (l) { return l.style.strokeDashoffset = (longestPath - offset).toString(); });
});
var init = function () {
    // Auto set svg styles based on longest svg path so everything lines up.
    letters.forEach(function (l) { return l.style.strokeDashoffset = longestPath.toString(); });
    letters.forEach(function (l) { return l.style.strokeDasharray = longestPath.toString(); });
};
init();
