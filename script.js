/*
 * GSK株式会社 JavaScriptファイル
 * 作成日: 2024年
 */

// ページ読み込み時のスプラッシュ画面処理
window.addEventListener("load", function () {
  const splash = document.getElementById("splash");
  const hero = document.getElementById("hero");
  const header = document.querySelector("header");
  const about = document.getElementById("about");
  const allSections = document.querySelectorAll("section:not(#hero)");

  // 初期状態でヘッダーとヒーローセクションとその他セクションは非表示（CSSで設定済み）

  // すべてのセクションを一時的に非表示にする
  allSections.forEach((section) => {
    section.style.opacity = "0";
  });

  // 飛行機雲アニメーションの完了を待つ（3秒）
  setTimeout(function () {
    // スプラッシュ画面をフェードアウト
    splash.classList.add("fade-out");

    // スプラッシュ画面の消失後にヘッダーとヒーローセクションを表示
    setTimeout(function () {
      // スプラッシュを完全に非表示
      splash.style.display = "none";

      // ヘッダーとヒーローセクションを表示
      if (header) {
        header.classList.add("fade-in");
      }
      if (hero) {
        hero.classList.add("fade-in");
      }

      // 少し遅れてその他のセクションを表示
      setTimeout(function () {
        allSections.forEach((section) => {
          section.style.opacity = "1";
          section.style.transition = "opacity 0.6s ease";
        });
      }, 300); // 遅延時間を短縮
    }, 500); // フェードアウトにかかる時間を短縮
  }, 3000); // 飛行機雲アニメーションにかかる時間
});

// DOMが完全に読み込まれた後に実行
document.addEventListener("DOMContentLoaded", function () {
  // スワイパーの初期化
  const worksSwiper = new Swiper(".works-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      reverseDirection: true,
    },
    speed: 800,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    // レスポンシブ対応
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });

  // スクロールアニメーションの設定
  // ScrollRevealライブラリを使用
  const sr = ScrollReveal({
    origin: "bottom",
    distance: "30px",
    duration: 600, // アニメーション時間を短縮
    delay: 0, // 初期遅延をなくす
    reset: false,
    viewFactor: 0.1, // 要素の10%が見えたらアニメーション開始（デフォルトは0.2=20%）
  });

  // 各アニメーション要素の設定
  // フェードイン（下から上）
  sr.reveal(".animate-fade-in", {
    delay: 100, // 遅延時間を大幅に短縮
    afterReveal: function (el) {
      el.classList.add("visible");
    },
  });

  // フェードアップ（深く下から上）
  sr.reveal(".animate-fade-up", {
    delay: function (el, i) {
      // 基本遅延を100msにし、data-delayがある場合はその値を加算
      const baseDelay = 100;
      return el.dataset.delay
        ? baseDelay + parseInt(el.dataset.delay) / 4
        : baseDelay; // data-delayの値を1/4に短縮
    },
    afterReveal: function (el) {
      el.classList.add("visible");
    },
  });

  // 左からのアニメーション
  sr.reveal(".animate-from-left", {
    origin: "left",
    delay: 100,
    afterReveal: function (el) {
      el.classList.add("visible");
    },
  });

  // 右からのアニメーション
  sr.reveal(".animate-from-right", {
    origin: "right",
    delay: 100,
    afterReveal: function (el) {
      el.classList.add("visible");
    },
  });

  // 脈動アニメーション
  sr.reveal(".animate-pulsate", {
    delay: 100,
    afterReveal: function (el) {
      el.classList.add("visible");
    },
  });

  // ナビゲーションのスムーススクロール
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      const headerHeight = document.querySelector("header").offsetHeight;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  // ヘッダースクロール時の背景変更
  const header = document.querySelector("header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // お問い合わせフォームのバリデーション
  const contactForm = document.querySelector("#contact form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // 簡易バリデーション
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const phone = document.getElementById("phone");
      const subject = document.getElementById("subject");

      let isValid = true;

      if (!name.value.trim()) {
        highlightError(name);
        isValid = false;
      } else {
        removeError(name);
      }

      if (!email.value.trim() || !isValidEmail(email.value)) {
        highlightError(email);
        isValid = false;
      } else {
        removeError(email);
      }

      if (!phone.value.trim() || !isValidPhone(phone.value)) {
        highlightError(phone);
        isValid = false;
      } else {
        removeError(phone);
      }

      if (!subject.value) {
        highlightError(subject);
        isValid = false;
      } else {
        removeError(subject);
      }

      if (isValid) {
        // 実際はここでフォームデータを送信
        alert(
          "お問い合わせいただきありがとうございます。\n担当者より折り返しご連絡いたします。"
        );
        contactForm.reset();
      }
    });
  }

  // バリデーション用関数
  function highlightError(element) {
    element.classList.add("error");
    element.parentElement.classList.add("has-error");
  }

  function removeError(element) {
    element.classList.remove("error");
    element.parentElement.classList.remove("has-error");
  }

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function isValidPhone(phone) {
    const regex = /^[0-9\-+\s()]{10,15}$/;
    return regex.test(phone);
  }
});
