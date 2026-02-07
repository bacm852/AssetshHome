// =========================================
// ULTRA ASSETS LIBRARY v2.1.1 - Scripts.js
// =========================================

// Asset Database
const ASSETS = [
  {
    name: "ShutdownAnnouncement",
    version: "v1.0.0",
    desc: "Roblox shutdown announcement system with customizable messages.",
    tags: ["SYSTEM"],
    icon: "⚙️",
    url: "https://drive.google.com/uc?export=download&id=170zWF2bnr3ojk_v7LfCjKbFi4HaVo3ve",
    featured: true,
    new: false
  },
  {
    name: "Drag System",
    version: "v1.0.0",
    desc: "Smooth draggable UI system with snap-to-grid functionality.",
    tags: ["UI"],
    icon: "🖥️",
    url: "https://drive.google.com/uc?export=download&id=194aWbNcfLj7sJL4QRLqTGktsI_Z_KaE-",
    featured: true,
    new: false
  },
  {
    name: "sickeningscustomchat",
    version: "v1.0.0",
    desc: "Custom Roblox chat UI with modern design and emoji support.",
    tags: ["UI"],
    icon: "💬",
    url: "https://drive.google.com/uc?export=download&id=10U0if4VIyn40YLzSLGh3Xe6OJBM7wtT7",
    featured: true,
    new: false
  },
  {
    name: "Timestop",
    version: "v0.2.1",
    desc: "Timestop system with visual effects and duration controls.",
    tags: ["UI", "SYSTEM"],
    icon: "⏱️",
    url: "https://drive.google.com/uc?export=download&id=1cvBMRmBkheoLA3chFdwwZxtw47jhN6hA",
    featured: true,
    new: true
  }
];

// State Management
let currentFilter = "all";
let currentSort = "name-asc";
let currentView = "grid";
let toastTimeout = null;
let settings = {
  colorMode: "dark",
  accentColor: "#00ffcc",
  defaultView: "grid",
  cardsPerRow: 3,
  animations: true,
  toastNotifications: true,
  soundEffects: false,
  autoRefresh: false,
  cacheDownloads: true,
  ultraPerformance: true
};

// =========================================
// SETTINGS MANAGEMENT
// =========================================

function loadSettings() {
  try {
    const saved = localStorage.getItem("ultraLibrarySettings");
    if (saved) {
      settings = { ...settings, ...JSON.parse(saved) };
      applySettings();
    }
  } catch (error) {
    console.error("Error loading settings:", error);
  }
}

function saveSettingsToStorage() {
  try {
    localStorage.setItem("ultraLibrarySettings", JSON.stringify(settings));
  } catch (error) {
    console.error("Error saving settings:", error);
  }
}

function applySettings() {
  if (settings.colorMode === "light") {
    document.body.style.filter = "invert(1) hue-rotate(180deg)";
  }
  
  const grid = document.getElementById("assetsList");
  if (grid && settings.cardsPerRow) {
    grid.style.gridTemplateColumns = `repeat(auto-fill, minmax(${300/settings.cardsPerRow}px, 1fr))`;
  }
  
  const cardsPerRowSlider = document.getElementById("cardsPerRow");
  const cardsPerRowValue = document.getElementById("cardsPerRowValue");
  if (cardsPerRowSlider && cardsPerRowValue) {
    cardsPerRowSlider.value = settings.cardsPerRow;
    cardsPerRowValue.textContent = settings.cardsPerRow;
  }
}

// =========================================
// PARTICLES INITIALIZATION
// =========================================

function initParticles() {
  try {
    if (typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: settings.accentColor || '#00ffcc' },
          shape: { type: 'circle' },
          opacity: { value: 0.5, random: true },
          size: { value: 3, random: true },
          line_linked: { 
            enable: true, 
            distance: 150, 
            color: settings.accentColor || '#00ffcc', 
            opacity: 0.2, 
            width: 1 
          },
          move: { 
            enable: true, 
            speed: 2, 
            direction: 'none', 
            random: true, 
            out_mode: 'out' 
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: { 
            onhover: { enable: true, mode: 'repulse' }, 
            resize: true 
          },
          modes: { 
            repulse: { distance: 100, duration: 0.4 } 
          }
        }
      });
    }
  } catch (error) {
    console.error("Error initializing particles:", error);
  }
}

// =========================================
// LOADING SCREEN
// =========================================

function initLoading() {
  const loadingScreen = document.getElementById("loadingScreen");
  const loadingProgress = document.getElementById("loadingProgress");
  const loadingPercentage = document.getElementById("loadingPercentage");
  const loadingStatus = document.getElementById("loadingStatus");
  const mainModal = document.getElementById("mainModal");
  
  if (!loadingScreen || !loadingProgress || !loadingPercentage || !loadingStatus || !mainModal) {
    console.error("Loading elements not found");
    return;
  }
  
  const statuses = [
    "Initializing system...",
    "Loading assets...",
    "Configuring UI...",
    "Optimizing performance...",
    "Almost ready...",
    "Ready to launch!"
  ];
  
  let progress = 0;
  let statusIndex = 0;
  
  const interval = setInterval(() => {
    progress += Math.random() * 8 + 4;
    if (progress > 100) progress = 100;
    
    loadingProgress.style.width = progress + "%";
    loadingPercentage.textContent = Math.floor(progress) + "%";
    
    const newStatusIndex = Math.floor((progress / 100) * statuses.length);
    if (newStatusIndex !== statusIndex && newStatusIndex < statuses.length) {
      statusIndex = newStatusIndex;
      loadingStatus.textContent = statuses[statusIndex];
    }
    
    if (progress >= 100) {
      clearInterval(interval);
      
      setTimeout(() => {
        loadingScreen.classList.add("hide");
        mainModal.classList.add("show");
        
        setTimeout(() => {
          loadingScreen.style.display = "none";
          initParticles();
        }, 800);
      }, 500);
    }
  }, 100);
}

// =========================================
// TOAST NOTIFICATIONS
// =========================================

function showToast(message, icon = "✓") {
  if (!settings.toastNotifications) return;
  
  const toast = document.getElementById("toast");
  const toastIcon = toast.querySelector(".toast-icon");
  const toastMessage = document.getElementById("toastMessage");
  
  if (!toast || !toastIcon || !toastMessage) return;
  
  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }
  
  toastIcon.textContent = icon;
  toastMessage.textContent = message;
  toast.classList.add("show");
  
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
    toastTimeout = null;
  }, 3500);
}

// =========================================
// CATEGORY DETECTION
// =========================================

function guessCategory(asset) {
  const name = (asset.name || "").toLowerCase();
  const desc = (asset.desc || "").toLowerCase();
  const tags = (asset.tags || []).join(" ").toLowerCase();
  const combined = `${name} ${desc} ${tags}`;
  
  if (combined.includes("chat") || combined.includes("ui") || combined.includes("drag") || combined.includes("gui")) return "ui";
  if (combined.includes("security") || combined.includes("whitelist") || combined.includes("ban") || combined.includes("admin")) return "security";
  if (combined.includes("avatar") || combined.includes("camera") || combined.includes("character")) return "avatar";
  if (combined.includes("donation") || combined.includes("economy") || combined.includes("money") || combined.includes("shop")) return "economy";
  
  return "system";
}

// =========================================
// DOWNLOAD HANDLER
// =========================================

function handleDownload(asset, btn) {
  if (btn.disabled) return;
  btn.disabled = true;
  
  btn.textContent = "⏳ OPENING...";
  btn.style.cursor = "wait";
  
  setTimeout(() => {
    try {
      const newWindow = window.open(asset.url, "_blank", "noopener,noreferrer");
      
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        throw new Error("Popup blocked");
      }
      
      btn.textContent = "✓ OPENED";
      btn.style.background = "rgba(0,255,204,0.3)";
      btn.style.borderColor = "#00ffcc";
      
      showToast(`${asset.name} download started! Check your downloads.`, "⬇");
      
      setTimeout(() => {
        btn.textContent = "⬇ DOWNLOAD";
        btn.style.background = "";
        btn.style.borderColor = "";
        btn.style.cursor = "pointer";
        btn.disabled = false;
      }, 3000);
    } catch (error) {
      console.error("Download error:", error);
      
      try {
        const link = document.createElement('a');
        link.href = asset.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.download = asset.name || 'download';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        btn.textContent = "✓ DOWNLOAD STARTED";
        btn.style.background = "rgba(0,255,204,0.3)";
        showToast(`${asset.name} download started via fallback method!`, "⬇");
      } catch (fallbackError) {
        btn.textContent = "❌ ERROR";
        btn.style.background = "rgba(255,60,60,0.3)";
        showToast("Download failed. Please check your popup blocker settings.", "❌");
        console.error("Fallback download error:", fallbackError);
      }
      
      setTimeout(() => {
        btn.textContent = "⬇ DOWNLOAD";
        btn.style.background = "";
        btn.style.borderColor = "";
        btn.style.cursor = "pointer";
        btn.disabled = false;
      }, 3000);
    }
  }, 600);
}

// =========================================
// RENDER ASSETS
// =========================================

function render() {
  const list = document.getElementById("assetsList");
  const searchBox = document.getElementById("search");
  const emptyState = document.getElementById("emptyState");
  const showingCount = document.getElementById("showingCount");
  const assetCount = document.getElementById("assetCount");
  const featuredCount = document.getElementById("featuredCount");
  const newCount = document.getElementById("newCount");

  if (!list || !searchBox) {
    console.error("Required elements not found");
    return;
  }

  const search = searchBox.value.trim().toLowerCase();
  const fragment = document.createDocumentFragment();

  let filtered = ASSETS.filter(a => {
    const cat = guessCategory(a);
    const okFilter = (currentFilter === "all") || (cat === currentFilter);
    const okSearch =
      (a.name || "").toLowerCase().includes(search) ||
      (a.desc || "").toLowerCase().includes(search) ||
      (a.tags || []).join(" ").toLowerCase().includes(search);

    return okFilter && okSearch;
  });

  filtered.sort((a, b) => {
    switch(currentSort) {
      case "name-asc":
        return (a.name || "").localeCompare(b.name || "");
      case "name-desc":
        return (b.name || "").localeCompare(a.name || "");
      case "newest":
        return (b.new ? 1 : 0) - (a.new ? 1 : 0);
      case "oldest":
        return (a.new ? 1 : 0) - (b.new ? 1 : 0);
      default:
        return 0;
    }
  });

  if (assetCount) assetCount.textContent = ASSETS.length;
  if (showingCount) showingCount.textContent = filtered.length;
  if (featuredCount) featuredCount.textContent = ASSETS.filter(a => a.featured).length;
  if (newCount) newCount.textContent = ASSETS.filter(a => a.new).length;

  if (filtered.length === 0) {
    list.style.display = "none";
    if (emptyState) emptyState.style.display = "flex";
    return;
  } else {
    list.style.display = "grid";
    if (emptyState) emptyState.style.display = "none";
  }

  filtered.forEach((asset, index) => {
    const cat = guessCategory(asset);

    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("role", "listitem");
    if (settings.animations) {
      card.style.animationDelay = `${index * 0.06}s`;
    }

    const cardIconDiv = document.createElement("div");
    cardIconDiv.className = "cardIcon";
    cardIconDiv.textContent = asset.icon || "⚙️";
    cardIconDiv.setAttribute("aria-hidden", "true");
    
    const cardInfoDiv = document.createElement("div");
    
    const cardNameDiv = document.createElement("div");
    cardNameDiv.className = "cardName";
    cardNameDiv.textContent = asset.name || "Unnamed Asset";
    
    const cardVerDiv = document.createElement("div");
    cardVerDiv.className = "cardVer";
    cardVerDiv.textContent = asset.version || "";
    
    cardInfoDiv.appendChild(cardNameDiv);
    cardInfoDiv.appendChild(cardVerDiv);
    
    const cardTopWrapper = document.createElement("div");
    cardTopWrapper.className = "cardTop";
    cardTopWrapper.appendChild(cardIconDiv);
    cardTopWrapper.appendChild(cardInfoDiv);
    
    const cardDescDiv = document.createElement("div");
    cardDescDiv.className = "cardDesc";
    cardDescDiv.textContent = asset.desc || "";
    
    const tagsDiv = document.createElement("div");
    tagsDiv.className = "tags";
    
    const catTag = document.createElement("span");
    catTag.className = "tag";
    catTag.textContent = cat.toUpperCase();
    tagsDiv.appendChild(catTag);
    
    (asset.tags || []).forEach(t => {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = t;
      tagsDiv.appendChild(tag);
    });
    
    if (asset.featured) {
      const featTag = document.createElement("span");
      featTag.className = "tag";
      featTag.textContent = "⭐ FEATURED";
      tagsDiv.appendChild(featTag);
    }
    
    if (asset.new) {
      const newTag = document.createElement("span");
      newTag.className = "tag";
      newTag.textContent = "🆕 NEW";
      tagsDiv.appendChild(newTag);
    }
    
    const contentDiv = document.createElement("div");
    contentDiv.appendChild(cardTopWrapper);
    contentDiv.appendChild(cardDescDiv);
    contentDiv.appendChild(tagsDiv);
    
    const downloadBtn = document.createElement("button");
    downloadBtn.className = "downloadBtn";
    downloadBtn.textContent = "⬇ DOWNLOAD";
    downloadBtn.setAttribute("aria-label", `Download ${asset.name}`);
    
    downloadBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handleDownload(asset, downloadBtn);
    });
    
    card.appendChild(contentDiv);
    card.appendChild(downloadBtn);
    fragment.appendChild(card);
  });

  list.innerHTML = "";
  list.appendChild(fragment);
}

// =========================================
// EVENT LISTENERS
// =========================================

function initEventListeners() {
  // Filter buttons
  document.querySelectorAll(".pill").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".pill").forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      currentFilter = btn.dataset.filter;
      render();
      showToast(`Filtered by: ${btn.textContent.trim()}`, "🔍");
    });
  });

  // Sort select
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      render();
      const selectedText = e.target.options[e.target.selectedIndex].text;
      showToast(`Sorted by: ${selectedText}`, "🔄");
    });
  }

  // Search input
  const searchInput = document.getElementById("search");
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener("input", () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        render();
      }, 300);
    });
  }

  // Clear search
  const clearSearch = document.getElementById("clearSearch");
  if (clearSearch && searchInput) {
    clearSearch.addEventListener("click", () => {
      searchInput.value = "";
      searchInput.focus();
      render();
      showToast("Search cleared", "✕");
    });
  }

  // Refresh button
  const refreshBtn = document.getElementById("refreshBtn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      refreshBtn.style.animation = "spin 0.8s ease";
      render();
      showToast("Library refreshed!", "🔄");
      setTimeout(() => {
        refreshBtn.style.animation = "";
      }, 800);
    });
  }

  // Settings modal
  const settingsBtn = document.getElementById("settingsBtn");
  const settingsModal = document.getElementById("settingsModal");
  const settingsClose = document.getElementById("settingsClose");

  if (settingsBtn && settingsModal) {
    settingsBtn.addEventListener("click", () => {
      settingsModal.classList.add("show");
      document.body.style.overflow = "hidden";
    });
  }

  if (settingsClose && settingsModal) {
    settingsClose.addEventListener("click", () => {
      settingsModal.classList.remove("show");
      document.body.style.overflow = "";
    });
  }

  if (settingsModal) {
    settingsModal.addEventListener("click", (e) => {
      if (e.target === settingsModal) {
        settingsModal.classList.remove("show");
        document.body.style.overflow = "";
      }
    });
  }

  // Cards per row slider
  const cardsPerRow = document.getElementById("cardsPerRow");
  const cardsPerRowValue = document.getElementById("cardsPerRowValue");
  if (cardsPerRow && cardsPerRowValue) {
    cardsPerRow.addEventListener("input", (e) => {
      const value = e.target.value;
      cardsPerRowValue.textContent = value;
      settings.cardsPerRow = parseInt(value);
      e.target.setAttribute("aria-valuenow", value);
    });
  }

  // Save settings
  const saveSettings = document.getElementById("saveSettings");
  if (saveSettings && settingsModal) {
    saveSettings.addEventListener("click", () => {
      saveSettingsToStorage();
      applySettings();
      settingsModal.classList.remove("show");
      document.body.style.overflow = "";
      showToast("Settings saved successfully!", "✓");
    });
  }

  // Reset settings
  const resetSettings = document.getElementById("resetSettings");
  if (resetSettings) {
    resetSettings.addEventListener("click", () => {
      if (confirm("Reset all settings to default? This cannot be undone.")) {
        settings = {
          colorMode: "dark",
          accentColor: "#00ffcc",
          defaultView: "grid",
          cardsPerRow: 3,
          animations: true,
          toastNotifications: true,
          soundEffects: false,
          autoRefresh: false,
          cacheDownloads: true,
          ultraPerformance: true
        };
        saveSettingsToStorage();
        applySettings();
        showToast("Settings reset to default!", "🔄");
        location.reload();
      }
    });
  }

  // Color picker
  document.querySelectorAll(".color-option").forEach(option => {
    option.addEventListener("click", () => {
      document.querySelectorAll(".color-option").forEach(o => {
        o.classList.remove("active");
        o.setAttribute("aria-checked", "false");
        o.setAttribute("tabindex", "-1");
      });
      option.classList.add("active");
      option.setAttribute("aria-checked", "true");
      option.setAttribute("tabindex", "0");
      settings.accentColor = option.dataset.color;
      showToast(`Accent color changed!`, "🎨");
    });
    
    option.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        option.click();
      }
    });
  });

  // View toggle
  const viewToggle = document.getElementById("viewToggle");
  if (viewToggle) {
    viewToggle.addEventListener("click", () => {
      const grid = document.getElementById("assetsList");
      if (!grid) return;
      
      if (currentView === "grid") {
        currentView = "list";
        grid.style.gridTemplateColumns = "1fr";
        viewToggle.querySelector(".viewIcon").textContent = "☰";
        showToast("List view enabled", "☰");
      } else {
        currentView = "grid";
        grid.style.gridTemplateColumns = "repeat(auto-fill, minmax(min(320px, 100%), 1fr))";
        viewToggle.querySelector(".viewIcon").textContent = "▦";
        showToast("Grid view enabled", "▦");
      }
    });
  }

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && settingsModal && settingsModal.classList.contains("show")) {
      settingsModal.classList.remove("show");
      document.body.style.overflow = "";
      return;
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === "f" && searchInput) {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
      showToast("Search focused", "🔍");
      return;
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === "r" && refreshBtn) {
      e.preventDefault();
      refreshBtn.click();
      return;
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === "," && settingsModal) {
      e.preventDefault();
      settingsModal.classList.add("show");
      document.body.style.overflow = "hidden";
      return;
    }
  });
}

// =========================================
// INITIALIZATION
// =========================================

window.addEventListener("DOMContentLoaded", () => {
  try {
    loadSettings();
    initLoading();
    initEventListeners();
    
    setTimeout(() => {
      render();
      showToast("Welcome to ULTRA Assets Library v2.1.1! 🚀", "👋");
    }, 2500);
  } catch (error) {
    console.error("Initialization error:", error);
    showToast("Error loading library. Please refresh.", "❌");
  }
});

// Global error handler
window.addEventListener("error", (e) => {
  console.error("Global error:", e.error);
  showToast("An error occurred. Please refresh the page.", "❌");
});

// Console info
console.log("%c📦 Ultra Assets Library v2.1.1", "color: #00ffcc; font-size: 20px; font-weight: bold;");
console.log("%cDownload handler with fallback support", "color: #008cff; font-size: 14px;");
console.log("%cTimestop fix applied ✓", "color: #00ff88; font-size: 14px;");
