'use strict';

const loadingBar = document.querySelector(".loading-bar");
const loadingText = document.querySelector(".loading-text");

let progress = 0;

const interval = setInterval(() => {
  // 緩やかに減速（加速度的に小さくなる）
  const increment = Math.max(1, (100 - progress) * 0.1);
  progress += increment;

  if (progress >= 100) {
    progress = 100;
    clearInterval(interval);
    loadingBar.style.width = progress + "%";
    loadingText.textContent = Math.floor(progress) + "%";

    // 0.5秒止まってから
    setTimeout(() => {
      startCurtainAnimation();
    }, 500);
  } else {
    loadingBar.style.width = progress + "%";
    loadingText.textContent = Math.floor(progress) + "%";
  }
}, 30);


function startCurtainAnimation() {
  // ローディング非表示
  gsap.to(".loading", {
    opacity: 0,
    duration: 0.9,
    onComplete: () => {
      document.querySelector(".loading").style.display = "none";
    }
  });

  // カーテンアニメーション
  const tl = gsap.timeline();

  tl
    .to(".curtain-top", {
      y: "-100%",
      duration: 1.2,
      ease: "power2.inOut"
    })
    .to(".curtain-bottom", {
      y: "100%",
      duration: 1.2,
      ease: "power2.inOut"
    }, "<") // 同時

    .to(".main-content", {
      opacity: 1,
      duration: 1
    }, "-=0.8");

  tl.eventCallback("onComplete", () => {
    document.body.style.overflow = "auto";
  });
}




const nav = document.querySelector('.nav');
const hamburger = document.querySelector('.header_btn');
const navItems = document.querySelectorAll('.nav_item');

// ハンバーガーメニュークリックでメニューを開く（activeをつけるだけ）
hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
  hamburger.classList.toggle('active');
});

navItems.forEach(item => {
  item.addEventListener('click', () => {
    nav.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// navItemsをクリックしたらメニューを閉じる（activeを外す）
navItems.forEach(item => {
  item.addEventListener('click', () => {
    nav.classList.remove('active');
    hamburger.classList.remove('active');
  });
});






// header　ロゴ
{
  const logoIds = ['logo-header', 'logo-footer' ,'logo-nav'];
  logoIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      const text = el.textContent;
      const newText = text
        .split('')
        .map(char => char === 'L' ? `<span style="color: red;">${char}</span>` : char)
        .join('');
      el.innerHTML = newText;
    }
  });
}

// about red
{
  const title = document.getElementById('aboutTitle');
  const text = title.textContent;

  // 「熱」を赤くする（最初に見つかった1文字だけ対象）
  const highlighted = text.replace('熱', '<span style="color: #E51515;">熱</span>');

  title.innerHTML = highlighted;
}


// trust red
{
  const title = document.getElementById('trustTitle');
  const text = title.textContent;

  
  const highlighted = text.replace('瞬', '<span style="color: #E51515;">瞬</span>');

  title.innerHTML = highlighted;
}





// fv txt
const content = document.querySelector('#fv .content');

// SplitTextで分割（文字単位）
const split = new SplitText(content, { type: "chars" });

// 最初は透明で下にずらしておく
gsap.set(split.chars, { opacity: 0, y: 20 });

// アニメーション開始
gsap.to(split.chars, {
  opacity: 1,
  y: 0,
  duration: 1,
  ease: "power3.out",
  stagger: 0.05
});

// works
const { createApp, ref, computed } = Vue;

  createApp({
    setup() {
      const selected = ref('');
      const currentPage = ref(1);
      const itemsPerPage = 6;

      const items = ref([
        { title: '株式会社夢幻モーターズ様', category: '企業PV', img: 'assets/images/works1.jpg' },
        { title: '横浜市観光プロモーション課様', category: 'イベント', img: 'assets/images/works2.jpg' },
        { title: '『水平線を越えて』撮影協力', category: '映画・ドラマ', img: 'assets/images/works3.jpg' },
        { title: '呉市観光課様', category: 'イベント', img: 'assets/images/works4.jpg' },
        { title: '『光のあとで』撮影協力', category: 'イベント', img: 'assets/images/works5.jpg' },
        { title: '株式会社はやま鉄鋼様', category: '企業PV', img: 'assets/images/works6.jpg' },
        { title: '株式会社ASUKAM様', category: '企業PV', img: 'assets/images/works7.jpg' },
        { title: '香川町 納涼花火大会', category: 'イベント', img: 'assets/images/works8.jpg' },
        { title: '『エキスパート』撮影協力', category: '映画・ドラマ', img: 'assets/images/works9.jpg' },
        { title: '観光課様', category: 'イベント', img: 'assets/images/works10.jpg' },
        { title: '『月夜に咲く』撮影協力', category: 'イベント', img: 'assets/images/works11.jpg' },
        { title: '株式会社ASUKAM11様', category: '企業PV', img: 'assets/images/works12.jpg' },
        // さらに件数を増やしてもOK！
      ]);

      const categories = computed(() => {
  return [...new Set(items.value.map(i => i.category))];
});

      const filteredItems = computed(() =>
        selected.value
          ? items.value.filter(i => i.category === selected.value)
          : items.value
      );

      const totalPages = computed(() =>
        Math.ceil(filteredItems.value.length / itemsPerPage)
      );

      const paginatedItems = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage;
        return filteredItems.value.slice(start, start + itemsPerPage);
      });

      const goToPage = (page) => {
        currentPage.value = page;
      };

      return {
        selected,
        currentPage,
        items,
        categories,
        filteredItems,
        paginatedItems,
        totalPages,
        goToPage,
      };
    }
  }).mount('#app');






$(function() {
    let tabs = $(".tab");
    $(".tab").on("click", function() {
        $(".active").removeClass("active");
        $(this).addClass("active");
        const index = tabs.index(this);
        $(".content").removeClass("show").eq(index).addClass("show");
    });
});


// news
// タブの見出し（tab-item）を取得
const tabItems = document.querySelectorAll(".tab-item");

tabItems.forEach((tabItem) => {
  tabItem.addEventListener("click", () => {
    // すべてのタブを非アクティブにする
    tabItems.forEach((t) => {
      t.classList.remove("active");
    });
    // すべてのコンテンツを非表示にする
    const tabPanels = document.querySelectorAll(".tab-panel");
    tabPanels.forEach((tabPanel) => {
      tabPanel.classList.remove("active");
    });

    // クリックされたタブをアクティブにする
    tabItem.classList.add("active");

    // 対応するコンテンツを表示
    const tabIndex = Array.from(tabItems).indexOf(tabItem);
    tabPanels[tabIndex].classList.add("active");
  });
});


// マウスストーカー
const stalker = document.querySelector(".cursor-stalker");

  document.addEventListener("mousemove", (e) => {
    stalker.style.top = `${e.clientY}px`;
    stalker.style.left = `${e.clientX}px`;
  });

  // hover時にサイズを大きくする（例：リンクやボタン）
  const hoverTargets = document.querySelectorAll("a, button, .btn_contact a");

  hoverTargets.forEach(el => {
    el.addEventListener("mouseenter", () => {
      stalker.style.width = "80px";
      stalker.style.height = "80px";
    });

    el.addEventListener("mouseleave", () => {
      stalker.style.width = "40px";
      stalker.style.height = "40px";
    });
  });


  // trust
  document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".bg-image");
    let current = 0;

    function showNextImage() {
      images[current].style.opacity = 0;
      current = (current + 1) % images.length;
      images[current].style.opacity = 1;
    }

    // 最初の画像を表示
    images[current].style.opacity = 1;

    // 5秒ごとに切り替え
    setInterval(showNextImage, 5000);
  });


 // about
  document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".bgi-image");
    let current = 0;

    function showNextImage() {
      images[current].style.opacity = 0;
      current = (current + 1) % images.length;
      images[current].style.opacity = 1;
    }

    // 最初の画像を表示
    images[current].style.opacity = 1;

    // 5秒ごとに切り替え
    setInterval(showNextImage, 5000);
  });








gsap.registerPlugin(ScrollTrigger);

// 共通の処理を関数化
function animateOnScroll(selector, fromX = 0, fromY = 50) {
  document.querySelectorAll(selector).forEach(el => {
    gsap.fromTo(el,
      { x: fromX, y: fromY, opacity: 0 },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 100%',
          toggleActions: 'play reverse play reverse',
        }
      }
    );
  });
}

// 下から（ふわっと）
animateOnScroll('.fadeUpOnScroll', 0, 50);

// 左から
animateOnScroll('.fadeLeftOnScroll', -50, 0);

// 右から
animateOnScroll('.fadeRightOnScroll', 50, 0);

gsap.registerPlugin(ScrollTrigger);

// fadeUpScaleOnScroll：下から + スケールでフェードイン
function animateFadeUpScale(selector) {
  document.querySelectorAll(selector).forEach(el => {
    gsap.fromTo(el,
      {
        y: 50,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse'
        }
      }
    );
  });
}

// 呼び出し
animateFadeUpScale('.fadeUpScaleOnScroll');


function animateScaleOnScroll(selector) {
  document.querySelectorAll(selector).forEach(el => {
    gsap.to(el, {
      scale: 1.1,
      borderRadius: 0,
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: el,
        start: "top 100%",
        end: "top 0%",
        scrub: 1.1
      },
      ease: "none"
    });
  });
}

// クラス名「.scaleOnScroll」が付いている要素すべてに適用
animateScaleOnScroll('.scaleOnScroll');




