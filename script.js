
/* GANTI PIN RAHASIA DI SINI */
const PIN_RAHASIA = "220307";

let currentSlide = 1;
const totalSlides = 5;
let unlocked = false;

const slides = document.querySelectorAll(".slide");
const navigation = document.getElementById("navigation");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");

const pinInput = document.getElementById("pinInput");
const pinMessage = document.getElementById("pinMessage");

const openButton = document.getElementById("openButton");
const backButton = document.getElementById("backButton");
const nextButton = document.getElementById("nextButton");
const surpriseButton = document.getElementById("surpriseButton");

function showSlide(number) {
  if (!unlocked) return;

  currentSlide = Math.max(2, Math.min(number, totalSlides));

  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  document
    .getElementById("slide" + currentSlide)
    .classList.add("active");

  progressText.textContent =
    "Slide " + currentSlide + " dari " + totalSlides;

  progressBar.style.width =
    (currentSlide / totalSlides * 100) + "%";

  backButton.disabled = currentSlide === 2;

  if (currentSlide === totalSlides) {
    nextButton.textContent = "Selesai ❤️";
  } else {
    nextButton.textContent = "Selanjutnya →";
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function checkPin() {
  if (pinInput.value === PIN_RAHASIA) {
    unlocked = true;

    document.getElementById("slide1").classList.remove("active");
    navigation.classList.remove("hidden");

    showSlide(2);
  } else {
    pinMessage.textContent =
      "PIN belum benar. Coba lagi, ya ❤️";

    pinInput.value = "";
    pinInput.focus();
  }
}

openButton.addEventListener("click", checkPin);

pinInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    checkPin();
  }
});

backButton.addEventListener("click", function() {
  if (currentSlide > 2) {
    showSlide(currentSlide - 1);
  }
});

nextButton.addEventListener("click", function() {
  if (currentSlide < totalSlides) {
    showSlide(currentSlide + 1);
  } else {
    document.getElementById("surpriseMessage")
      .classList.remove("hidden");

    createHearts(25);

    nextButton.textContent = "Putar Lagi 💗";
    nextButton.onclick = function() {
      document.getElementById("surpriseMessage")
        .classList.add("hidden");

      showSlide(2);
      nextButton.onclick = null;
      nextButton.textContent = "Selanjutnya →";
    };
  }
});

surpriseButton.addEventListener("click", function() {
  document.getElementById("surpriseMessage")
    .classList.remove("hidden");

  surpriseButton.classList.add("hidden");
  createHearts(25);
});

function createHearts(amount) {
  const symbols = ["❤️", "💗", "💕", "💖"];

  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("span");

    heart.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-35px";
    heart.style.fontSize = (18 + Math.random() * 20) + "px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "1000";

    const duration = 3 + Math.random() * 3;

    heart.animate(
      [
        {
          transform: "translateY(0) rotate(0deg)",
          opacity: 1
        },
        {
          transform: "translateY(-110vh) rotate(35deg)",
          opacity: 0
        }
      ],
      {
        duration: duration * 1000,
        easing: "linear"
      }
    );

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, duration * 1000);
  }
}
