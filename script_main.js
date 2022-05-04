// WINDOW 관련 전역변수
let currentVH = window.innerHeight;

let nav = document.querySelector("nav");

// typed effect
let strIdx = 0;
let mapoArr = ["걷고 싶은 마포,", "놀고 싶은 마포,", "먹고 싶은 마포,"];

console.log(mapoArr[strIdx].split(""));
function generateStrArr() {
  if (strIdx > mapoArr.length - 1) {
    strIdx = 0;
  }
  console.log(mapoArr[strIdx].split(""));
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
    }, 1800);
  }
}

// 깜빡이
function blink() {
  document.querySelector(".type_effect_container").classList.toggle("active");
}

dynamic(generateStrArr());

setInterval(() => {
  blink();
}, 500);

// scrolltop event 출력
window.onscroll = () => {
  console.log(
    `현재 화면 높이: ${currentVH}, 현재 스크롤 위치: ${window.scrollY}, nav classname: ${nav.className}`
  );
  if (window.scrollY > currentVH - 100.0) {
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

// 메인 비디오 변경점에 따라 nav 투명화 처리

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

let places = document.querySelector(".places__list");

const jsonData = fetch("./mapojoy_data.json")
  .then((response) => response.json())
  .then((jsonData) => {
    setPlaces(jsonData.slice(0, 10));
  })
  .catch((error) => console.log(error));

function setPlaces(stores) {
  stores.forEach((obj) => {
    let div = document.createElement("div");
    // div.innerHttp = `${obj.id} - ${obj.name} - ${obj.type} - ${obj.addrs}<br/>`
    div.innerHTML = `${obj.name} - ${obj.type} - ${obj.address}<br/>`;
    div.className = "place__item";
    console.log(div);
    places.appendChild(div);
  });
}
