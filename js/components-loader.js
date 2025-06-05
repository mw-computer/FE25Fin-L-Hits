document.addEventListener("DOMContentLoaded", function () {
  // 컴포넌트 로드 함수
  async function loadComponent(elementId, componentPath) {
    try {
      const response = await fetch(componentPath);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const html = await response.text();
      document.getElementById(elementId).innerHTML = html;

      // 이벤트 배너 로드 완료 후 초기화 함수 호출
      if (elementId === "event-banner-container" && window.setEventBanner) {
        window.setEventBanner();
      }

      return true;
    } catch (error) {
      console.error(`컴포넌트 로드 실패: ${componentPath}`, error);
      return false;
    }
  }

  // 메인 메뉴 로드
  loadComponent("main-menu-container", "./components/mainMenu.html");

  // 우측 메뉴 로드
  loadComponent("right-menu-container", "./components/rightMenu.html");

  // 광고 배너 로드 - 비동기 로드 후 배너 초기화
  loadComponent("event-banner-container", "./components/eventBanner.html");

  // 서브 네비게이션 로드 추가
  loadComponent("sub-navigation-container", "./components/subNavigation.html");

  // 메인 컨텐츠 로드
  loadComponent("main-container", "./components/main.html");

  // 푸터 이벤트 배너 로드
  loadComponent("footer-event-banner-container", "./components/footerEventBanner.html");
});
