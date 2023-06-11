const numbers = document.querySelectorAll(".stats .number");
const statsSection = document.getElementById("stats");
const skillsSection = document.getElementById("our-skills");
const skillRateSpan = document.querySelectorAll(".our-skills h3 .rate");
const skillWidthSpan = document.querySelectorAll(
  ".our-skills .the-progress span"
);
let startStats = false;
let startSkills = false;

let scroller = document.createElement("div");
// dol m3a al bootstrap
// scroller.className = "scroller position-fixed top-0 start-0";
// scroller.style = `background-color: var(--main-color); height: 3px; z-index: 100000;`;

scroller.className = "scroller";
scroller.style = `position: fixed; top: 0; left: 0; background-color: var(--main-color); height: 3px; z-index: 100000;`;
document.body.prepend(scroller);

window.onscroll = function () {
  let allHeight = document.documentElement.scrollHeight; // height of browser
  let windowHeight = window.innerHeight; // 699

  if (window.scrollY >= statsSection.offsetTop) {
    if (!startStats) {
      numbers.forEach((num) => startCountStats(num));
      startStats = true;
    }
  }
  if (window.scrollY >= skillsSection.offsetTop - 250) {
    if (!startSkills) {
      skillRateSpan.forEach((span) => startCountSkills(span));
      startSkills = true;
    }
    skillWidthSpan.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  }
  if (window.scrollY >= windowHeight) {
    document.querySelector(".go-up i").style.display = "block";
    document.querySelector(".go-up i").onclick = function () {
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth",
      });
    };
  } else {
    document.querySelector(".go-up i").style.display = "none";
  }

  let height = allHeight - windowHeight;
  scroller.style.width = `${(window.scrollY / height) * 100}%`;
};

function startCountSkills(el) {
  let rate = el.dataset.rate;
  let count = setInterval(() => {
    el.textContent++;
    if (el.textContent == rate) {
      clearInterval(count);
      el.textContent = el.textContent + "%";
    }
  }, 2000 / rate);
}
function startCountStats(el) {
  let goal = el.dataset.goal;
  let count = setInterval(() => {
    el.textContent++;
    if (el.textContent == goal) clearInterval(count);
  }, 2000 / goal);
}

// Function Of Date() , if do func ()
(function() {
  let countDate = document.querySelectorAll(".time .unit .num");
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24,
    // month = day * 30,
    year = day * 365;
    const countDown = new Date('2023-12-31 23:59:59');

  const x = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDown - now;

    // const restDay = Math.floor((distance % month) / day),
    const restDay = Math.floor((distance % year) / day),
      restHour = Math.floor((distance % day) / hour),
      restMinute = Math.floor((distance % hour) / minute),
      restSecond = Math.floor((distance % minute) / second);

    if (distance > 0) {
      countDate[0].textContent = restDay < 10 ? `0${restDay}` : restDay;
      countDate[1].textContent = restHour < 10 ? `0${restHour}` : restHour;
      countDate[2].textContent =
        restMinute < 10 ? `0${restMinute}` : restMinute;
      countDate[3].textContent =
        restSecond < 10 ? `0${restSecond}` : restSecond;
    } else {
      clearInterval(x);
    }
  }, 1000);
})();

//ما شاء الله شرح جميل جزاك الله عنا خير الجزاء, ويحشرك مع الصديفين والشهداء والصالحين
