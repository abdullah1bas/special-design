import * as all from "./editor.js";

let backgroundOption = true;
let backgroundInterval;
let bulletsOption = true;
let scrollOption = true;

const previewImg = document.querySelector(".preview-img img");

// Check If There's Local Storage Color Option
let mainColors = localStorage.getItem("color_option");
let backgroundLocalItem = localStorage.getItem("background_option");
let bulletLocalItem = localStorage.getItem("bullet_option");
let scrollLocalItem = localStorage.getItem("scroll_option");

// const logoText = document.getElementById("logo-text");
// let count = 0;

// console.log(logoText.textContent.length);
// let xInterval = setInterval(() => {
//   if (count === logoText.textContent.length) {
//     count = 0;
//   }

//   logoText.style.width = `${count * 8}px`;
//   count++;
// }, 100);

if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  // Remove Active Class From All Colors List Item
  document.querySelectorAll(".colors-list li").forEach((e) => {
    e.classList.remove("active");

    // Add Active Class On Element With Data-Color === Local Storage Item
    if (e.dataset.color === mainColors) {
      // Add Active Class
      e.classList.add("active");
    }
  });
}

let randomBackground = document.querySelectorAll(".random-backgrounds span");
let rightBackground = document.querySelector(".fa-angle-right");
let leftBackground = document.querySelector(".fa-angle-left");

if (backgroundLocalItem !== null) {
  // console.log(backgroundLocalItem);
  // console.log(typeof backgroundLocalItem); // string , not boolean
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    handleYesNo(randomBackground, backgroundOption);
  } else {
    backgroundOption = false;
    handleYesNo(randomBackground, backgroundOption);
  }
}

// -------------------------------------------------------

// Switch Colors
let colorsLi = document.querySelectorAll(".colors-list li");

// Loop On All List Items
colorsLi.forEach((li) => {
  // Click On Every List Items
  li.addEventListener("click", (e) => {
    // Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);

    // Remove Active Class From All Childrens
    handleActiveEvent(e);
  });
});

// ---------------------------------------------

randomBackground.forEach(function (span) {
  span.addEventListener("click", (e) => {
    // Remove Active Class From All Childrens
    handleActiveEvent(e);

    localStorage.setItem("background_option", e.target.dataset.background);
    // if (e.target.classList[0] === "yes")
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      randomizeImgs();
      localStorage.setItem("background_option", false);
    }
  });
});
// -------------------------------------------------------

let ourSkills = document.querySelector(".skills");
let scroller = document.createElement("div");
scroller.className = "scroller position-fixed top-0 start-0";
scroller.style = `background-color: var(--main-color); height: 3px; z-index: 100000;`
document.body.prepend(scroller);

window.onscroll = () => {
  let allHeight = document.documentElement.scrollHeight; // da height bta3 al allBrowser
  let windowHeight = window.innerHeight; // 699

  // if (window.scrollY >= ourSkills.offsetTop) {
  //   let allSkills = document.querySelectorAll(".skill-progress span");

  //   allSkills.forEach((skill) => {
  //     skill.style.width = skill.dataset.progress;
  //   });
  // }

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

  let bulletsAll = document.querySelectorAll(".nav-bullets .bullet");
  if (sectionCondition(document.querySelector(".about-us"))) {
    generateBullet(bulletsAll ,bulletsAll[0]);
  } else if (sectionCondition(ourSkills)) {
    generateBullet(bulletsAll ,bulletsAll[1]);
    let allSkills = document.querySelectorAll(".skill-progress span");

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  } else if (sectionCondition(document.querySelector(".gallery"))) {
    generateBullet(bulletsAll ,bulletsAll[2]);
  } else if (sectionCondition(document.querySelector(".features"))) {
    generateBullet(bulletsAll ,bulletsAll[3]);
  } else if (sectionCondition(document.querySelector(".timeline"))) {
    generateBullet(bulletsAll ,bulletsAll[4]);
  } else if (sectionCondition(document.querySelector(".events"))) {
    generateBullet(bulletsAll ,bulletsAll[5]);
  } else if (sectionCondition(document.querySelector(".testimonials"))) {
    generateBullet(bulletsAll ,bulletsAll[6]);
  } else {
    document.querySelector(".nav-bullets").style.right = '-100px';
  }

};

function sectionCondition(section) {
  let condition = window.scrollY >= section.offsetTop &&
  window.scrollY <= (section.offsetTop + section.offsetHeight)
  return condition;
}

function generateBullet(bullets, bullet) {
  bullets.forEach(bull => {
    bull.classList.remove("active");
  })
  bullet.classList.add("active");
  document.querySelector(".nav-bullets").style.right = "0px";
};
// ------------------------------------------------------

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay Element
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.append(overlay);
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    let popupImage = document.createElement("img");
    popupImage.src = e.target.src;

    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);
    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      imgHeading.className = "image-heading";
      imgHeading.appendChild(imgText);
      popupBox.prepend(imgHeading);
    }

    // Create The CLose Button Span
    let closeButton = document.createElement("span");
    let closeButtonText = document.createTextNode("X");
    closeButton.appendChild(closeButtonText);
    closeButton.className = "close-button";
    popupBox.appendChild(closeButton);

    // Create The send Button Span
    let sendImg = document.createElement("a");
    let sendImgText = document.createTextNode("Edit Image");
    sendImg.className = "send-img";
    overlay.style = `width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); position: fixed; top: 0; left: 0; z-index: 1000; backdrop-filter: blur(5px);`;
    popupBox.style = `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 20px; background-color: #fff; border: 1px solid #ccc; z-index: 1001;`;
    closeButton.style = `position: absolute; top: -15px; right: -15px; color: white; background-color: var(--main-color); width: 40px; height: 40px; line-height: 40px; text-align: center; font-size: 20px; cursor: pointer; font-family: Arial, Tahoma; border-radius: 50%;`;
    popupImage.style = `max-width: 100%;`;
    sendImg.style = `display: inline-block; margin-top: 10px; padding: 10px; background-color: #eee; border-radius: 6px; cursor: pointer; color: var(--main-color); font-size: 20px; font-weight: bold; text-decoration: none;`;

    sendImg.appendChild(sendImgText);
    popupBox.appendChild(sendImg);

    sendImg.addEventListener("click", (e) => {
      document.querySelector(".editor-img").classList.remove("d-none");
      document.querySelector(".popup-overlay").remove();
      document.querySelector(".popup-box").remove();
      e.preventDefault();
      document
        .querySelector(".editor-img")
        .scrollIntoView({ behavior: "smooth" });

      previewImg.src = popupImage.src;
      previewImg.addEventListener("load", () => {
        // import data
        all.resetFilterBtn.click(); // clicking reset btn, so the filter value reset if the user select new img
        document.querySelector(".container-img").classList.remove("disable");
      });
    });
  });
});

// -------------------------------------------------------
// Select Landing Page Element
// let landingPage = document.querySelector(".landing-page");

// mmken be al tor2 de [Url, asm al img be imtdad, asm img 8er amtdad, mmken be loop genrate al num de]
// Get Array Of Imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
let counter = 0;
let bulletsBackground = document.querySelectorAll(".bullets-background li");

function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomNum = Math.floor(Math.random() * 5 + 1);
      // Change BackGround Image Url
      // hena ana kda bt7km fe al swar mn al html mesh mn js 3shan al url
      document.querySelector(
        ".landing-page"
      ).style.backgroundImage = `url("imgs/0${randomNum}.jpg")`;
      // Change Bullet Random
      bulletsBackground.forEach((li) => {
        li.classList.remove("active");
      });
      bulletsBackground.forEach((li) => {
        // 01.jpg
        if (li.dataset.change === `0${randomNum}.jpg`) {
          li.classList.add("active");
        }
      });
    }, 5000);
  } else {
    clearInterval(backgroundInterval);
  }
}
// randomizeImgs();

// console.log(counter)

leftBackground.onclick = function () {
  counter == 0 ? (counter = 4) : counter--;
  document.querySelector(
    ".landing-page"
  ).style.backgroundImage = `url("imgs/${imgsArray[counter]}")`;
  handleActiveDataChange(bulletsBackground);
};

rightBackground.onclick = function () {
  counter == 4 ? (counter = 0) : counter++;
  document.querySelector(
    ".landing-page"
  ).style.backgroundImage = `url("imgs/${imgsArray[counter]}")`;
  handleActiveDataChange(bulletsBackground);
};

function handleActiveDataChange(lis) {
  // Remove Active Class From All Childrens
  lis.forEach((li) => {
    li.classList.remove("active");
  });
  lis.forEach((li) => {
    if (li.dataset.change === `${imgsArray[counter]}`) {
      li.classList.add("active");
    }
  });
}
// -------------------------------------------------------

// Select All Bullets
// let allBullets = document.querySelectorAll(".nav-bullets li");

let allLinks = document.querySelectorAll(".links a");

scrollToSomewhere(allLinks);
createBullet(allLinks);

// da function by3mel bullets every add section
function createBullet(allLinks) {
  let navBullets = document.createElement("ul");
  // let allBullets =
  allLinks.forEach((link) => {
    let liBullet = document.createElement("li");
    let bullet = document.createElement("span");

    navBullets.className = "nav-bullets";
    bullet.className = "bullet";
    bullet.dataset.section = `${link.dataset.section}`;
    bullet.dataset.text = `${link.textContent}`;

    liBullet.appendChild(bullet);
    navBullets.appendChild(liBullet);

    navBullets.style = `position: fixed; top: 50%; right: -100px; transform: translateY(-50%); z-index: 1010; list-style: none; padding: 0; transition: .4s`;
    liBullet.style = `margin-bottom: 20px; position: relative;`;
    bullet.style = `display: flex; width: 20px; height: 20px; border: 3px solid var(--main-color); border-radius: 50%; margin: 0 20px 20px 0; cursor: pointer;`;
    
  });

  document.body.appendChild(navBullets);
  scrollToSomewhere(document.querySelectorAll(".nav-bullets li"));
}

function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      // hena b2a 3shan dol a fbtb3t le # , a7na m7tgeen nw2f al # event
      e.preventDefault();

      document
        .querySelector(e.target.dataset.section)
        // de properties gmela awe bt3mel scroll le al mkan 2le m3molo id{be al tree2a behavior}
        // da wa7da mn web API gmela awe
        .scrollIntoView({
          behavior: "smooth",
        });
    });
  });
}

let showBullets = document.querySelectorAll(".bullets-option span");

if (bulletLocalItem !== null) {
  if (bulletLocalItem === "true") {
    bulletLocalItem = true;
    handleYesNo(showBullets, bulletLocalItem);
    document.querySelector(".nav-bullets").style.display = "block";
  } else {
    bulletLocalItem = false;
    handleYesNo(showBullets, bulletLocalItem);
    document.querySelector(".nav-bullets").style.display = "none";
  }
}

showBullets.forEach(function (span) {
  span.addEventListener("click", (e) => {
    // Remove Active Class From All Childrens
    handleActiveEvent(e);

    localStorage.setItem("bullet_option", e.target.dataset.display);
    // if (e.target.classList[0] === "show")
    if (e.target.dataset.display === "show") {
      bulletsOption = true;
      localStorage.setItem("bullet_option", true);
      document.querySelector(".nav-bullets").style.display = "block";
    } else {
      bulletsOption = false;
      localStorage.setItem("bullet_option", false);
      document.querySelector(".nav-bullets").style.display = "none";
    }
  });
});

// -------------------------------------------------------------
let scrollNav = document.querySelectorAll(".scroll-option span");

if (scrollLocalItem !== null) {
  if (scrollLocalItem === "true") {
    scrollLocalItem = true;
    handleYesNo(scrollNav, scrollLocalItem);
    document.querySelector(
      ".header-area"
    ).style = `position: fixed; z-index: 1000; width: 100%; margin: auto; padding: 10px; color: #fff; background: #211e1e;`;
  } else {
    scrollLocalItem = false;
    handleYesNo(scrollNav, scrollLocalItem);
    document.querySelector(
      ".header-area"
    ).style = `position: relative; z-index: 1000; width: 100%; margin: auto; padding: 10px; color: #fff; background: none;`;
  }
}
scrollNav.forEach(function (span) {
  span.addEventListener("click", (e) => {
    handleActiveEvent(e);

    localStorage.setItem("scroll_option", e.target.dataset.scroll);

    if (e.target.dataset.scroll === "scroll") {
      bulletsOption = true;
      localStorage.setItem("scroll_option", true);
      document.querySelector(
        ".header-area"
      ).style = `position: fixed; z-index: 1000; width: 100%; margin: auto; padding: 10px; color: #fff; background: #211e1e;`;
    } else {
      bulletsOption = false;
      localStorage.setItem("scroll_option", false);
      document.querySelector(
        ".header-area"
      ).style = `position: relative; z-index: 1000; width: 100%; margin: auto; padding: 10px; color: #fff; background: none;`;
    }
  });
});

function handleYesNo(elements, bool) {
  elements.forEach((span) => {
    span.classList.remove("active");
    if (bool) {
      if (span.classList.contains("yes")) span.classList.add("active");
    } else {
      if (span.classList.contains("no")) span.classList.add("active");
    }
  });
}
// -------------------------------------------------------------

// Handle Active State
function handleActiveEvent(ev) {
  // Remove Active Class From All Childrens
  ev.target.parentElement.querySelectorAll(".active").forEach((e) => {
    e.classList.remove("active");
  });
  // Add Active Class On Self
  ev.target.classList.add("active");
}

// -------------------------------------------------------------
// hena lw mesh 3ayzeno my3mlsh reload
document.querySelector(".reset-options").onclick = function () {
  document.documentElement.style.setProperty("--main-color", "#ff9800");
  localStorage.setItem("color_option", "#ff9800");
  colorsLi.forEach((color) => {
    color.classList.remove("active");
    if (color.id === "reset") color.classList.add("active");
  });

  localStorage.setItem("background_option", "true");
  handleYesNo(randomBackground, true);
  randomizeImgs();

  localStorage.setItem("bullet_option", "true");
  handleYesNo(showBullets, true);
  document.querySelector(".nav-bullets").style.display = "block";

  localStorage.setItem("scroll_option", "false");
  handleYesNo(scrollNav, false);
  document.querySelector(
    ".header-area"
  ).style = `position: relative; z-index: 1000; width: 100%; margin: auto; padding: 10px; color: #fff; background: none;`;
};

// kda al browser hy3mel reload
// document.querySelector(".reset-options").onclick = function () {
//   // localTorage.clear()
//   localStorage.removeItem("background_option");
//   localStorage.removeItem("color_option");
//   localStorage.removeItem("bullet_option");

//   // Reload Window by3mel reload le al saf7a
//   window.location.reload();
// };

// -------------------------------------------------------------

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
// Setting Menu
let settingMenu = document.querySelector(".settings-box");
let iconMenu = document.querySelector(".icon-gear");
// Projects Menu
const templates = document.querySelector(".proj-temp");
const games = document.querySelector(".proj-game");

templates.onclick = function () {
  this.classList.toggle("open");
  toggleBtn.classList.remove("menu-active");
  tLinks.classList.remove("open");
  settingMenu.classList.remove("open");
  iconMenu.classList.remove("fa-spin");
  games.classList.remove("open");
};
games.onclick = function () {
  this.classList.toggle("open");
  toggleBtn.classList.remove("menu-active");
  tLinks.classList.remove("open");
  settingMenu.classList.remove("open");
  iconMenu.classList.remove("fa-spin");
  templates.classList.remove("open");
};

toggleBtn.onclick = function (e) {
  // de m3naha mtl3lesh ay 7aga lma ados 3la al toggleBtn mt3mlsh ay events
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
  settingMenu.classList.remove("open");
  iconMenu.classList.remove("fa-spin");
  templates.classList.remove("open");
  games.classList.remove("open");
};
// de b2a y3ne ay 7aga t3mlha mn al keyboad or mouse
document.onkeyup = function(e) {
  // console.log(e)// zorar 2le tost 3leh kol 7aga 3ano hngeeb mno key
  if(e.key === "Escape") {
    toggleBtn.classList.remove("menu-active");
    tLinks.classList.remove("open");
    settingMenu.classList.remove("open");
    iconMenu.classList.remove("fa-spin");
    templates.classList.remove("open");
    games.classList.remove("open");
  }
}
// StopPropagation
tLinks.onclick = function (e) {
  e.stopPropagation();
};

iconMenu.onclick = function () {
  this.classList.toggle("fa-spin");
  // Toggle Class Open On Main Settings Box
  settingMenu.classList.toggle("open");
  tLinks.classList.remove("open");
  toggleBtn.classList.remove("menu-active");
  templates.classList.remove("open");
  games.classList.remove("open");
};
settingMenu.onclick = function (e) {
  e.stopPropagation();
};

// -------------------------------------------------------
// Click Global Anywhere Outside Setting Box and Toggle Menu
document.addEventListener("click", function (e) {
  // console.log(e.target);

  // Close Menu homa mesh hygbole ay 7aga 3shan al propagation in condition
  if (e.target !== toggleBtn && e.target !== tLinks) {
    // hnshofha mfto7a or no
    if (tLinks.classList.contains("open")) {
      tLinks.classList.toggle("open");
      toggleBtn.classList.toggle("menu-active");
    }
  }

  // -------------------------------------------------------
  // Toggle Spin Class On Icon
  if (
    e.target !== settingMenu &&
    e.target !== iconMenu &&
    !e.target.classList.contains("toggle-menu")
  ) {
    if (settingMenu.classList.contains("open")) {
      settingMenu.classList.toggle("open");
      iconMenu.classList.toggle("fa-spin");
    }
  }
  // -------------------------------------------------------
  // Close Popup
  if (
    (e.target.classList.contains("close-button") ||
      e.target.classList.contains("popup-overlay")) &&
    !e.target.classList.contains("popup-box")
  ) {
    document.querySelector(".popup-overlay").remove();
    document.querySelector(".popup-box").remove();
  }

  // -------------------------------------------------------
});

// -------------------------------------------------------


// Function Of Moment()
(function(){
  // amakn zhoor al counter
  let countDate = document.querySelectorAll(".time .unit .num");

  // hena al date 2le h2f 3ando
  let countDownDate = moment("2023-05-17 00:00:00");

  let x = setInterval(function () {
    // the date now
    let now = moment();
    // countDownDate.diff(now) de y3ne hatle far2 ben countDownDate we now
    let distance = moment.duration(countDownDate.diff(now));
    // console.log(now.format())
    // console.log(distance.months(), distance.days(), distance.hours(), distance.minutes(), distance.seconds());
    // عرض النتيجة بتنسيق الأيام والساعات والدقائق
    if (countDownDate.isAfter(now)) {
      countDate[0].textContent =
        distance.days() < 10 ? `0${distance.days()}` : distance.days();
      countDate[1].textContent =
        distance.hours() < 10 ? `0${distance.hours()}` : distance.hours();
      countDate[2].textContent =
        distance.minutes() < 10 ? `0${distance.minutes()}` : distance.minutes();
      countDate[3].textContent =
        distance.seconds() < 10 ? `0${distance.seconds()}` : distance.seconds();
    } else {
      clearInterval(x);
      // إيقاف العد التنازلي عندما يصل إلى التاريخ الهدف
      // if (distance.asSeconds() >= 0) {
      //   console.log(distance.seconds())
      // }
    }
  }, 1000);
}); // ()

// Function Of Date() , if do func ()
(function() {
  let countDate = document.querySelectorAll(".time .unit .num");
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24,
    month = day * 30,
    year = day * 365;


  const x = setInterval(function () {
    const countDown = new Date('2023-12-31 23:59:59');
    const now = new Date().getTime();
    const distance = countDown - now;

    // mn al a5er al 7aga 2le 3ayznha bngbha mn al ba2e mn 2le feha ex(3ayzeen sec bngeeb ba2e al min)
    // ba2e al min dh b2a bn2smo 3la sec 3shan ytl3lna kam sec atb2a ft3ml al wa2t kda
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
    }
  }, 1000);
})();

// -------------------------------------------------------

setTimeout(() => {
  document.querySelector(".loader-container").style.display = 'none';
}, 1500);

