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
  document.querySelector("#main_video").scrollIntoView({
    behavior: "smooth",
  });
});
menus[1].addEventListener("click", () => {
  document.querySelector("#mapo_walks").scrollIntoView({
    behavior: "smooth",
  });
});
menus[2].addEventListener("click", () => {
  document.querySelector("#mapo_map").scrollIntoView({
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

// ============================  지도  =============================

const MAPOGU_OFFICE_LAT = 37.56626061717293;
const MAPOGU_OFFICE_LNG = 126.90198620741052;

// kakao map
let container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
let options = {
  //지도를 생성할 때 필요한 기본 옵션
  center: new kakao.maps.LatLng(MAPOGU_OFFICE_LAT, MAPOGU_OFFICE_LNG), //지도의 중심좌표.
  // draggable: false, // 마우스 휠 드래그 막기
  level: 5, //지도의 레벨(확대, 축소 정도)
};

let map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

/**
 * 지도로 이동하는 부분
 */
let searchIcons = document.querySelector(".icons_container");
searchIcons.addEventListener("click", () => {
  document.querySelector(".food_map_area").scrollIntoView({
    behavior: "smooth",
  });
});

function setLocation(lat, lng) {
  let newLocation = new kakao.maps.LatLng(lat, lng);
  map.setCenter(newLocation);
}

function smoothScrollTo(lat, lng) {
  let newLocation = new kakao.maps.LatLng(lat, lng);
  map.panTo(newLocation);
}

/**
 * places 에 리스트 추가
 * JSON 파싱해서 리스트로 넣어놓기
 */
let placesList = document.querySelector(".places__list");
let markers = [];
let offset = 10;
let currentPage = 1;

const jsonData = fetch("./mapojoy_data.json")
  .then((response) => response.json())
  .then((jsonData) => {
    let slicedArr = jsonData.slice(0, 10);
    setupPages(jsonData);
    setPlaces(slicedArr);
    setMarkersAll(slicedArr);
  })
  .catch((error) => console.log(error));

/**
 * pagination
 */
function setupPages(data) {
  let totalPage = Math.round(data.length / 10);
  let aList = [];

  for (let i = 0; i < 10; i++) {
    let aTag = document.createElement("a");

    aTag.className = "test_page";
    aTag.innerText = i + 1;
    aTag.onclick = () => {
      currentPage = i;
      offset = currentPage * 10;
      let slicedArr =
        i < totalPage - 1
          ? data.slice(offset, offset + 10)
          : data.slice(offset);
      console.log("slicedArr:", slicedArr);

      refreshPlacesList();
      setPlaces(slicedArr);
      setMarkersAll(slicedArr);
    };

    pageBar.appendChild(aTag);
    aList.push(aTag);
  }
}

// 초기화
let refreshPlacesList = () => {
  while (placesList.firstChild) {
    placesList.removeChild(placesList.firstChild);
  }
};

// page bar
let pageBar = document.querySelector(".pages");
// -----------------------------

function setPlaces(stores) {
  stores.forEach((obj) => {
    let div = document.createElement("div");
    // div.innerHttp = `${obj.id} - ${obj.name} - ${obj.type} - ${obj.addrs}<br/>`
    div.innerHTML = `${obj.name} - ${obj.type} - ${obj.address}<br/>`;
    div.className = "place__item";
    placesList.appendChild(div);
  });
}

function setMarkersAll(stores) {
  let areas = [];
  let bounds = new kakao.maps.LatLngBounds();
  hideMarkers();

  // 마커를 표시할 위치와 title 객체 배열입니다
  for (let i = 0; i < stores.length; i++) {
    let tempObj = {
      title: stores[i].name,
      latlng: new kakao.maps.LatLng(stores[i].cy, stores[i].cx),
    };
    areas.push(tempObj);
  }

  // 마커 이미지의 이미지 주소입니다
  let imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

  for (let i = 0; i < areas.length; i++) {
    // 마커 이미지의 이미지 크기 입니다
    let imageSize = new kakao.maps.Size(24, 35);

    // 마커 이미지를 생성합니다
    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    // 마커를 생성합니다
    let marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: areas[i].latlng, // 마커를 표시할 위치
      title: areas[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      image: markerImage, // 마커 이미지
    });

    marker.setMap(map);
    markers.push(marker);
    // bounds 추가
    bounds.extend(areas[i].latlng);
  }

  // bounds done
  map.setBounds(bounds);
}

function hideMarkers() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

function showMarkers() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}
