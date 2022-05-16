// WINDOW 관련 전역변수
let currentVH = window.innerHeight;

let nav = document.querySelector("nav");

// typed effect
let strIdx = 0;
let mapoArr = ["걷고 싶은 마포,", "먹고 싶은 마포,", "놀고 싶은 마포,"];

function generateStrArr() {
  if (strIdx > mapoArr.length - 1) {
    strIdx = 0;
  }
  return mapoArr[strIdx].split("");
}

// 한 글자씩 텍스트 출력하는 함수
function dynamic(strArr) {
  let target = document.querySelector(".type_effect_container");
  if (strArr.length > 0) {
    target.textContent += strArr.shift(); // 앞에서부터 한 글자씩 빼낸다
    setTimeout(() => {
      dynamic(strArr);
    }, 200);
  } else {
    setTimeout(() => {
      reverseDynamic(mapoArr[strIdx]);
    }, 2000);
  }
}

function reverseDynamic(str) {
  let target = document.querySelector(".type_effect_container");
  if (str.length > 0) {
    target.textContent = str.slice(0, -1);
    setTimeout(() => {
      reverseDynamic(target.textContent);
    }, 120);
  } else {
    setTimeout(() => {
      strIdx++;
      dynamic(generateStrArr());
    }, 1500);
  }
}

// 깜빡이
function blink() {
  document.querySelector(".type_effect_container").classList.toggle("active");
}

// arrow down 이벤트리스너
let arrowDown = document.querySelector(".arrow_down");
arrowDown.addEventListener("click", () => {
  document.querySelector("#mapo_walks").scrollIntoView({
    behavior: "smooth",
  });
  // window.scrollTo(0, currentVH - 80 + 1);
});

// navigation event
let menus = document.querySelectorAll(".menu_list");
menus[0].addEventListener("click", () => {
  document.querySelector("#mapo_walks").scrollIntoView({
    behavior: "smooth",
  });
});
menus[1].addEventListener("click", () => {
  document.querySelector("#mapo_map").scrollIntoView({
    behavior: "smooth",
  });
});
menus[2].addEventListener("click", () => {
  document.querySelector("#mapo_play").scrollIntoView({
    behavior: "smooth",
  });
});

setTimeout(() => {
  dynamic(generateStrArr());
}, 1100);

setInterval(() => {
  blink();
}, 500);

// scrolltop event 출력
window.onscroll = () => {
  if (window.scrollY > currentVH - 80.0) {
    nav.className = "__visible";
    nav.style.pointerEvents = "all";
  } else {
    nav.className = "";
    nav.style.pointerEvents = "none";
  }
};

window.onresize = () => {
  currentVH = window.innerHeight;
};

function scrollToMap() {
  document.querySelector(".icons_container").scrollIntoView({
    behavior: "smooth",
  });
}

// ============================  걷고싶은마포  =============================

let slideIdx = 1;
showSlides(slideIdx);

function moveSlides(n) {
  showSlides((slideIdx += n));
}

function currentSlide(n) {
  showSlides((slideIdx = n));
}

function showSlides(n) {
  let i;
  let slides = document.querySelectorAll(".road");
  let dots = document.querySelectorAll(".dot");

  if (n > slides.length) {
    slideIdx = 1;
  }
  if (n < 1) {
    slideIdx = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIdx - 1].style.display = "block";
  dots[slideIdx - 1].className += " active";
}

// ===================================================================

const MAPOGU_OFFICE_LAT = 37.56626061717293;
const MAPOGU_OFFICE_LNG = 126.90198620741052;

// kakao map
let container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
let options = {
  //지도를 생성할 때 필요한 기본 옵션
  center: new kakao.maps.LatLng(MAPOGU_OFFICE_LAT, MAPOGU_OFFICE_LNG), //지도의 중심좌표.
  level: 3, //지도의 레벨(확대, 축소 정도)
};

let map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

function setLocation(lat, lng) {
  let newLocation = new kakao.maps.LatLng(lat, lng);
  map.setCenter(newLocation);
}

function smoothScrollTo(lat, lng) {
  let newLocation = new kakao.maps.LatLng(lat, lng);
  map.panTo(newLocation);
}

// places 에 리스트 추가
// JSON 파싱해서 리스트로 넣어놓기
let placesList = document.querySelector(".places__list");
let offset = 10;
let currentPage = 1;

const jsonData = fetch("./mapojoy_data.json")
  .then((response) => response.json())
  .then((jsonData) => {
    setPlaces(jsonData.slice(0, 10));
  })
  .catch((error) => console.log(error));

function printList() {
  let page = jsonData.slice((currentPage - 1) * offset, currentPage * offset);
  let coords = page.forEach((v) => {});
}

function setPlaces(stores) {
  stores.forEach((obj) => {
    let div = document.createElement("div");
    // div.innerHttp = `${obj.id} - ${obj.name} - ${obj.type} - ${obj.addrs}<br/>`
    div.innerHTML = `${obj.name} - ${obj.type} - ${obj.address}<br/>`;
    div.className = "place__item";
    placesList.appendChild(div);
  });
}

function setMarkers(stores) {}
