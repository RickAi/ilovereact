
function animateLogo() {
  // Animation duration is 2 seconds.
  TweenMax.fromTo("#logo",1, {
      // from
      css: {
        top: "-20px",
      }
    },{
      // to
      css: {
        top: "20px",
      },

      // option to repeat animation forever
      repeat: -1,

      // option to reverse the animation and rerun
      yoyo: true,
    }
  );
}

// Start animating when the page is ready.
window.onload = function() {
  animateLogo();
  animateRobot();
  updateSliderControl();
  addSmoothScrolling();
};

function animateRobot() {
  var t = new TimelineMax({yoyo: true, repeat: -1});
  t.to("#robot",0.5,{rotation: "-40deg"})
  .to("#robot",0.5,{rotation: "-70deg"});
}

function updateSliderControl() {
  // get all the slider links
  var links = document.querySelectorAll("#slider-control a");

  for(var i = 0; i < links.length; i++) {
    var link = links[i];

    // Get the section pointed to by the link
    var section_id = link.getAttribute("href");
    var section = document.querySelector(section_id);
    var sectionTop = section.offsetTop;
    var sectionBottom = document.body.clientHeight + sectionTop;

    var div = link.querySelector("div");

    // Check if window.scrollY is between the section.
    if(window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      div.className = "active";
    } else {
      div.className = "dot";
    }
  }
}

// Use the onscroll callback to update slider.
window.onscroll = function() {
  updateSliderControl();
}

function scrollToElement(element) {
  var section = document.querySelector(element);
  var sectionTop = section.offsetTop;

  TweenMax.to(window,1,{
    scrollTo: {
      y: sectionTop,
    },

    ease: Power2.easeInOut,
  });
}

function addSmoothScrolling() {
  var links = document.querySelectorAll("#slider-control a");

  for(var i = 0; i < links.length; i++) {

    links[i].addEventListener('click', (function (num) {
        return function (e){
            e.preventDefault();
            var section_id = links[num].getAttribute("href");
            scrollToElement(section_id);
        }               
    })(i), 'false');
    
  }
}
