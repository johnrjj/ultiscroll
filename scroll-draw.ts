const letters: SVGPathElement[] = Array.from(document.querySelectorAll('.letter--outline') as NodeListOf<SVGPathElement>);
const lettersContainer: SVGElement = document.querySelector('.letters') as SVGElement;
const longestSvgPathLength: number = Math.ceil(letters.map(x => x.getTotalLength()).sort((a, b) => b - a)[1]);
const fuzz: number = 20;
const longestPath = longestSvgPathLength + fuzz;

const enableDrawingInProgress = (e: SVGPathElement) => {
  e.classList.remove('letter--fill');
  e.classList.add('letter--outline');
};

const enableDrawingComplete = (e: SVGPathElement) => {
  e.classList.remove('letter--outline');
  e.classList.add('letter--fill');
};

const scaleUpLetters = (e: Element) => e.classList.add('letters--scaled-up');
const scaleDownLetters = (e: Element) => e.classList.remove('letters--scaled-up');

document.addEventListener('scroll', () => {
  const scrollPercent: number = ((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100);

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
  letters.forEach(l => (l.classList.contains('letter--fill')) ? enableDrawingInProgress(l) : null);

  // Update SVG Stoke Dash Offset to 'draw'
  const offset: number = scrollPercent * (longestPath / 100);
  letters.forEach(l => l.style.strokeDashoffset = (longestPath - offset).toString());
});

const init = () => {
  // Auto set svg styles based on longest svg path so everything lines up.
  letters.forEach(l => l.style.strokeDashoffset = longestPath.toString());
  letters.forEach(l => l.style.strokeDasharray = longestPath.toString());
}

init();