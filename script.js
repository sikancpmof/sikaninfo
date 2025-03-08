// Phone models data
const phoneModels = [
    {
      category: "iPhone",
      models: ["iPhone 15 Pro", "iPhone 15", "iPhone 14 Pro", "iPhone 14", "iPhone 13", "iPhone 12", "iPhone SE"],
    },
    {
      category: "Samsung",
      models: ["Galaxy S24", "Galaxy S23", "Galaxy S22", "Galaxy A54", "Galaxy A34", "Galaxy M34"],
    },
    {
      category: "Xiaomi",
      models: ["Redmi Note 13", "Poco F5", "Redmi 12", "Xiaomi 13T", "Poco X5"],
    },
    {
      category: "Other",
      models: ["OnePlus 12", "Google Pixel 8", "Realme GT", "Oppo Reno", "Vivo V30"],
    },
  ]
  
  // Modificar los presets de sensibilidad para quitar el giroscopio
  const sensitivityPresets = {
      "Default": {
          general: 180,
          redDot: 170,
          x2Scope: 150,
          x4Scope: 120,
          botonCamara: 130
      },
      "Pro": {
          general: 190,
          redDot: 180,
          x2Scope: 160,
          x4Scope: 130,
          botonCamara: 150
      },
      "Fast": {
          general: 200,
          redDot: 190,
          x2Scope: 170,
          x4Scope: 140,
          botonCamara: 160
      }
  };
  
  // DOM elements
  const mobileMenuButton = document.querySelector(".mobile-menu-button")
  const mobileMenu = document.querySelector(".mobile-menu")
  const categoryButtons = document.querySelectorAll(".category-button")
  const modelButtons = document.querySelectorAll(".model-button")
  const tabTriggers = document.querySelectorAll(".tab-trigger")
  const currentPhoneElement = document.getElementById("currentPhone")
  const sensitivityTitleElement = document.getElementById("sensitivityTitle")
  const tipDeviceNameElement = document.getElementById("tipDeviceName")
  const deviceNameElements = document.querySelectorAll(".device-name")
  
  // Mobile menu toggle
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
  })
  
  // Category toggle
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category
      const modelsElement = document.getElementById(`${category}-models`)
  
      // Close all other model lists
      document.querySelectorAll(".device-models").forEach((el) => {
        if (el.id !== `${category}-models`) {
          el.classList.remove("active")
        }
      })
  
      // Toggle current model list
      modelsElement.classList.toggle("active")
  
      // Toggle chevron icon
      const chevron = button.querySelector("svg")
      if (modelsElement.classList.contains("active")) {
        chevron.innerHTML = '<path d="m18 15-6-6-6 6"></path>'
      } else {
        chevron.innerHTML = '<path d="m6 9 6 6 6-6"></path>'
      }
    })
  })
  
  // Model selection
  modelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove selected class from all model buttons
      modelButtons.forEach((btn) => btn.classList.remove("selected"))
  
      // Add selected class to clicked button
      button.classList.add("selected")
  
      // Update current phone display
      const selectedModel = button.dataset.model
      currentPhoneElement.textContent = `Modelo actual: ${selectedModel}`
      sensitivityTitleElement.textContent = `Sensibilidad para ${selectedModel}`
      tipDeviceNameElement.textContent = selectedModel
      deviceNameElements.forEach((el) => {
        el.textContent = selectedModel
      })
  
      // Close mobile menu if open
      mobileMenu.classList.remove("active")
    })
  })
  
  // Tab switching
  tabTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      // Remove active class from all triggers and contents
      tabTriggers.forEach((t) => t.classList.remove("active"))
      document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"))
  
      // Add active class to clicked trigger and corresponding content
      trigger.classList.add("active")
      const tabId = trigger.dataset.tab
      document.getElementById(`${tabId}-content`).classList.add("active")
    })
  })
  
  // Initialize: Open iPhone category by default
  document.getElementById("iPhone-models").classList.add("active")
  const iPhoneButton = document.querySelector('[data-category="iPhone"]')
  const iPhoneChevron = iPhoneButton.querySelector("svg")
  iPhoneChevron.innerHTML = '<path d="m18 15-6-6-6 6"></path>'
  
  // Modal de sugerir teléfono
  const sugerirTelefonoBtn = document.getElementById("sugerirTelefonoBtn")
  const sugerirTelefonoModal = document.getElementById("sugerirTelefonoModal")
  const dispositivosModal = document.getElementById("dispositivosModal")
  const closeBtns = document.querySelectorAll(".close-modal")
  const sugerirTelefonoForm = document.getElementById("sugerirTelefonoForm")
  const navDispositivos = document.getElementById("nav-dispositivos")
  const mobileNavDispositivos = document.getElementById("mobile-nav-dispositivos")
  
  // Abrir modal de sugerir teléfono
  sugerirTelefonoBtn.addEventListener("click", () => {
    sugerirTelefonoModal.style.display = "block"
  })
  
  // Abrir modal de dispositivos
  navDispositivos.addEventListener("click", (e) => {
    e.preventDefault()
    dispositivosModal.style.display = "block"
    cargarListaDispositivos()
  })
  
  mobileNavDispositivos.addEventListener("click", (e) => {
    e.preventDefault()
    dispositivosModal.style.display = "block"
    cargarListaDispositivos()
    mobileMenu.classList.remove("active")
  })
  
  // Actualizar el cierre de modales para incluir el de configuración
  closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
          sugerirTelefonoModal.style.display = 'none';
          dispositivosModal.style.display = 'none';
          configuracionModal.style.display = 'none';
      });
  });
  
  // Cerrar modal al hacer clic fuera
  window.addEventListener("click", (e) => {
    if (e.target === sugerirTelefonoModal) {
      sugerirTelefonoModal.style.display = "none"
    }
    if (e.target === dispositivosModal) {
      dispositivosModal.style.display = "none"
    }
    if (e.target === configuracionModal) {
          configuracionModal.style.display = 'none';
      }
  })
  
  // Enviar formulario
  sugerirTelefonoForm.addEventListener("submit", (e) => {
    e.preventDefault()
  
    const formData = {
      nombre: document.getElementById("nombre").value,
      email: document.getElementById("email").value,
      modeloTelefono: document.getElementById("modeloTelefono").value,
      mensaje: document.getElementById("mensaje").value,
    }
  
    // Aquí normalmente enviarías los datos a un servidor
    // Como ejemplo, mostraremos una alerta
    alert(
      `¡Gracias por tu sugerencia! Tu solicitud para agregar ${formData.modeloTelefono} ha sido enviada a sikanoficial@gmail.com`,
    )
  
    // Cerrar el modal y resetear el formulario
    sugerirTelefonoModal.style.display = "none"
    sugerirTelefonoForm.reset()
  })
  
  // Cargar lista de dispositivos en el modal
  function cargarListaDispositivos() {
    const iphoneLista = document.getElementById("iphone-lista")
    const samsungLista = document.getElementById("samsung-lista")
    const xiaomiLista = document.getElementById("xiaomi-lista")
    const otrosLista = document.getElementById("otros-lista")
  
    // Limpiar listas
    iphoneLista.innerHTML = ""
    samsungLista.innerHTML = ""
    xiaomiLista.innerHTML = ""
    otrosLista.innerHTML = ""
  
    // Llenar listas
    phoneModels.forEach((category) => {
      let lista
  
      switch (category.category) {
        case "iPhone":
          lista = iphoneLista
          break
        case "Samsung":
          lista = samsungLista
          break
        case "Xiaomi":
          lista = xiaomiLista
          break
        case "Other":
          lista = otrosLista
          break
      }
  
      category.models.forEach((model) => {
        const li = document.createElement("li")
        const a = document.createElement("a")
        a.href = "#"
        a.textContent = model
        a.addEventListener("click", (e) => {
          e.preventDefault()
  
          // Seleccionar el modelo
          modelButtons.forEach((btn) => {
            if (btn.dataset.model === model) {
              btn.click()
            }
          })
  
          // Cerrar el modal
          dispositivosModal.style.display = "none"
        })
  
        li.appendChild(a)
        lista.appendChild(li)
      })
    })
  }
  
  // Modificar la navegación entre secciones
  const navLinks = document.querySelectorAll('.nav-button');
  const sections = document.querySelectorAll('.main-section'); // Declare sections here
  
  navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          // Si es dispositivos o configuración, ya tienen sus propios manejadores
          if (link.id === 'nav-dispositivos' || link.id === 'mobile-nav-dispositivos' ||
              link.id === 'nav-configuracion' || link.id === 'mobile-nav-configuracion') {
              return;
          }
          
          e.preventDefault();
          const targetId = link.getAttribute('href').substring(1);
          
          // Si es acerca de, navegar a la página
          if (targetId === 'acerca') {
              window.location.href = 'acerca.html';
              return;
          }
          
          // Para otros enlaces (inicio)
          // Ocultar todas las secciones
          sections.forEach(section => {
              section.classList.remove('active-section');
          });
          
          // Mostrar la sección seleccionada
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
              targetSection.classList.add('active-section');
          }
          
          // Cerrar menú móvil si está abierto
          mobileMenu.classList.remove('active');
      });
  });
  
  // Configuración - Cambio de tema (solo visual, no funcional en esta versión)
  const themeButtons = document.querySelectorAll(".theme-button")
  
  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      themeButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")
    })
  })
  
  // Agregar al final del archivo para manejar el modal de configuración
  const navConfiguracion = document.getElementById('nav-configuracion');
  const mobileNavConfiguracion = document.getElementById('mobile-nav-configuracion');
  const configuracionModal = document.getElementById('configuracionModal');
  
  // Abrir modal de configuración
  navConfiguracion.addEventListener('click', (e) => {
      e.preventDefault();
      configuracionModal.style.display = 'block';
  });
  
  mobileNavConfiguracion.addEventListener('click', (e) => {
      e.preventDefault();
      configuracionModal.style.display = 'block';
      mobileMenu.classList.remove('active');
  });