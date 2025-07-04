document.addEventListener("DOMContentLoaded", function () {
  // 메가메뉴 동작 설정
  const menuItems = document.querySelectorAll(".main-menu > li");

  // 메가메뉴 위치 조정 (필요한 경우)
  function adjustMegaMenuPosition() {
    const megaMenus = document.querySelectorAll(".mega-menu");
    megaMenus.forEach((menu) => {
      // 메가메뉴의 위치 조정이 필요하면 여기에 코드 추가
    });
  }

  // 창 크기가 변경될 때 메가메뉴 위치 조정
  window.addEventListener("resize", adjustMegaMenuPosition);

  // 초기 실행
  adjustMegaMenuPosition();

  // 모바일 메뉴 기능 구현
  const setupMobileMenu = (menuData) => {
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle"); // 모바일 메뉴 토글 버튼
    const mobileMenu = document.getElementById("mobile-menu"); // 모바일 메뉴 전체 컨테이너
    const mobileMenuClose = document.getElementById("mobile-menu-close"); // 모바일 메뉴 닫기 버튼
    const mobileMenuContent = document.querySelector(".mobile-menu-content"); // 모바일 메뉴 내용 컨테이너
    const mobileLogo = document.getElementById("mobile-logo"); // 모바일 메뉴 로고

    if (
      !mobileMenuToggle ||
      !mobileMenu ||
      !mobileMenuClose ||
      !mobileMenuContent ||
      !menuData
    )
      return;

    // 모바일 메뉴 내용 생성 (새로운 2열 레이아웃)
    if (mobileMenuContent.children.length === 0) {
      // 왼쪽 메뉴 열 생성
      const leftColumn = document.createElement("div");
      leftColumn.className = "mobile-menu-left";

      // 메인 메뉴 아이템 컨테이너
      const mainItems = document.createElement("div");
      mainItems.className = "mobile-menu-main-items";

      // 메뉴 아이템 생성
      menuData.forEach((item, index) => {
        const menuItem = document.createElement("div");
        menuItem.className = "mobile-menu-item";

        // 제목과 아이콘을 포함할 컨테이너 생성
        const titleContainer = document.createElement("div");
        titleContainer.className = "mobile-menu-item-title";

        // 제목 텍스트 추가
        const titleText = document.createElement("span");
        titleText.textContent = item.title;
        titleContainer.appendChild(titleText);

        // 아이콘이 있는 경우 추가
        if (item.hasIcon) {
          const icon = document.createElement("img");
          icon.src = "./images/launch.svg";
          icon.alt = "이동하기 아이콘";
          icon.className = "menu-icon";
          titleContainer.appendChild(icon);
        }

        menuItem.appendChild(titleContainer);
        menuItem.dataset.index = index;

        // 직접 링크인 경우와 아닌 경우 다르게 처리
        if (item.isDirectLink) {
          // 직접 링크인 경우 (인증시험, 블로그, 기업서비스)
          menuItem.classList.add("direct-link");

          menuItem.addEventListener("click", function () {
            // 새 창으로 링크 열기
            window.open(item.url, "_blank");
          });
        } else {
          // 서브메뉴가 있는 경우 (교육, 데브코스 부트캠프, 코딩테스트)
          if (index === 0) menuItem.classList.add("active");

          menuItem.addEventListener("click", function () {
            // 활성 메뉴 아이템 변경
            document
              .querySelectorAll(".mobile-menu-item:not(.direct-link)")
              .forEach((item) => item.classList.remove("active"));
            this.classList.add("active");

            // 서브메뉴 콘텐츠 변경
            document
              .querySelectorAll(".submenu-content")
              .forEach((content) => content.classList.remove("active"));
            document
              .querySelector(
                `.submenu-content[data-index="${this.dataset.index}"]`
              )
              .classList.add("active");
          });
        }

        mainItems.appendChild(menuItem);
      });

      // 왼쪽 열에 메인 아이템과 로그인 버튼 추가
      leftColumn.appendChild(mainItems);

      // 로그인 버튼 영역
      const loginArea = document.createElement("div");
      loginArea.className = "mobile-menu-login";

      const loginButton = document.createElement("a");
      loginButton.href =
        "https://programmers.co.kr/account/sign_in?referer=https%3A%2F%2Fschool.programmers.co.kr%2Fmy-courses";
      loginButton.className = "login-button";
      loginButton.textContent = "로그인";

      loginArea.appendChild(loginButton);
      leftColumn.appendChild(loginArea);

      // 오른쪽 메뉴 열 생성
      const rightColumn = document.createElement("div");
      rightColumn.className = "mobile-menu-right";

      // 서브메뉴 콘텐츠 생성 (직접 링크가 아닌 항목만)
      menuData.forEach((item, index) => {
        // 직접 링크인 항목은 서브메뉴 콘텐츠를 생성하지 않음
        if (item.isDirectLink) return;

        const submenuContent = document.createElement("div");
        submenuContent.className = "submenu-content";
        submenuContent.dataset.index = index;

        if (index === 0) submenuContent.classList.add("active");

        // 서브메뉴 카테고리와 아이템 - 바로 첫번째 카테고리부터 표시
        if (item.submenus && item.submenus.length > 0) {
          item.submenus.forEach((submenu) => {
            const category = document.createElement("div");
            category.className = "submenu-category";

            const h3 = document.createElement("h3");
            h3.className = "submenu-heading"; // 새로운 클래스 추가

            // 제목에 링크 추가
            const titleLink = document.createElement("a");
            titleLink.href = submenu.url;
            titleLink.textContent = submenu.title;
            titleLink.className = "submenu-title-link"; // 스타일 적용을 위한 클래스 추가

            // 아이콘이 있으면 추가
            if (submenu.hasIcon) {
              const icon = document.createElement("img");
              icon.src = "./images/launch.svg";
              icon.alt = "이동하기 아이콘";
              icon.className = "menu-icon";
              titleLink.appendChild(icon);
            }

            h3.appendChild(titleLink);
            category.appendChild(h3);

            if (submenu.items && submenu.items.length > 0) {
              const ul = document.createElement("ul");

              submenu.items.forEach((item) => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.href = item.url;
                a.textContent = item.title;
                li.appendChild(a);
                ul.appendChild(li);
              });

              category.appendChild(ul);
            }

            submenuContent.appendChild(category);
          });
        }

        rightColumn.appendChild(submenuContent);
      });

      // 모바일 메뉴에 왼쪽, 오른쪽 열 추가
      mobileMenuContent.appendChild(leftColumn);
      mobileMenuContent.appendChild(rightColumn);
    }

    // 메뉴 닫기 함수 (재사용을 위해 분리)
    const closeMenu = () => {
      mobileMenu.classList.remove("active");
      setTimeout(() => {
        mobileMenu.style.display = "none";
      }, 300);
      document.body.style.overflow = "";
    };

    // 메뉴 토글 버튼 클릭 이벤트
    mobileMenuToggle.onclick = function () {
      mobileMenu.style.display = "block";
      void mobileMenu.offsetWidth;
      mobileMenu.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    // 닫기 버튼 클릭 이벤트 - 함수 사용
    mobileMenuClose.onclick = closeMenu;

    // 로고 클릭 이벤트 추가
    if (mobileLogo) {
      mobileLogo.addEventListener("click", function () {
        closeMenu(); // 먼저 메뉴를 닫고
        // 애니메이션 후 페이지 이동
        setTimeout(() => {
          window.location.href = "https://wonderful-dasik-842f7e.netlify.app/";
        }, 300); // 애니메이션과 동일한 시간
      });
    }
  };

  // JSON 데이터 가져오기
  fetch("./js/menuData.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("메뉴 데이터를 불러올 수 없습니다.");
      }
      return response.json();
    })
    .then((menuData) => {
      // 메뉴 데이터를 사용하여 모바일 메뉴 설정
      setupMobileMenu(menuData);
    })
    .catch((error) => {
      console.error("메뉴 데이터 로드 오류:", error);
    });

  // setEventBanner 함수를 전역으로 사용할 수 있도록 설정
  window.setEventBanner = function () {
    // 슬라이더 요소들
    const slides = document.querySelectorAll(".swiper-slide");
    const LeftPrevButton = document.querySelector(".prev-button-left");
    const RightPrevButton = document.querySelector(".prev-button-right");
    const currentIndex = document.querySelector(".currentIndex");
    const totalCount = document.querySelector(".totalCount");

    if (
      !slides.length ||
      !LeftPrevButton ||
      !RightPrevButton ||
      !currentIndex ||
      !totalCount
    ) {
      console.error("이벤트 배너 요소를 찾을 수 없습니다.");
      return;
    }

    let activeSlideIndex = 1;
    const totalSlides = slides.length;
    let autoSlideInterval; // 인터벌 변수를 함수 스코프로 이동

    // 초기 설정
    totalCount.textContent = totalSlides;
    updateSlider();

    // 자동 슬라이드 타이머 설정 함수
    function startAutoSlideTimer() {
      // 기존 타이머가 있으면 제거
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
      }

      // 새 타이머 설정 (3초 간격)
      autoSlideInterval = setInterval(function () {
        activeSlideIndex =
          activeSlideIndex >= totalSlides ? 1 : activeSlideIndex + 1;
        updateSlider();
      }, 3000);
    }

    // 다음 슬라이드로 이동
    RightPrevButton.addEventListener("click", function () {
      activeSlideIndex =
        activeSlideIndex >= totalSlides ? 1 : activeSlideIndex + 1;
      updateSlider();
      startAutoSlideTimer(); // 타이머 초기화
    });

    // 이전 슬라이드로 이동
    LeftPrevButton.addEventListener("click", function () {
      activeSlideIndex =
        activeSlideIndex <= 1 ? totalSlides : activeSlideIndex - 1;
      updateSlider();
      startAutoSlideTimer(); // 타이머 초기화
    });

    // 슬라이더 업데이트 함수
    function updateSlider() {
      slides.forEach((slide) => {
        slide.classList.remove("active", "prev", "last");
      });

      // 현재 슬라이드 활성화
      const activeSlide = document.querySelector(
        `[data-slide-index="${activeSlideIndex}"]`
      );
      if (activeSlide) {
        activeSlide.classList.add("active");

        // 이전 슬라이드 (시각적 효과용)
        const prevSlideIndex =
          activeSlideIndex <= 1 ? totalSlides : activeSlideIndex - 1;
        const prevSlide = document.querySelector(
          `[data-slide-index="${prevSlideIndex}"]`
        );
        if (prevSlide) {
          prevSlide.classList.add("prev");
        }

        // 마지막 슬라이드 (시각적 효과용)
        if (activeSlideIndex === totalSlides) {
          activeSlide.classList.add("last");
        }

        // 현재 인덱스 표시 업데이트
        currentIndex.textContent = activeSlideIndex;
      }
    }

    // 자동 슬라이드 시작
    startAutoSlideTimer();

    // 페이지 떠날 때 인터벌 정리
    window.addEventListener("beforeunload", () => {
      clearInterval(autoSlideInterval);
    });
  };
});
