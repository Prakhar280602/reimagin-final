function loader(){
  let tl = gsap.timeline({delay:0});

tl.to(".col",{
    top: 0,
    duration:3,
    ease:"power4.inOut"
})

tl.to(".c-1 .item",{
top:0,
stagger:0.25,
duration:3,
ease:"power4.inOut"
},"-=2");


tl.to(".c-2 .item",{
    top:0,
    stagger:-0.25,
    duration:3,
    ease:"power4.inOut"
    },"-=4");
    

    tl.to(".c-3 .item",{
        top:0,
        stagger:0.25,
        duration:3,
        ease:"power4.inOut"
        },"-=4");
        

        tl.to(".c-4 .item",{
            top:0,
            stagger:0.25,
            duration:3,
            ease:"power4.inOut"
            },"-=4");
            
            
tl.to(".c-5 .item",{
    top:0,
    stagger:0.25,
    duration:3,
    ease:"power4.inOut"
    },"-=4");
    

tl.to(".container1",{
    scale:6,
    duration:4,
    ease:"power4.inOut"
},"-=2");


tl.to(".nav-item a ,.title p, .slide-num p, .preview img",{
    top:0,
    stagger:0.075,
    duration:1,
    ease:"power3.out"
},"-=1.5")


tl.to(".icon ion-icon-2 ion-icon",{
    scale:1,
    stagger:0.05,
    ease:"power3.out"
},"-=1")

tl.to(".loader", {
    display: "none"
})
}
loader()
function text(){
  const roboTexts = document.querySelectorAll(".robo-text");
const symbols = "#%^*";
// const symbols = "hello";

roboTexts.forEach((roboText) => {
  const originalText = roboText.dataset.text;

  roboText.addEventListener("mouseenter", () => {
    let index = 0; 
    const interval = setInterval(() => {
      let newText = "";
      for (let i = 0; i < originalText.length; i++) {
        if (i <= index) {
          newText += originalText[i];
        } else {
          newText += symbols[Math.floor(Math.random() * symbols.length)];
        }
      }
      roboText.textContent = newText;

      if (index >= originalText.length) {
        clearInterval(interval);
      }
      index++;
    }, 100);
  });

  roboText.addEventListener("mouseleave", () => {
    roboText.textContent = originalText;
  });
});
}
text()

function pag2(){
 
// Define animation for #scroll
gsap.to("#scroll", {
    x: () => -(document.querySelector("#scroll").scrollWidth - window.innerWidth) + "px",
    ease: "none",
    scrollTrigger: {
        trigger: ".page2",
        scroller: "body",
        start: "top top",
        end: () => "+=" + (document.querySelector("#scroll").scrollWidth - window.innerWidth),
        pin: true,
        scrub: 1, // Use a smooth scrub value for controlled scrolling
        markers: false // Set to true to see debugging markers
    }
});

}
pag2()

function imagesScroll(){
  
gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', function () {
    const slides = gsap.utils.toArray('.slide');
    const activeSlideImages = gsap.utils.toArray('.active-slide img');

    function getInitialTranslateZ(slide) {
        const style = window.getComputedStyle(slide);
        const matrix = style.transform.match(/matrix3d\((.+)\)/);
        if (matrix) {
            const values = matrix[1].split(',');
            return parseFloat(values[14] || 0);
        }
        return 0;
    }

    function mapRange(value, inMin, inMax, outMin, outMax) {
        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }

    slides.forEach((slide, index) => {
        const initialZ = getInitialTranslateZ(slide);

        ScrollTrigger.create({
            trigger: ".container",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;
                const Zincrement = progress * 22500;
                const currentZ = initialZ + Zincrement;

                let opacity;

                if (currentZ > -2500) {
                    opacity = mapRange(currentZ, -2500, 0, 0.5, 1);
                } else {
                    opacity = mapRange(currentZ, -5000, -2500, 0, 0.5);
                }

                slide.style.opacity = opacity;
                slide.style.transform = `translateX(-50%) translateY(-50%) translateZ(${currentZ}px)`;

                if (currentZ < 100) {
                    gsap.to(activeSlideImages[index], {
                        opacity: 1,
                        duration: 1.5,
                        ease: "power3.out",
                    });
                } else {
                    gsap.to(activeSlideImages[index], {
                        opacity: 0,
                        duration: 1.5,
                        ease: "power3.out",
                    });
                }
            },
        });
    });
});

}
imagesScroll()

var sound = new Howl({
  src: ['./indian-oriental-tune-01-15252.mp3'],
  loop: true,
  volume: 0.5
});

var isPlaying = false;

function toggleMusic() {
  var waves = document.querySelectorAll('.wave');
  if (isPlaying) {
      sound.pause();
      waves.forEach(wave => wave.style.animation = 'minimalWave 1s infinite');
  } else {
      sound.play();
      waves.forEach(wave => wave.style.animation = 'activeWave 1s infinite');
  }
  isPlaying = !isPlaying;
}