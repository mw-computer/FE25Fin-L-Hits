document.addEventListener('DOMContentLoaded', function() {
  // 메가메뉴 동작 설정
  const menuItems = document.querySelectorAll('.main-menu > li');
  
  // 메가메뉴 위치 조정 (필요한 경우)
  function adjustMegaMenuPosition() {
    const megaMenus = document.querySelectorAll('.mega-menu');
    megaMenus.forEach(menu => {
      // 메가메뉴의 위치 조정이 필요하면 여기에 코드 추가
    });
  }

  // 창 크기가 변경될 때 메가메뉴 위치 조정
  window.addEventListener('resize', adjustMegaMenuPosition);
  
  // 초기 실행
  adjustMegaMenuPosition();

  // 모바일 메뉴 기능을 위한 준비 (나중에 추가)
  const setupMobileMenu = () => {
    const isMobile = window.innerWidth <= 768;
    // 모바일 메뉴 관련 코드는 나중에 구현
  };
  
  setupMobileMenu();
  window.addEventListener('resize', setupMobileMenu);
});