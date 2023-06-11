const alertBtn = document.querySelector(".alert-btn"),
  lightOne = document.querySelector(".login-light"),
  lightTwo = document.querySelector(".login-light2"),
  buttonLogin = document.querySelector(".button-login"),
  lock = document.querySelector(".input-box .lock"),
  toggle = document.querySelector(".toggle"),
  emailInput = document.getElementById("email"),
  passwordInput = document.getElementById("password"),
  requirementEmail = document.querySelectorAll(".requirement-email li"),
  requirementPass = document.querySelectorAll(".requirement-password li"),
  inputCheck = document.querySelector(".input-check");

inputCheck.onclick = function(e) {
  if(e.target.checked) {
    document.querySelector(".login-shadow").style.top = '0'
    document.querySelector(".toggle .text.off").style = 'top: 76px; opacity: 0;'
    document.querySelector(".toggle .text.on").style = 'top: 76px; opacity: 1; color: var(--main-color) !important; text-shadow: 0 0 15px var(--main-color), 0 0 30px var(--main-color), 0 0 45px var(--main-color), 0 0 60px var(--main-color);'
  } else {
    document.querySelector(".login-shadow").style.top = '-100%' 
    document.querySelector(".toggle .text.off").style = 'opacity: 1;'
    document.querySelector(".toggle .text.on").style = 'opacity: 0;'
  }

}

lightOne.onclick = function (e) {
  document.documentElement.style.setProperty(
    "--main-color",
    e.target.dataset.color
  );
  toggle.classList.add("Blue");
  toggle.classList.remove("Green");
};
lightTwo.onclick = function (e) {
  document.documentElement.style.setProperty(
    "--main-color",
    e.target.dataset.color
  );
  toggle.classList.add("Green");
  toggle.classList.remove("Blue");
};
lock.addEventListener("click", (e) => {
  if (e.target.name === "lock-closed") {
    e.target.name = "lock-open";
    document.getElementById("password").type = "text";
  } else {
    e.target.name = "lock-closed";
    document.getElementById("password").type = "password";
  }
});

let validPassWord;
let validEmail;

emailInput.addEventListener("keyup", (e) => {
  if (/\w*@gmail.com/g.test(e.target.value)) {
    requirementEmail[1].firstElementChild.className = "fa-solid fa-check";
    requirementEmail.forEach((li) => {
      li.style.display = "none !important";
      li.classList.remove("valid");
    });
    requirementEmail[1].classList.add("valid");
    requirementEmail[1].classList.add("enter");
    validEmail = true;
  } else {
    requirementEmail[1].classList.remove("valid");
    requirementEmail[0].classList.add("valid");
    requirementEmail[0].firstElementChild.className = "fa-solid fa-circle";
    validEmail = false;
  }
});
var progress = document.querySelector(".prog");
passwordInput.addEventListener("keyup", (e) => {
  if (
    /[A-Z]/.test(e.target.value) &&
    /[^A-Za-z0-9]/.test(e.target.value) &&
    /[a-z]/.test(e.target.value) &&
    /[0-9]/.test(e.target.value) &&
    /.{8,}/.test(e.target.value)
  ) {
    requirementPass[1].firstElementChild.className = "fa-solid fa-check";
    requirementPass.forEach((li) => {
      li.style.display = "none !important";
      li.classList.remove("valid");
    });
    requirementPass[1].classList.add("valid");
    requirementPass[1].classList.add("enter");
    validPassWord = true;
  } else {
    requirementPass[1].classList.remove("valid");
    requirementPass[0].classList.add("valid");
    requirementPass[0].firstElementChild.className = "fa-solid fa-circle";
    validPassWord = false;
  }
  // console.log(e.target.value.length)
  if(((e.target.value.length * 100) / 8) <= 100) progress.style.width = `${(e.target.value.length * 100) / 8}%`;
  // console.log()
});


let clickCount = 0;
buttonLogin.onclick = function (e) {
  if (!validEmail || !validPassWord) e.preventDefault();

  handleClick();
};

function handleClick() {
  clickCount++;
  if (clickCount === 2) {
    showMessage("من فضلك بعد اذنك ادخل البيانات كما موضح بالشروط" , 5);
  } else if (clickCount === 5) {
    showMessage("يا استاذ بعد اذنك مش عايز غباء نفذ الشروط كما موضح تحت الحقول", 8);
  } else if (clickCount === 8) {
    showMessage("بقولك ايه فكك من الحوار ده هيفيدك بأيه لما تدخل شوف انت رايح فين", 10);
    clickCount= 7;
  }
}
function showMessage(message , time) {
  const messageContainer = document.createElement("div");
  messageContainer.className = "mess-cont";
  const messageElement = document.createElement("p");
  messageElement.className = "mess-one";
  const alertBtn = document.createElement("div");
  alertBtn.appendChild(document.createTextNode("Ok"));
  alertBtn.className = `btn rounded-pill d-block fs-5 fw-bold m-auto mt-4 mb-2 text-black-50 alert-btn`;
  messageContainer.style = `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: black; padding: 10px; width: 500px; height: 200px; display: flex; align-items: center; justify-content: center; flex-direction: column; border-radius: 6px;`;
  messageElement.style = `color: white; font-size: 20px;`;
  messageElement.appendChild(document.createTextNode(message));
  messageContainer.appendChild(messageElement);
  messageContainer.appendChild(alertBtn);

  alertBtn.onclick = function (e) {
    e.target.parentElement.classList.add("d-none");
  };

  document.body.appendChild(messageContainer);
  setTimeout(function () {
    messageContainer.classList.add("d-none");
  }, time * 1000);
}

document.querySelector(".message-login").onclick = function(e) {
  e.stopPropagation();
  alertBtn.onclick = function (e) {
    e.target.parentElement.parentElement.classList.add("d-none");
  };
}
document.addEventListener("click", e => {
  if (!e.target.classList.contains("message-login")) document.querySelector(".alert-login").classList.add("d-none");
})


setTimeout(function () {
  // let alertLogin = document.createElement("div");
  document.querySelector(".alert-login").classList.add("d-none");
}, 30000);