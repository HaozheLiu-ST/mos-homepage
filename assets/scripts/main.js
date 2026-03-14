//* ======================== Slide Control ===================== */
var contents = document.getElementsByClassName("slide-content");
var slideMenu = document.getElementById("slide-menu");

if (slideMenu) {
  slideMenu.addEventListener("click", function(e) {
    const idx = [...this.children]
      .filter(el => el.className.indexOf('dot') > -1)
      .indexOf(e.target);
      
    if (idx >= 0) {
      var prev = document.querySelector(".dot.active");
      if (prev) prev.classList.remove("active");
      e.target.classList.add("active");
      
      for (var i = 0; i < contents.length; i++) {
        if (i == idx) {
          contents[i].style.display = "block";
        } else {
          contents[i].style.display = "none";
        }
      }  
    }
  });
}

//* ======================== Video Control ===================== */
function ToggleVideo(x) {
  var videos = document.getElementsByClassName(x + '-video');
  for (var i = 0; i < videos.length; i++) {
      if (videos[i].paused) {
          videos[i].play();
      } else {
          videos[i].pause();
      }
  }
};


function SlowVideo(x) {
  var videos = document.getElementsByClassName(x + '-video');
  for (var i = 0; i < videos.length; i++) {
    videos[i].playbackRate = videos[i].playbackRate * 0.9;
    videos[i].play();
  }
  
  var msg = document.getElementById(x + '-msg');
  msg.innerHTML = 'Speed: ' + '×' + videos[0].playbackRate.toFixed(2);

  msg.classList.add("fade-in-out");
  msg.style.animation = 'none';
  msg.offsetHeight; /* trigger reflow */
  msg.style.animation = null; };


function FastVideo(x) {
  var videos = document.getElementsByClassName(x + '-video');
  for (var i = 0; i < videos.length; i++) {
    videos[i].playbackRate = videos[i].playbackRate / 0.9;
    videos[i].play();
  }

  var msg = document.getElementById(x + '-msg');
  msg.innerHTML = 'Speed: ' + '×' + videos[0].playbackRate.toFixed(2);

  msg.classList.add("fade-in-out");
  msg.style.animation = 'none';
  msg.offsetHeight; /* trigger reflow */
  msg.style.animation = null; 
};

function RestartVideo(x) {
  var videos = document.getElementsByClassName(x + '-video');
  for (var i = 0; i < videos.length; i++) {
    videos[i].pause();
    videos[i].playbackRate = 1.0;
    videos[i].currentTime = 0;
    videos[i].play();
  }
  
  var msg = document.getElementById(x + '-msg');
  msg.innerHTML = 'Speed: ' + '×' + videos[0].playbackRate.toFixed(2);

  msg.classList.add("fade-in-out");
  msg.style.animation = 'none';
  msg.offsetHeight; /* trigger reflow */
  msg.style.animation = null; 
};

//* ======================== Slide Show Control ===================== */
const slider = document.querySelector('.container .slider');
const [btnLeft, btnRight] = ['prev_btn', 'next_btn'].map(id => document.getElementById(id));
let interval;

// Set positions
const setPositions = () => 
    [...slider.children].forEach((item, i) => 
        item.style.left = `${(i-1) * 440}px`);

// Set transition speed
const setTransitionSpeed = (speed) => {
    [...slider.children].forEach(item => 
        item.style.transitionDuration = speed);
};

// Slide functions
const next = (isAuto = false) => { 
    setTransitionSpeed(isAuto ? '1.5s' : '0.2s');
    slider.appendChild(slider.firstElementChild); 
    setPositions(); 
};

const prev = () => { 
    setTransitionSpeed('0.2s');
    slider.prepend(slider.lastElementChild); 
    setPositions(); 
};

// Auto slide
const startAuto = () => interval = interval || setInterval(() => next(true), 2000);
const stopAuto = () => { clearInterval(interval); interval = null; };

if (slider && btnLeft && btnRight) {
  setPositions();

  // Event listeners
  btnRight.addEventListener('click', () => next(false));
  btnLeft.addEventListener('click', prev);

  // Mouse hover controls
  [slider, btnLeft, btnRight].forEach(el => {
      el.addEventListener('mouseover', stopAuto);
      el.addEventListener('mouseout', startAuto);
  });

  // Start auto slide
  startAuto();
}

//* ======================== Prompt Compare Tabs ===================== */
document.addEventListener('DOMContentLoaded', function () {
  const showcases = Array.from(document.querySelectorAll('.vis-compare-showcase'));

  if (!showcases.length) return;

  showcases.forEach(function (showcase) {
    const tabs = Array.from(showcase.querySelectorAll('.vis-compare-tab'));
    const panels = Array.from(showcase.querySelectorAll('.vis-compare-panel'));

    if (!tabs.length || !panels.length) return;

    const activatePanel = function (targetId) {
      tabs.forEach(function (tab) {
        tab.classList.toggle('active', tab.dataset.target === targetId);
      });

      panels.forEach(function (panel) {
        panel.classList.toggle('active', panel.id === targetId);
      });
    };

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activatePanel(tab.dataset.target);
      });
    });
  });
});
