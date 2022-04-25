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
let hotPlaces = [
  {
    id: 0,
    name: "백미향1",
    type: "중식",
    mainMenu: "짜장면",
    addrs: "서울특별시 마포구 성지길 27 디엠아이빌딩 1층",
    telephone: "312-8253",
    website: "http://place.map.daum.net/15678895",
  },
  {
    id: 1,
    name: "백미향2",
    type: "중식",
    mainMenu: "짜장면",
    addrs: "서울특별시 마포구 성지길 27 디엠아이빌딩 1층",
    telephone: "312-8253",
    website: "http://place.map.daum.net/15678895",
  },
  {
    id: 2,
    name: "백미향3",
    type: "중식",
    mainMenu: "짜장면",
    addrs: "서울특별시 마포구 성지길 27 디엠아이빌딩 1층",
    telephone: "312-8253",
    website: "http://place.map.daum.net/15678895",
  },
];
let places = document.querySelector(".places");
hotPlaces.forEach((obj) => {
  let div = document.createElement("div");
  div.innerHTML = `${obj.id} - ${obj.name} - ${obj.type} - ${obj.addrs}<bt/>`;
  places.appendChild(div);
});

// let food = {
//   id: 0,
//   name: "백미향",
//   type: "중식",
//   mainMenu: "짜장면",
//   addrs: "서울특별시 마포구 성지길 27 디엠아이빌딩 1층",
//   telephone: "312-8253",
//   website: "http://place.map.daum.net/15678895",
// };
