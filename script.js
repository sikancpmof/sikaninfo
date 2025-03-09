document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle")
    const nav = document.querySelector("nav")
  
    if (menuToggle && nav) {
      menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active")
      })
    }
  
    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (
        nav &&
        nav.classList.contains("active") &&
        !event.target.closest("nav") &&
        !event.target.closest(".menu-toggle")
      ) {
        nav.classList.remove("active")
      }
    })
  
    // Suggestion Modal
    const suggestionModal = document.getElementById("suggestion-modal")
    const suggestBtn = document.getElementById("suggest-btn")
    const floatingSuggestBtn = document.getElementById("floating-suggest-btn")
    const suggestBtnFooter = document.querySelector(".suggest-btn-footer")
    const closeModalBtns = document.querySelectorAll(".close-modal")
    const successModal = document.getElementById("success-modal")
    const modalBtn = document.querySelector(".modal-btn")
  
    // Open suggestion modal
    function openSuggestionModal() {
      if (suggestionModal) {
        suggestionModal.style.display = "flex"
        document.body.style.overflow = "hidden" // Prevent scrolling
      }
    }
  
    // Close modals
    function closeModals() {
      if (suggestionModal) {
        suggestionModal.style.display = "none"
      }
      if (successModal) {
        successModal.style.display = "none"
      }
      document.body.style.overflow = "auto" // Enable scrolling
    }
  
    // Event listeners for opening suggestion modal
    if (suggestBtn) {
      suggestBtn.addEventListener("click", (e) => {
        e.preventDefault()
        openSuggestionModal()
      })
    }
  
    if (floatingSuggestBtn) {
      floatingSuggestBtn.addEventListener("click", () => {
        openSuggestionModal()
      })
    }
  
    if (suggestBtnFooter) {
      suggestBtnFooter.addEventListener("click", (e) => {
        e.preventDefault()
        openSuggestionModal()
      })
    }
  
    // Close modal buttons
    closeModalBtns.forEach((btn) => {
      btn.addEventListener("click", closeModals)
    })
  
    if (modalBtn) {
      modalBtn.addEventListener("click", closeModals)
    }
  
    // Close modal when clicking outside
    window.addEventListener("click", (event) => {
      if (event.target === suggestionModal) {
        closeModals()
      }
      if (event.target === successModal) {
        closeModals()
      }
    })
  
    // Form Submission
    const settingsForm = document.getElementById("settings-form")
  
    if (settingsForm) {
      settingsForm.addEventListener("submit", function (event) {
        event.preventDefault()
  
        // Get form data
        const formData = new FormData(this)
        const formDataObj = {}
  
        formData.forEach((value, key) => {
          formDataObj[key] = value
        })
  
        // In a real application, you would send this data to the server
        // For this example, we'll just log it and show the success modal
        console.log("Form Data:", formDataObj)
  
        // Email data would be sent to sikanoficial@gmail.com on the server
  
        // Hide suggestion modal and show success modal
        if (suggestionModal && successModal) {
          suggestionModal.style.display = "none"
          successModal.style.display = "flex"
        }
  
        // Reset form
        settingsForm.reset()
      })
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      if (anchor.getAttribute("href") !== "#" && !anchor.classList.contains("suggest-btn-footer")) {
        anchor.addEventListener("click", function (e) {
          e.preventDefault()
  
          const targetId = this.getAttribute("href")
          const targetElement = document.querySelector(targetId)
  
          if (targetElement) {
            // Close mobile menu if open
            if (nav && nav.classList.contains("active")) {
              nav.classList.remove("active")
            }
  
            // Calculate offset for fixed header
            const headerHeight = document.querySelector("header").offsetHeight
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
  
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            })
          }
        })
      }
    })
  
    // Add animation to elements when they come into view
    const animateOnScroll = () => {
      const cards = document.querySelectorAll(".card, .tip-card, .phone-card, .category-card")
      const windowHeight = window.innerHeight
  
      cards.forEach((card) => {
        const cardTop = card.getBoundingClientRect().top
  
        if (cardTop < windowHeight - 100) {
          card.style.opacity = "1"
          card.style.transform = "translateY(0)"
        }
      })
    }
  
    // Set initial styles for animation
    const cards = document.querySelectorAll(".card, .tip-card, .phone-card, .category-card")
    cards.forEach((card) => {
      card.style.opacity = "0"
      card.style.transform = "translateY(20px)"
      card.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    })
  
    // Run animation on scroll
    window.addEventListener("scroll", animateOnScroll)
  
    // Run once on page load
    animateOnScroll()
  })
  
  