/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('scroll-header') 
                       : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SWIPER PRODUCTS ===============*/
let swiper = new Swiper(".products__container", {
    spacebetween: 32,
    grapCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop:true,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev", 
    },

    breakpoints: {
        1024: {
          spaceBetween: 72,
        },
      },
  });

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = document.getElementById('scroll-up');
scrollUp.classList.add('show-scroll');   // always visible


/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 400,
  // reset: true
})

sr.reveal(`.home__data, .products__container, .footer__container, .footer__info`)
sr.reveal(`.home__images`,{delay: 600, origin: 'bottom'})
sr.reveal(`.new__card, .brand__img`,{interval: 100})
sr.reveal(`.collection__explore:nth-child(1)`,{origin: 'right'})
sr.reveal(`.collection__explore:nth-child(2)`,{origin: 'left'})


// About Section
document.addEventListener("DOMContentLoaded", () => {
  const learnMoreButton = document.querySelector('.button__link');

  if (learnMoreButton) {
      learnMoreButton.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent default anchor click behavior
          const targetSection = document.getElementById('more-info'); // Change this to your target section ID

          if (targetSection) {
              // Smooth scroll to the target section
              targetSection.scrollIntoView({
                  behavior: 'smooth'
              });
          }
      });
  }
});


// ================================= FORM SUBMIT API ==========================================
// // Get form and status element
const form = document.querySelector("#contactForm");
const statusText = document.querySelector("#formStatus");

// // Submit listener
form.addEventListener("submit", async function (e) {
    e.preventDefault(); // // Stop auto submit

    const formData = new FormData(form);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        console.log(result); // // Show server response

        if (result.success) {
            statusText.style.color = "green";
            statusText.textContent = "Message sent successfully!";
            form.reset();
        } else {
            statusText.style.color = "red";
            statusText.textContent = "Failed to send message!";
        }

    } catch (error) {
        statusText.style.color = "red";
        statusText.textContent = "Something went wrong!";
    }
});
// ========================= FOOTER CHNAGE COPY RIGHT YEAR ==================================
const currentYear = new Date().getFullYear();
document.getElementById("year").textContent = currentYear;
