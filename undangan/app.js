document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. DYNAMIC DATA INJECTION FROM CONFIG.JS
  // ==========================================================================
  const config = WeddingConfig;

  // Mempelai Pria (Groom)
  document.getElementById("groomFullName").textContent = config.groom.fullname;
  document.getElementById("groomParents").textContent = `Putra dari Bpk. ${config.groom.father} & Ibu ${config.groom.mother}`;
  document.getElementById("groomBio").textContent = config.groom.about;
  document.getElementById("groomInstagram").href = config.groom.instagram;
  document.getElementById("groomInstagram").innerHTML = `<i class="fa-brands fa-instagram"></i> @${config.groom.nickname.toLowerCase()}`;
  if (config.groom.chineseName) {
    document.getElementById("groomChineseName").textContent = config.groom.chineseName;
  }
  if (config.groom.photo) {
    document.getElementById("groomPhoto").src = config.groom.photo;
  }

  // Mempelai Wanita (Bride)
  document.getElementById("brideFullName").textContent = config.bride.fullname;
  document.getElementById("brideParents").textContent = `Putri dari Bpk. ${config.bride.father} & Ibu ${config.bride.mother}`;
  document.getElementById("brideBio").textContent = config.bride.about;
  document.getElementById("brideInstagram").href = config.bride.instagram;
  document.getElementById("brideInstagram").innerHTML = `<i class="fa-brands fa-instagram"></i> @${config.bride.nickname.toLowerCase()}`;
  if (config.bride.photo) {
    document.getElementById("bridePhoto").src = config.bride.photo;
  }

  // Acara Pemberkatan
  document.getElementById("pemberkatanTitle").textContent = config.events.pemberkatan.title;
  document.getElementById("pemberkatanDate").textContent = config.events.pemberkatan.dateString;
  document.getElementById("pemberkatanTime").textContent = config.events.pemberkatan.timeString;
  document.getElementById("pemberkatanVenue").textContent = config.events.pemberkatan.venue;
  document.getElementById("pemberkatanAddress").textContent = config.events.pemberkatan.address;
  document.getElementById("pemberkatanMapsBtn").href = config.events.pemberkatan.mapsUrl;
  document.getElementById("pemberkatanMapIframe").src = config.events.pemberkatan.mapsEmbedUrl;

  // Acara Resepsi
  document.getElementById("resepsiTitle").textContent = config.events.resepsi.title;
  document.getElementById("resepsiDate").textContent = config.events.resepsi.dateString;
  document.getElementById("resepsiTime").textContent = config.events.resepsi.timeString;
  document.getElementById("resepsiVenue").textContent = config.events.resepsi.venue;
  document.getElementById("resepsiAddress").textContent = config.events.resepsi.address;
  document.getElementById("resepsiMapsBtn").href = config.events.resepsi.mapsUrl;
  document.getElementById("resepsiMapIframe").src = config.events.resepsi.mapsEmbedUrl;

  // Google Calendar Links Generator
  setupCalendarLinks();

  // Kado Alamat
  document.getElementById("giftRecipient").textContent = config.gifts.physicalAddress.recipient;
  document.getElementById("giftPhone").textContent = config.gifts.physicalAddress.phone;
  document.getElementById("giftAddress").textContent = config.gifts.physicalAddress.address;

  // Render Rekening Bank
  const bankContainer = document.getElementById("bankAccounts");
  bankContainer.innerHTML = "";
  config.gifts.accounts.forEach((acc, index) => {
    const card = document.createElement("div");
    card.className = "bank-card card-blur fade-up";
    card.setAttribute("data-index", index);
    
    // Gunakan Logo jika ada, jika tidak pakai teks nama bank
    let logoHTML = `<span class="bank-name">${acc.bankName}</span>`;
    if (acc.logo) {
      logoHTML = `<img src="${acc.logo}" alt="${acc.bankName}" class="bank-logo-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"><span class="bank-name" style="display:none;">${acc.bankName}</span>`;
    }

    card.innerHTML = `
      <div class="bank-header">
        ${logoHTML}
        <i class="fa-solid fa-credit-card" style="color: var(--gold); font-size: 1.4rem;"></i>
      </div>
      <div class="account-num-container">
        <span class="account-number" id="accNum-${index}">${acc.accountNumber}</span>
        <button class="btn-copy" onclick="copyToClipboard('${acc.accountNumber}', 'toast-${index}')" aria-label="Salin">
          <i class="fa-regular fa-copy"></i>
        </button>
      </div>
      <p class="account-holder">a.n. ${acc.accountHolder}</p>
      <span class="copy-toast" id="toast-${index}">Nomor rekening disalin!</span>
    `;
    bankContainer.appendChild(card);
  });

  // Render Galeri
  const galleryGrid = document.getElementById("galleryGrid");
  galleryGrid.innerHTML = "";
  config.gallery.forEach((photo, index) => {
    const item = document.createElement("div");
    item.className = "gallery-item fade-up";
    item.innerHTML = `
      <img src="${photo.url}" alt="${photo.caption}" class="gallery-item-img" onerror="this.src='https://placehold.co/600x400/e3dfd5/800020?text=Albert+%26+Grace';">
      <div class="gallery-item-overlay">
        <p class="gallery-item-title">${photo.caption}</p>
      </div>
    `;
    item.addEventListener("click", () => openLightbox(index));
    galleryGrid.appendChild(item);
  });


  // ==========================================================================
  // 2. KUSTOMISASI TAMU UNDANGAN (PARSE URL parameter ?to=)
  // ==========================================================================
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get("to");
  if (guestName) {
    // Bersihkan karakter '+' atau '%20' secara otomatis
    document.getElementById("guestName").textContent = decodeURIComponent(guestName);
  } else {
    document.getElementById("guestName").textContent = "Bapak/Ibu/Saudara/i";
  }


  // ==========================================================================
  // 3. FUNGSI BUKA UNDANGAN & PEMUTAR MUSIK
  // ==========================================================================
  const bgMusic = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");
  const coverOverlay = document.getElementById("coverOverlay");
  const btnOpenInvitation = document.getElementById("btnOpenInvitation");
  
  // Set musik dari config
  bgMusic.querySelector("source").src = config.musicUrl;
  bgMusic.load();

  btnOpenInvitation.addEventListener("click", () => {
    // Hilangkan kunci scroll
    document.body.classList.remove("scroll-locked");
    // Sembunyikan Cover
    coverOverlay.classList.add("dismissed");
    // Tampilkan tombol musik
    musicToggle.classList.remove("hidden");

    // Putar Musik Latar dengan efek volume fade-in
    bgMusic.volume = 0;
    bgMusic.play().then(() => {
      let vol = 0;
      const fadeInterval = setInterval(() => {
        if (vol < 0.8) {
          vol += 0.05;
          bgMusic.volume = vol;
        } else {
          clearInterval(fadeInterval);
        }
      }, 50);
    }).catch(error => {
      console.log("Autoplay dicegah oleh browser:", error);
    });

    // Jalankan animasi untuk section pertama setelah terbuka
    setTimeout(() => {
      triggerInViewAnimations();
    }, 400);
  });

  // Tombol Play/Pause Musik
  musicToggle.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicToggle.classList.remove("music-paused");
    } else {
      bgMusic.pause();
      musicToggle.classList.add("music-paused");
    }
  });


  // ==========================================================================
  // 4. GOLDEN DUST PARTICLE CANVAS (TREN 2026)
  // ==========================================================================
  const canvas = document.getElementById("particleCanvas");
  const ctx = canvas.getContext("2d");
  let particlesArray = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const mouse = { x: null, y: null, radius: 120 };
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.reset();
      this.y = Math.random() * canvas.height; // Distribute vertically at start
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 50;
      this.size = Math.random() * 2.5 + 0.8;
      this.speedX = Math.random() * 0.6 - 0.3;
      this.speedY = -(Math.random() * 0.8 + 0.2); // Floating slowly upwards
      
      // Traditional gold, green and white sparkle colors matching the Ulos theme
      const colorRand = Math.random();
      if (colorRand < 0.6) {
        this.color = "rgba(230, 173, 39, " + (Math.random() * 0.4 + 0.3) + ")"; // Gold
      } else if (colorRand < 0.85) {
        this.color = "rgba(27, 122, 61, " + (Math.random() * 0.4 + 0.3) + ")"; // Batak Green
      } else {
        this.color = "rgba(255, 255, 255, " + (Math.random() * 0.6 + 0.4) + ")"; // Brilliant White
      }
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Mouse repulsion (Blowing wind effect)
      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.hypot(dx, dy);
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = dx / distance;
          const directionY = dy / distance;
          this.x += directionX * force * 3.5;
          this.y += directionY * force * 3.5;
        }
      }

      // Reset when particle goes offscreen
      if (this.y < -20 || this.x < -20 || this.x > canvas.width + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function initParticles() {
    // Kurangi jumlah partikel pada mobile untuk performa
    const numberOfParticles = window.innerWidth < 768 ? 40 : 100;
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }
  initParticles();

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Matikan shadow blur untuk performa rendering normal agar tetap 60fps
    ctx.shadowBlur = 0;
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();


  // ==========================================================================
  // 5. 3D INTERACTIVE CARD TILT EFFECT
  // ==========================================================================
  const tiltCards = document.querySelectorAll("[data-tilt]");
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  // Hanya terapkan 3D Tilt pada Desktop agar hemat baterai/performa HP
  if (!isMobile) {
    tiltCards.forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const cardRect = card.getBoundingClientRect();
        const cardWidth = cardRect.width;
        const cardHeight = cardRect.height;
        
        // Kursor relatif terhadap kartu
        const mouseX = e.clientX - cardRect.left - cardWidth / 2;
        const mouseY = e.clientY - cardRect.top - cardHeight / 2;
        
        // Hitung sudut rotasi (max 10 derajat)
        const rotateX = -(mouseY / (cardHeight / 2)) * 10;
        const rotateY = (mouseX / (cardWidth / 2)) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
      });
    });
  }


  // ==========================================================================
  // 6. MAGNETIC HOVER BUTTONS (TREN 2026)
  // ==========================================================================
  const magneticBtns = document.querySelectorAll(".btn-magnetic");
  
  if (!isMobile) {
    magneticBtns.forEach(btn => {
      btn.addEventListener("mousemove", (e) => {
        const btnRect = btn.getBoundingClientRect();
        const x = e.clientX - btnRect.left - btnRect.width / 2;
        const y = e.clientY - btnRect.top - btnRect.height / 2;
        
        // Tarikan magnetis 40% dari pergerakan kursor
        btn.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0px, 0px)";
      });
    });
  }


  // ==========================================================================
  // 7. INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
  // ==========================================================================
  const animElements = document.querySelectorAll(".fade-up, .fade-left, .fade-right, .scale-in, .gorga-svg, .split-text, .card-blur, .mempelai-card");
  
  const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("gorga-svg")) {
          // Trigger SVG self drawing
          entry.target.classList.add("animated");
        } else {
          // Trigger standard fade/scale in
          entry.target.classList.add("in-view");
        }
        observer.unobserve(entry.target); // Hanya animasi sekali saja
      }
    });
  }, observerOptions);

  animElements.forEach(el => scrollObserver.observe(el));

  function triggerInViewAnimations() {
    // Memicu animasi awal yang sudah terlihat di layar utama saat terbuka
    const heroElements = document.querySelectorAll("#hero .fade-up, #hero .gorga-svg");
    heroElements.forEach(el => {
      if (el.classList.contains("gorga-svg")) {
        el.classList.add("animated");
      } else {
        el.classList.add("in-view");
      }
    });
  }


  // ==========================================================================
  // 8. COUNTDOWN TIMER CALCULATIONS
  // ==========================================================================
  const targetTime = new Date(config.weddingDate).getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetTime - now;

    if (difference <= 0) {
      document.getElementById("days").textContent = "00";
      document.getElementById("hours").textContent = "00";
      document.getElementById("minutes").textContent = "00";
      document.getElementById("seconds").textContent = "00";
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Tambahkan 0 di depan jika di bawah 10
    document.getElementById("days").textContent = days < 10 ? "0" + days : days;
    document.getElementById("hours").textContent = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").textContent = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").textContent = seconds < 10 ? "0" + seconds : seconds;
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);


  // ==========================================================================
  // 9. LIGHTBOX PHOTO GALLERY INTERACTION
  // ==========================================================================
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.querySelector(".lightbox-close");
  let currentPhotoIndex = 0;

  function openLightbox(index) {
    currentPhotoIndex = index;
    lightbox.style.display = "block";
    updateLightboxContent();
    document.body.style.overflow = "hidden"; // Kunci scroll
  }

  function updateLightboxContent() {
    lightboxImg.src = config.gallery[currentPhotoIndex].url;
    lightboxCaption.textContent = config.gallery[currentPhotoIndex].caption;
  }

  lightboxClose.addEventListener("click", closeLightbox);
  
  // Close saat klik di luar gambar
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto"; // Aktifkan scroll kembali
  }

  document.querySelector(".lightbox-prev").addEventListener("click", (e) => {
    e.stopPropagation();
    currentPhotoIndex = (currentPhotoIndex - 1 + config.gallery.length) % config.gallery.length;
    updateLightboxContent();
  });

  document.querySelector(".lightbox-next").addEventListener("click", (e) => {
    e.stopPropagation();
    currentPhotoIndex = (currentPhotoIndex + 1) % config.gallery.length;
    updateLightboxContent();
  });

  // Tombol Keyboard Navigasi Galeri
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "block") {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") {
        currentPhotoIndex = (currentPhotoIndex - 1 + config.gallery.length) % config.gallery.length;
        updateLightboxContent();
      }
      if (e.key === "ArrowRight") {
        currentPhotoIndex = (currentPhotoIndex + 1) % config.gallery.length;
        updateLightboxContent();
      }
    }
  });


  // ==========================================================================
  // 10. RSVP & WISHES LOGIC (LOCAL STORAGE & SHEET INTEGRATION)
  // ==========================================================================
  const rsvpForm = document.getElementById("rsvpForm");
  const wishesList = document.getElementById("wishesList");
  const wishesCountEl = document.getElementById("wishesCount");
  const formGuestsGroup = document.getElementById("formGuestsGroup");
  const formStatus = document.getElementById("formStatus");

  // Kontrol visibilitas pilihan Jumlah Tamu
  formStatus.addEventListener("change", () => {
    if (formStatus.value === "Tidak Hadir") {
      formGuestsGroup.style.display = "none";
    } else {
      formGuestsGroup.style.display = "block";
    }
  });

  // Load Wishes Awal
  loadWishes();

  rsvpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("formName").value.trim();
    const status = document.getElementById("formStatus").value;
    const guests = status === "Tidak Hadir" ? 0 : parseInt(document.getElementById("formGuests").value);
    const message = document.getElementById("formMessage").value.trim();

    if (!name || !status || !message) return;

    const newWish = {
      name,
      status,
      guests,
      message,
      timestamp: new Date().toISOString()
    };

    // 1. Simpan Lokal (Local Storage)
    saveWishLocal(newWish);
    
    // 2. Integrasi Online (Google Sheets via Web App Apps Script)
    if (config.googleSheetsUrl) {
      const btnSubmit = document.getElementById("btnSubmitRSVP");
      const originalHTML = btnSubmit.innerHTML;
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...`;

      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("status", status);
        formData.append("guests", guests);
        formData.append("message", message);

        await fetch(config.googleSheetsUrl, {
          method: "POST",
          body: formData,
          mode: "no-cors" // Mencegah CORS blocking dari Google
        });

        console.log("RSVP berhasil dikirim ke Google Sheets.");
      } catch (err) {
        console.error("Gagal mengirim RSVP ke Google Sheets:", err);
      } finally {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = originalHTML;
      }
    }

    // Reset Form & Tampilkan Notifikasi sukses
    rsvpForm.reset();
    formGuestsGroup.style.display = "block";
    loadWishes();
    alert("Terima kasih! Konfirmasi kehadiran dan ucapan Anda telah kami terima.");
  });

  function saveWishLocal(wish) {
    let wishes = JSON.parse(localStorage.getItem("wedding_wishes")) || [];
    wishes.unshift(wish); // Tambahkan di paling atas
    localStorage.setItem("wedding_wishes", JSON.stringify(wishes));
  }

  function loadWishes() {
    let wishes = JSON.parse(localStorage.getItem("wedding_wishes")) || [];
    wishesCountEl.textContent = wishes.length;

    if (wishes.length === 0) {
      wishesList.innerHTML = `<p class="no-wishes">Belum ada ucapan. Jadilah yang pertama memberikan doa restu!</p>`;
      return;
    }

    wishesList.innerHTML = "";
    wishes.forEach(wish => {
      const item = document.createElement("div");
      item.className = "wish-item";
      
      let statusClass = "hadir";
      let statusText = "Hadir";
      if (wish.status === "Ragu-ragu") {
        statusClass = "ragu-ragu";
        statusText = "Ragu-ragu";
      } else if (wish.status === "Tidak Hadir") {
        statusClass = "tidak-hadir";
        statusText = "Tidak Hadir";
      }

      // Format detail jumlah tamu jika hadir
      const guestInfo = wish.status !== "Tidak Hadir" ? ` (${wish.guests} Orang)` : '';

      // Format Waktu Relatif / Tanggal
      const wishDate = new Date(wish.timestamp);
      const timeString = wishDate.toLocaleDateString("id-ID", {
        day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
      });

      item.innerHTML = `
        <div class="wish-header">
          <span class="wish-name">${escapeHTML(wish.name)}</span>
          <span class="wish-status ${statusClass}">${statusText}${guestInfo}</span>
        </div>
        <p class="wish-message">${escapeHTML(wish.message)}</p>
        <span class="wish-time">${timeString}</span>
      `;
      wishesList.appendChild(item);
    });
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // Helper Calendar Link
  function setupCalendarLinks() {
    const title = encodeURIComponent("Pernikahan Albert & Grace");
    const details = encodeURIComponent("Pemberkatan & Resepsi Pernikahan Albert & Grace");
    
    // Format Waktu Google Calendar: YYYYMMDDTHHMMSSZ (UTC)
    // 18 Oktober 2026, 09:00 - 15:00 WIB (GMT+7)
    // UTC: 18 Okt 2026 02:00 - 08:00
    const dates = "20261018T020000Z/20261018T080000Z";
    
    const locPemberkatan = encodeURIComponent(config.events.pemberkatan.venue + ", " + config.events.pemberkatan.address);
    const locResepsi = encodeURIComponent(config.events.resepsi.venue + ", " + config.events.resepsi.address);

    document.getElementById("pemberkatanCalBtn").href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${locPemberkatan}`;
    document.getElementById("resepsiCalBtn").href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${locResepsi}`;
  }

  // ==========================================================================
  // 10B. 2026 SPLIT-TEXT ANIMATION INITIALIZER
  // ==========================================================================
  const splitTextElements = document.querySelectorAll(".split-text");
  splitTextElements.forEach(el => {
    const text = el.textContent;
    el.innerHTML = "";
    [...text].forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.setProperty("--char-index", i);
      el.appendChild(span);
    });
  });

  // ==========================================================================
  // 10C. PARALLAX EFFECT FOR BRIDE/GROOM PORTRAITS & GALLERY
  // ==========================================================================
  // ==========================================================================
  // 10C. PARALLAX EFFECT FOR BRIDE/GROOM PORTRAITS, GALLERY & BACKGROUND
  // ==========================================================================
  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;
    
    // Background parallax variable injection
    document.body.style.setProperty("--scroll-y", scrollY);

    // Scroll Progress bar percentage
    const progress = document.querySelector(".scroll-progress");
    if (progress) {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const percentage = (scrollY / totalScroll) * 100;
        progress.style.width = percentage + "%";
      }
    }

    document.querySelectorAll(".parallax-img").forEach(img => {
      const speed = 0.08;
      const rect = img.getBoundingClientRect();
      const parentTop = rect.top + scrollY;
      const visibleY = scrollY + window.innerHeight;
      
      // Only compute parallax if image is in viewport
      if (visibleY > parentTop && scrollY < parentTop + rect.height) {
        const yPos = (scrollY - parentTop) * speed;
        img.style.transform = `translateY(${yPos}px) scale(1.1)`;
      }
    });
  });

  // ==========================================================================
  // 10D. 2026 MAGNETIC HOVER EFFECT ON CTAS
  // ==========================================================================
  const magneticElements = document.querySelectorAll(".btn-primary, .btn-secondary, .btn-outline, .music-toggle");
  magneticElements.forEach(el => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      // Attract element slightly towards cursor (magnetic field pull)
      el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px) scale(1.04)`;
    });
    el.addEventListener("mouseleave", () => {
      // Return smoothly to original position
      el.style.transform = "translate(0px, 0px) scale(1)";
    });
  });
});

// ==========================================================================
// 11. GLOBAL UTILITIES (SALIN REKENING & ALAMAT)
// ==========================================================================
function copyToClipboard(text, toastId) {
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.getElementById(toastId);
    toast.classList.add("show");
    
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2000);
  }).catch(err => {
    console.error("Gagal menyalin teks: ", err);
  });
}

// Handler Salin Alamat Kado Fisik
const btnCopyAddress = document.getElementById("btnCopyAddress");
if (btnCopyAddress) {
  btnCopyAddress.addEventListener("click", () => {
    const addressText = document.getElementById("giftAddress").textContent;
    const recipient = document.getElementById("giftRecipient").textContent;
    const phone = document.getElementById("giftPhone").textContent;
    
    const fullText = `Penerima: ${recipient}\nNo HP: ${phone}\nAlamat: ${addressText}`;
    
    navigator.clipboard.writeText(fullText).then(() => {
      const toast = document.getElementById("addressCopyToast");
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
      }, 2000);
    });
  });
}
