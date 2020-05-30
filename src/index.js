import "./styles/main.scss";
const languages = require("./assets/js/languages.js");

var language;
alert = function (text, type) {
  document.querySelector(".alert").classList.add("alert--show");
  document.querySelector(".shadow").classList.add("shadow--show");

  let iconPath;
  if (type == "Fail") iconPath = "url('/assets/img/failed-sms.png')";
  else if (type == "Success") iconPath = "url('/assets/img/checked.png')";
  else if ((type = "Wait")) iconPath = "url('/assets/img/hourglass.png')";

  document.querySelector(".alert__image").style.backgroundImage = iconPath;
  document.querySelector(".alert__text").innerHTML = text;
};

//Welcome screen animation start on image load
let welcomeScreenImage = new Image();
welcomeScreenImage.src = "/assets/img/welcome-right.png";
welcomeScreenImage.onload = function () {
  document
    .querySelector(".welcome-screen__right-section")
    .classList.add("welcome-screen--animate");
};

function getOffsetTop(elem) {
  var offsetTop = 0;
  do {
    if (!isNaN(elem.offsetTop)) {
      offsetTop += elem.offsetTop;
    }
  } while ((elem = elem.offsetParent));
  return offsetTop;
}

//Skill circle animation start detection
document.addEventListener("scroll", function () {
  let elementsToWatch = document.querySelectorAll(
    ".my-skills__circle__animation"
  );

  if (
    window.pageYOffset >=
    getOffsetTop(elementsToWatch[0]) - (window.innerHeight / 9) * 8
  ) {
    elementsToWatch[0].classList.add("my-skills__progress-90");
  }
  if (
    window.pageYOffset >=
    getOffsetTop(elementsToWatch[1]) - (window.innerHeight / 9) * 8
  ) {
    elementsToWatch[1].classList.add("my-skills__progress-80");
  }
  if (
    window.pageYOffset >=
    getOffsetTop(elementsToWatch[2]) - (window.innerHeight / 9) * 8
  ) {
    elementsToWatch[2].classList.add("my-skills__progress-75");
  }
  if (
    window.pageYOffset >=
    getOffsetTop(elementsToWatch[3]) - (window.innerHeight / 9) * 8
  ) {
    elementsToWatch[3].classList.add("my-skills__progress-60");
  }
});

document.querySelector(".menu__button").addEventListener("click", function () {
  document.querySelector("navi").classList.toggle("open");
  document.querySelector(".menu__button i").classList.toggle("fa-times");
  document.querySelector(".menu__button i").classList.toggle("fa-bars");
});

document.querySelector(".alert__exit").addEventListener("click", function () {
  document.querySelector(".alert").classList.remove("alert--show");
  document.querySelector(".shadow").classList.remove("shadow--show");
});

//Animate scroll to sections
let easeInOutQuad = function (t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

function scrollToAnimate(to, duration) {
  var start = document.documentElement.scrollTop,
    change = to - start,
    currentTime = 0,
    increment = 20;

  var animateScroll = function () {
    currentTime += increment;
    let val = easeInOutQuad(currentTime, start, change, duration);
    window.scrollTo(0, val);
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };
  animateScroll();
}

const anchors = document.querySelectorAll('a[href^="#"]');
for (const anchor of anchors) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector("navi").classList.remove("open");
    document.querySelector(".menu__button i").classList.remove("fa-times");
    document.querySelector(".menu__button i").classList.add("fa-bars");
    scrollToAnimate(
      getOffsetTop(document.querySelector(this.getAttribute("href"))),
      500
    );
  });
}

function changeLanguage(lan) {
  console.log(lan);
  //Removing active language class
  document
    .querySelector(".menu__language-change")
    .children[0].classList.remove("menu__choosen");
  document
    .querySelector(".menu__language-change")
    .children[1].classList.remove("menu__choosen");

  //Adding activa language class to proper language
  if (lan.language == "pl")
    document
      .querySelector(".menu__language-change")
      .children[0].classList.add("menu__choosen");
  else if (lan.language == "en")
    document
      .querySelector(".menu__language-change")
      .children[1].classList.add("menu__choosen");

  document.querySelector(".welcome-screen__main-title").innerHTML = lan.title;
  document.querySelector(".welcome-screen__my-work").innerHTML = lan.myWork;
  document.querySelector(".about__text").innerHTML =
    "<h1> Lorem ipsum </h1>" + lan.aboutMe;
  document.querySelector(".my-skills__title").children.innerHTML = lan.skills;
  document.querySelector(".langauges-title").children.innerHTML =
    lan.languagesTitle;
  document.querySelector(".languages-content").innerHTML = lan.languagesContent;
  document.querySelector(".projects__title").children.innerHTML =
    lan.projectsTitle;
  document.querySelector(".projects__content").innerHTML = lan.projectsContent;
  document.querySelector(".contact__title").children.innerHTML =
    lan.contactTitle;
  document.querySelector(".languages-content").innerHTML = lan.languagesContent;
  $("input[name='name']").attr("placeholder", lan.contactName);
  $('textarea[name="text"]').attr("placeholder", lan.contactMessage);
  $('input[type="submit"]').attr("value", lan.contactSend);
  document.querySelector("#MyBehance").innerHTML = lan.contactBehance;
  document.querySelector("navi a[href='#about']").children.innerHTML =
    lan.menuAbout;
  document.querySelector("navi a[href='#my-skills']").children.innerHTML =
    lan.skills;
  document.querySelector("navi a[href='#projects']").children.innerHTML =
    lan.projectsTitle;
  document.querySelector("navi a[href='#contact']").children.innerHTML =
    lan.contactTitle;
}

document.onload = function () {
  if (navigator.language == "pl") changeLanguage(languages.pl);
  else changeLanguage(languages.en);
};

const languageButtons = document.querySelectorAll(
  ".menu__language-change span"
);

for (const button of languageButtons) {
  button.addEventListener("click", function (e) {
    document.querySelector(".menu__button").click();
    if (e.target.innerHTML == "EN") changeLanguage(languages.en);
    else if (e.target.innerHTML == "PL") changeLanguage(languages.pl);
  });
}
