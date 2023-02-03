$(document).ready(function () {
  calendarInit();
});

function calendarInit() {
  // 날짜 정보 가져오기
  let date = new Date(); // 현재 날짜(로컬 기준) 가져오기
  let utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000; // uct 표준시 도출
  let kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
  let today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)

  let thisMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  // 달력에서 표기하는 날짜 객체

  let currentYear = thisMonth.getFullYear(); // 달력에서 표기하는 연
  let currentMonth = thisMonth.getMonth(); // 달력에서 표기하는 월
  let currentDate = thisMonth.getDate(); // 달력에서 표기하는 일

  // kst 기준 현재시간
  // console.log(thisMonth);

  // 캘린더 렌더링
  renderCalender(thisMonth);

  function renderCalender(thisMonth) {
    // 렌더링을 위한 데이터 정리
    currentYear = thisMonth.getFullYear();
    currentMonth = thisMonth.getMonth();
    currentDate = thisMonth.getDate();

    // 이전 달의 마지막 날 날짜와 요일 구하기
    let startDay = new Date(currentYear, currentMonth, 0);
    let prevDate = startDay.getDate();
    let prevDay = startDay.getDay();

    // 이번 달의 마지막날 날짜와 요일 구하기
    let endDay = new Date(currentYear, currentMonth + 1, 0);
    let nextDate = endDay.getDate();
    let nextDay = endDay.getDay();

    // console.log(prevDate, prevDay, nextDate, nextDay);

    // 현재 월 표기
    $(".year-month").text(currentYear + "." + (currentMonth + 1));

    // 렌더링 html 요소 생성
    calendar = document.querySelector(".dates");
    calendar.innerHTML = "";

    // 지난달
    for (let i = prevDate - prevDay + 1; i <= prevDate; i++) {
      calendar.innerHTML =
        calendar.innerHTML + '<div class="day prev disable">' + i + "</div>";
    }
    // 이번달
    for (let i = 1; i <= nextDate; i++) {
      calendar.innerHTML =
        calendar.innerHTML + '<div class="day current">' + i + "</div>";
    }
    // 다음달
    for (let i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
      calendar.innerHTML =
        calendar.innerHTML + '<div class="day next disable">' + i + "</div>";
    }

    // 오늘 날짜 표기
    if (today.getMonth() == currentMonth) {
      todayDate = today.getDate();
      let currentMonthDate = document.querySelectorAll(".dates .current");
      currentMonthDate[todayDate - 1].classList.add("today");
    }
  }

  // 이전달로 이동
  $(".go-prev").on("click", function () {
    thisMonth = new Date(currentYear, currentMonth - 1, 1);
    renderCalender(thisMonth);
  });

  // 다음달로 이동
  $(".go-next").on("click", function () {
    thisMonth = new Date(currentYear, currentMonth + 1, 1);
    renderCalender(thisMonth);
  });

  // 시간
  let hour = today.getHours();
  let min = today.getMinutes();
  if (hour > 12) {
    hour -= 12;
  }

  $(".day_time").text(
    currentYear +
      "." +
      currentMonth +
      "." +
      currentDate +
      " " +
      hour +
      ":" +
      min
  );
}
function timeclock() {
  let today = new Date();

  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let day = ("0" + today.getDate()).slice(-2);
  let hour = ("0" + today.getHours()).slice(-2);
  let min = ("0" + today.getMinutes()).slice(-2);
  let apm = "am";

  if (hour >= 12) {
    apm = "pm";
  }
  if (hour > 12) {
    hour -= 12;
  }
  $(".day_now").text(year + "." + month + "." + day);
  $(".time_now").text(apm + " " + hour + ":" + min);
}
timeclock();
setInterval(timeclock, 1000);

const getJSON = function (url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function () {
    const status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

getJSON(
  "http://api.openweathermap.org/data/2.5/weather?q=seoul&appid=05352a2d3a0f40a26d90ac7bf2590a40&units=metric", // appid 에 자기 키값 쓰기
  function (err, data) {
    if (err !== null) {
      $(".js-weather").text(" " + err);
    } else {
      $(".js-weather").text(Math.round(data.main.temp) + " °C");
      /*alert(`현재
      온도는 ${data.main.temp}°
      풍속은 ${data.wind.speed}m/s
      습도는 ${data.main.humidity}%
입니다.
오늘의
      최고기온은 ${data.main.temp_max}°
      최저기온은 ${data.main.temp_min}°
입니다.`);*/
    }
  }
);

$(function () {
  let imgW = $(".news_slides").children("img").width();
  let imgNum = $(".news_slides").children("img").length;
  // $(".slide").width(imgW * imgNum);
  // let num = 0;
  // 이동목표 증가변수 선언( -600 * 0, -600 * 1, -600 * 2,-600 * 3)

  function slideMove() {
    $(".news_slides").animate({ left: -imgW }, 330, function () {
      $(".news_slides").find("img").eq(0).appendTo($(".news_slides"));
      $(".news_slides").css("left", 0);
    });
  }
  // let timer = setInterval(slideMove, 3000);

  $(".next").on("click", function (event) {
    event.preventDefault();
    // clearInterval(timer);
    slideMove();
    // timer = setInterval(slideMove, 3000);
  });
  $(".prev").on("click", function (event) {
    event.preventDefault();
    // clearInterval(timer);
    $(".news_slides")
      .find("img")
      .eq(imgNum - 1)
      .prependTo($(".news_slides"));
    $(".news_slides").css("left", -imgW);
    $(".news_slides").animate({ left: 0 }, 330);
    // timer = setInterval(slideMove, 3000);
  });

  $(".family_site_ul").hide();
  $(".family_site_click").on("click", function () {
    $(".family_site_ul").toggle();
  });
});
