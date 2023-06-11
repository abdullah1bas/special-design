const fileInput = document.querySelector(".file-input"),
  filterOptions = document.querySelectorAll(".filter button"),
  filterName = document.querySelector(".filter-info .name"),
  filterValue = document.querySelector(".filter-info .value"),
  filterSlider = document.querySelector(".slider input"),
  rotateOptions = document.querySelectorAll(".rotate button"),
  previewImg = document.querySelector(".preview-img img"),
  resetFilterBtn = document.querySelector(".reset-filter"),
  chooseImgBtn = document.querySelector(".choose-img"),
  saveImgBtn = document.querySelector(".save-img");

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const applyFilters = () => {
  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
};

const loadImage = () => {
  let file = fileInput.files[0]; // 7tena al mlf 2le at7ml fe variable
  if (!file) return; // no img load no continue
  previewImg.src = URL.createObjectURL(file); // kda at7t src img fe al browser
  previewImg.addEventListener("load", () => {
    resetFilterBtn.click(); // awl mt7ml al img dosle autoClick 3la resetFilterBtn
    document.querySelector(".container-img").classList.remove("disable");
  });
};

filterOptions.forEach((option) => {
  option.addEventListener("click", () => {
    // adding click event listener to all filter buttons
    document.querySelector(".filter .active").classList.remove("active");
    option.classList.add("active");
    filterName.innerText = option.innerText;

    if (option.id === "brightness") {
      filterSlider.max = "200";
      filterSlider.value = brightness;
      filterValue.innerText = `${brightness}%`;
    } else if (option.id === "saturation") {
      filterSlider.max = "200";
      filterSlider.value = saturation;
      filterValue.innerText = `${saturation}%`;
    } else if (option.id === "inversion") {
      filterSlider.max = "100";
      filterSlider.value = inversion;
      filterValue.innerText = `${inversion}%`;
    } else {
      filterSlider.max = "100";
      filterSlider.value = grayscale;
      filterValue.innerText = `${grayscale}%`;
    }
  });
});

const updateFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`;
  const selectedFilter = document.querySelector(".filter .active"); // getting selected filter btn

  if (selectedFilter.id === "brightness") {
    brightness = filterSlider.value;
  } else if (selectedFilter.id === "saturation") {
    saturation = filterSlider.value;
  } else if (selectedFilter.id === "inversion") {
    inversion = filterSlider.value;
  } else {
    grayscale = filterSlider.value;
  }
  // de hena 3shan ba3d m5ls inputValue yt7t variable 3la tool
  applyFilters();
};

rotateOptions.forEach((option) => {
  option.addEventListener("click", () => {
    // adding click event listener to all rotate/flip buttons
    if (option.id === "left") {
      rotate -= 90; // if clicked btn is left rotate, decrement rotate value by -90
    } else if (option.id === "right") {
      rotate += 90; // if clicked btn is right rotate, increment rotate value by +90
    } else if (option.id === "horizontal") {
      // if flipHorizontal value is 1, set this value to 1- else set 1
      flipHorizontal = flipHorizontal === 1 ? -1 : 1;
    } else {
      // if flipVertical value is 1, set this value to 1- else
      flipVertical = flipVertical === 1 ? -1 : 1;
    }
    applyFilters();
  });
});

const resetFilter = () => {
    // resetting all variable value to its default value
    brightness = 100; saturation = 100; inversion =0; grayscale = 0;
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterOptions[0].click(); // de b2a y3ne awl mt3ml reset doos 3la button 3shan yrg3 default value bta3 input
    applyFilters();
}

const saveImage = () => {
  const canvas = document.createElement("canvas"); // creating canvas element
  // 3mlna 2omasha(context) hn3mel 3leha nos5a mn al img 2le at7mlt 3shan nnzlha 3la ghazna 3shan js mesh da3m 2nna n3mel t7mel
  const ctx = canvas.getContext("2d"); 
  // hena a7na 5lena width bta3 al canvas = 3ard al img 2le at7ml be al 5asya de btgeeb al width al 7a2e2e ll img
  canvas.width = previewImg.naturalWidth; 
  canvas.height = previewImg.naturalHeight; 

  // hena 7tena al aply 2le kol shwaya kan byt8yr 3la al context
  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  
  ctx.translate(canvas.width / 2, canvas.height / 2);// hena da 3shan canvas bn7oto fe al nos be nos width and height
  if(rotate !== 0) {// de b2a 3amlya 7sabya 3shan al n3mel rotate le al 2omasha gwa al canvas de y3ne 3.14
    ctx.rotate((rotate * Math.PI) / 180);
  }
  ctx.scale(flipHorizontal, flipVertical); // flip canvas, horizontally / vertically
  // drawImage(img 2le hna5od mnha nos5a, al bo3d X , bo3d Y , width , height) de al rasma 2le hn3melha
  // we kol al awsaf 2le gwa de bta3t al 2omasha context 2le gwa canvas
  ctx.drawImage(previewImg, -canvas.width / 2 , -canvas.height / 2, canvas.width, canvas.height);
  // document.body.appendChild(canvas);
  
  const link = document.createElement("a"); // creating <a> element
  link.download = "image.jpg"; // passing <a> tag download value to "image jpg"
  link.href = canvas.toDataURL (); // passing <a> tag href value to canvas data url
  link.click(); // clicking <a> tag so the image download
}

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());

// console.log(90 * (Math.PI / 180));  // 1.5707963267948966
// console.log(180 * (Math.PI / 180)); // 3.141592653589793
// console.log(270 * (Math.PI / 180)); // 4.71238898038469
// console.log(360 * (Math.PI / 180)); // 6.283185307179586
