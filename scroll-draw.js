const letters = Array.from(document.querySelectorAll('.letter--outline'));
const lettersContainer = document.querySelector('.letters');
const longestPath = 200; //Math.ceil(letters.reduce((x, y) => x > y.getTotalLength() ? x : y.getTotalLength(), 0));
const getScrollPercent = () => ((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100);
const toggleOutline = (e) => {
    e.classList.remove('letter--fill');
    e.classList.add('letter--outline');
};
const toggleFill = (e) => {
    e.classList.add('letter--fill');
    e.classList.remove('letter--outline');
};
const scaleUpLetters = (e) => {
    e.classList.add('letters--scaled');
};
const scaleDownLetters = (e) => {
    e.classList.remove('letters--scaled');
};
document.addEventListener('scroll', () => {
    const scrollPercent = ((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100);
    if (scrollPercent > 99) {
        letters.forEach(toggleFill);
        scaleDownLetters(lettersContainer);
        return;
    }
    letters.forEach(l => (l.classList.contains('letter--fill')) ? toggleOutline(l) : null);
    lettersContainer.classList.contains('letters--scaled') ? null : scaleUpLetters(lettersContainer);
    const offset = scrollPercent * (longestPath / 100);
    letters.forEach(l => l.style.strokeDashoffset = (longestPath - offset).toString());
});
const init = () => {
    letters.forEach(l => l.style.strokeDashoffset = longestPath.toString());
    letters.forEach(l => l.style.strokeDasharray = longestPath.toString());
};
init();
