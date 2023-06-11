let imgHeight = document.querySelector(".img");
let img = document.getElementById("img");
let upload = document.getElementById("upload");
let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");
let opacity = document.getElementById("opacity");
let invert = document.getElementById("invert");
let dropShadow = document.getElementById("drop-shadow");
let dropShow = document.querySelector(".dropShow");
let horizonatalShadow = document.getElementById("horizonatal-shadow");
let verticalShadow = document.getElementById("vertical-shadow");
let blurShadow = document.getElementById("blur-shadow");
let colorShadow = document.getElementById("color-shadow");
let imgFrame = document.getElementsByClassName(".imgFrame");
let reset = document.querySelector(".reset");
let imgBox = document.querySelector(".img-box");
let show = document.querySelector(".show");
let rotate = document.getElementById("rotate");
let download = document.getElementById("download");

let format = "png";
let rotateDeg = 0,
  flipHorizontal = 1,
  flipVertical = 1;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

window.onload = () => {
  download.style.display = "none";
  reset.style.display = "none";
  imgBox.style.display = "none";
  canvas.style.display = "none";
  dropShadow.checked
    ? (dropShow.style.display = "flex")
    : (dropShow.style.display = "none");
};

upload.onchange = () => {
  resetValue();
  download.style.display = "block";
  reset.style.display = "block";
  imgBox.style.display = "block";
  show.style.display = "none";
  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = () => {
    img.src = file.result;
  };

  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
};

let rotates = document.querySelectorAll(".filters ul .rotate .options button");
rotates.forEach((option) => {
  option.addEventListener("click", () => {
    if (option.id === "left") {
      rotateDeg -= 90;
    } else if (option.id === "right") {
      rotateDeg += 90;
    } else if (option.id === "horizontal") {
      flipHorizontal = flipHorizontal === 1 ? -1 : 1;
    } else {
      flipHorizontal = flipHorizontal === -1 ? 1 : -1;
    }
    previewImg();
    ctx.drawImage(img, -canvas.width / 2 , -canvas.height / 2, canvas.width, canvas.height);
  });
});

let styles = document.querySelectorAll("ul .styles label");
styles.forEach((style) => {
  style.addEventListener("click", (e) => {
    // console.log(e.target.getAttribute("for"))
    document.querySelectorAll("ul .range input").forEach((ele) => {
      ele.classList.remove("active");
    });
    document.getElementById(`${e.target.getAttribute("for")}`).className =
      "active";
  });
});

let stylesShadow = document.querySelectorAll("ul .styles-dropShow label");
stylesShadow.forEach((style) => {
  style.addEventListener("click", (e) => {
    // console.log(e.target.getAttribute("for"))
    document.querySelectorAll("ul .range-dropShow input").forEach((ele) => {
      // ele.target.classList.add("active");
      ele.classList.remove("active");
    });
    document.getElementById(`${e.target.getAttribute("for")}`).className =
      "active";
  });
});

let filters = document.querySelectorAll("ul li input");
filters.forEach((filter) => {
  filter.addEventListener("input", (e) => {
    previewImg();

    ctx.drawImage(img, -canvas.width / 2 , -canvas.height / 2, canvas.width, canvas.height);

    colorShadow.style.setProperty("background", `${colorShadow.value}`);
    if (e.target.className === "imgFrame") {
      format = `${e.target.id}`;
    }
    // console.log(ctx.filter);
    // console.log(`saturate(${saturate.value}`);
  });
});

reset.onclick = function () {
  resetValue();
  resetCtx();
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
  document.getElementById("jpeg").checked
    ? document.getElementById("png").click()
    : document.getElementById("jpeg").click();
};

download.onclick = function () {
  format === "webp"
    ? (download.href = canvas.toDataURL("image/webp"))
    : format === "svg+xml"
    ? (download.href = canvas.toDataURL("image/svg+xml"))
    : format === "gif"
    ? (download.href = canvas.toDataURL("image/gif"))
    : format === "jpeg"
    ? (download.href = canvas.toDataURL("image/jpeg"))
    : (download.href = canvas.toDataURL("image/png"));
};

function resetDropShadow() {
  horizonatalShadow.value = "0";
  verticalShadow.value = "0";
  blurShadow.value = "0";
  colorShadow.value = "#ffffff";
}

function resetValue() {
  img.style.filter = "none", saturate.value = "1", contrast.value = "1", brightness.value = "1",
  sepia.value = "0", grayscale.value = "0", blur.value = "0", hueRotate.value = "0",
  opacity.value = "1", invert.value = "0", horizonatalShadow.value = "0", verticalShadow.value = "0",
  blurShadow.value = "0", colorShadow.value = "black", format = "png", rotateDeg = 0,
  flipHorizontal = 1, flipVertical = 1;
}

function resetCtx() {
  ctx.filter = `
    saturate(${saturate.value})
    contrast(${contrast.value})
    brightness(${brightness.value})
    sepia(${sepia.value})
    grayscale(${grayscale.value})
    blur(${blur.value}px)
    hue-rotate(${hueRotate.value}deg)
    opacity(${opacity.value})
    invert(${invert.value})
    drop-shadow(${horizonatalShadow.value}px ${verticalShadow.value}px ${blurShadow.value}px ${colorShadow.value})
    `;

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

dropShadow.onclick = function () {
  if (dropShadow.checked) {
    dropShow.style.display = "flex";
    horizonatalShadow.value = "2";
    verticalShadow.value = "4";
    blurShadow.value = "6";
    colorShadow.value = "black";
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  } else {
    dropShow.style.display = "none";
    resetDropShadow();
    ctx.drawImage(img, -canvas.width / 2 , -canvas.height / 2, canvas.width, canvas.height);
  }
};

function previewImg() {
  img.style.filter = `
  saturate(${saturate.value})
  contrast(${contrast.value})
  brightness(${brightness.value})
  sepia(${sepia.value})
  grayscale(${grayscale.value})
  blur(${blur.value}px)
  hue-rotate(${hueRotate.value}deg)
  opacity(${opacity.value})
  invert(${invert.value})
  drop-shadow(${horizonatalShadow.value}px ${verticalShadow.value}px ${blurShadow.value}px ${colorShadow.value})
  `;
  img.style.transform = `rotate(${rotateDeg}deg) scale(${flipHorizontal}, ${flipVertical})`;

  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  ctx.filter = `
    saturate(${saturate.value})
    contrast(${contrast.value})
    brightness(${brightness.value})
    sepia(${sepia.value})
    grayscale(${grayscale.value})
    blur(${blur.value}px)
    hue-rotate(${hueRotate.value}deg)
    opacity(${opacity.value})
    invert(${invert.value})
    drop-shadow(${horizonatalShadow.value}px ${verticalShadow.value}px ${blurShadow.value}px ${colorShadow.value})
    `;
  ctx.translate(canvas.width / 2, canvas.height / 2); 
  if (rotateDeg !== 0) {
    ctx.rotate((rotateDeg * Math.PI) / 180);
  }
  ctx.scale(flipHorizontal, flipVertical); 
}
