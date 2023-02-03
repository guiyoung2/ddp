$(function () {
  $(".family_site_ul").hide();
  $(".family_site_click").on("click", function () {
    $(".family_site_ul").toggle();
  });

  $(".gnb_main_menu>ul>li>a").on("click", function () {
    //$('.sub').hide();
    //$(this).next().show();
    if ($(this).next().css("display") == "none") {
      //클릭한 개체 뒤 sub이 보여지고 있지 않다면
      $(".sub:visible").slideUp();
      //.sub개체들 중 보여지고 있는 상태인 개체는 slideUp을 실행하고
      $(this).next().slideDown();
      //클릭된 a 바로 뒤 sub개체는 slideDown이 실행된다.
    } else {
      $(this).next().slideUp();
    }
  });

  $(".gnb_main_menu").hide();
  $(".toggle").on("click", function () {
    console.log("a");
    $(".gnb_main_menu").toggle();
    $(".search_area").hide();
  });

  $(".search_area").hide();
  $(".search").on("click", function () {
    console.log("a");
    $(".search_area").toggle();
    $(".gnb_main_menu").hide();
  });

  let search = $("#searchbox");
  let popular = $(".popular_search");
  search.focus(function () {
    popular.css("display", "none");
  });
  search.blur(function () {
    popular.css("display", "block");
  });

  let imgW = $(".news_img").children("img").width();
  let imgNum = $(".news_img").children("img").length;
  // $(".slide").width(imgW * imgNum);
  // let num = 0;
  // 이동목표 증가변수 선언( -600 * 0, -600 * 1, -600 * 2,-600 * 3)

  function slideMove() {
    $(".news_img").animate({ left: -imgW }, 0, function () {
      $(".news_img").find("img").eq(0).appendTo($(".news_img"));
      $(".news_img").css("left", 0);
    });
  }
  // let timer = setInterval(slideMove, 3000);

  $(".right").on("click", function (event) {
    event.preventDefault();
    // clearInterval(timer);
    slideMove();
    // timer = setInterval(slideMove, 3000);
  });
  $(".left").on("click", function (event) {
    event.preventDefault();
    // clearInterval(timer);
    $(".news_img")
      .find("img")
      .eq(imgNum - 1)
      .prependTo($(".news_img"));
    $(".news_img").css("left", -imgW);
    $(".news_img").animate({ left: 0 }, 0);
    // timer = setInterval(slideMove, 3000);
  });
});
