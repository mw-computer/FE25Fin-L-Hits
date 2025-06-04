document.addEventListener('DOMContentLoaded', function() {
  // 컴포넌트 로드 함수
  async function loadComponent(elementId, componentPath) {
    try {
      const response = await fetch(componentPath);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const html = await response.text();
      document.getElementById(elementId).innerHTML = html;
    } catch (error) {
      console.error(`컴포넌트 로드 실패: ${componentPath}`, error);
    }
  }

  // 메인 메뉴 로드
  loadComponent('main-menu-container', './components/mainMenu.html');
  
  // 우측 메뉴 로드
  loadComponent('right-menu-container', './components/rightMenu.html');
});
