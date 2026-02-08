// ================================================
// Assetbacm852Roblox - ULTRA ASSET LIBRARY v2.1
// Complete Full Code - Updated System
// ================================================

const ASSETS = [
  {
    name: "ShutdownAnnouncement",
    version: "v1.0.0",
    desc: "Roblox shutdown announcement system with customizable messages and countdown timer.",
    tags: ["SYSTEM", "UTILITY"],
    icon: "⚙️",
    url: "https://drive.google.com/uc?export=download&id=170zWF2bnr3ojk_v7LfCjKbFi4HaVo3ve",
    featured: true,
    new: false
  },
  {
    name: "Drag System",
    version: "v1.0.0",
    desc: "Smooth draggable UI system with snap-to-grid functionality and mobile support.",
    tags: ["UI", "FRAMEWORK"],
    icon: "🖥️",
    url: "https://drive.google.com/uc?export=download&id=194aWbNcfLj7sJL4QRLqTGktsI_Z_KaE-",
    featured: true,
    new: false
  },
  {
    name: "sickeningscustomchat",
    version: "v1.0.0",
    desc: "Custom Roblox chat UI with modern design, emoji support, and chat bubbles.",
    tags: ["UI", "CHAT"],
    icon: "💬",
    url: "https://drive.google.com/uc?export=download&id=10U0if4VIyn40YLzSLGh3Xe6OJBM7wtT7",
    featured: true,
    new: false
  },
  {
    name: "Timestop",
    version: "v0.2.1",
    desc: "Timestop system with visual effects, duration controls, and smooth animations.",
    tags: ["UI", "SYSTEM", "FX"],
    icon: "⏱️",
    url: "https://drive.google.com/uc?export=download&id=1cvBMRmBkheoLA3chFdwwZxtw47jhN6hA",
    featured: true,
    new: true
  }
];

// State Management
let currentFilter = "all";
let currentSort = "name-asc";
let searchTerm = "";

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  renderLibrary();
  initSearch();
  initFilters();
  initSort();
  showToast('Welcome to Assetbacm852Roblox! 🚀', '👋');
});

// ================================================
// RENDER LIBRARY
// ================================================
function renderLibrary() {
  const container = document.getElementById('libraryContent');
  if (!container) return;

  // Filter assets
  let filtered = ASSETS.filter(asset => {
    const matchesSearch = !searchTerm || 
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = currentFilter === "all" || 
      asset.tags.some(tag => tag.toLowerCase() === currentFilter.toLowerCase());
    
    return matchesSearch && matchesFilter;
  });

  // Sort assets
  filtered.sort((a, b) => {
    switch(currentSort) {
      case "name-asc": return a.name.localeCompare(b.name);
      case "name-desc": return b.name.localeCompare(a.name);
      case "newest": return (b.new ? 1 : 0) - (a.new ? 1 : 0);
      case "oldest": return (a.new ? 1 : 0) - (b.new ? 1 : 0);
      default: return 0;
    }
  });

  // Build HTML
  let html = `
    <div style="margin-bottom: 25px;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px; margin-bottom: 20px;">
        <div style="flex: 1; min-width: 280px;">
          <input 
            type="text" 
            id="searchInput" 
            value="${searchTerm}"
            placeholder="🔍 Search Roblox assets..." 
            style="width: 100%; padding: 14px 18px; background: rgba(0,0,0,0.4); border: 2px solid rgba(0,255,204,0.3); border-radius: 12px; color: #fff; font-size: 14px; font-weight: 600; outline: none; transition: all 0.3s;"
          >
        </div>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <select id="sortSelect" style="padding: 12px 18px; background: rgba(0,0,0,0.4); border: 2px solid rgba(0,255,204,0.3); border-radius: 12px; color: #fff; font-weight: 700; font-size: 13px; cursor: pointer; outline: none;">
            <option value="name-asc" ${currentSort === 'name-asc' ? 'selected' : ''}>Name (A-Z)</option>
            <option value="name-desc" ${currentSort === 'name-desc' ? 'selected' : ''}>Name (Z-A)</option>
            <option value="newest" ${currentSort === 'newest' ? 'selected' : ''}>Newest First</option>
            <option value="oldest" ${currentSort === 'oldest' ? 'selected' : ''}>Oldest First</option>
          </select>
        </div>
      </div>

      <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 15px;">
        <button class="filter-btn ${currentFilter === 'all' ? 'active' : ''}" data-filter="all">📋 All (${ASSETS.length})</button>
        <button class="filter-btn ${currentFilter === 'ui' ? 'active' : ''}" data-filter="ui">🖥️ UI</button>
        <button class="filter-btn ${currentFilter === 'system' ? 'active' : ''}" data-filter="system">⚙️ System</button>
        <button class="filter-btn ${currentFilter === 'chat' ? 'active' : ''}" data-filter="chat">💬 Chat</button>
        <button class="filter-btn ${currentFilter === 'fx' ? 'active' : ''}" data-filter="fx">✨ FX</button>
      </div>

      <div style="padding: 12px 18px; background: rgba(0,255,204,0.1); border: 2px solid rgba(0,255,204,0.3); border-radius: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <span style="font-weight: 700; font-size: 13px;">Showing: <strong style="color: #00ffcc;">${filtered.length}</strong> of ${ASSETS.length} assets</span>
        <span style="font-weight: 700; font-size: 13px;">🎯 Ultra Professional Library</span>
      </div>
    </div>

    <style>
      .filter-btn {
        padding: 12px 20px;
        background: rgba(255,255,255,0.05);
        border: 2px solid rgba(255,255,255,0.1);
        border-radius: 12px;
        color: #fff;
        font-weight: 700;
        font-size: 13px;
        cursor: pointer;
        transition: all 0.3s;
      }
      .filter-btn:hover {
        background: rgba(255,255,255,0.1);
        border-color: rgba(0,255,204,0.5);
        transform: translateY(-2px);
      }
      .filter-btn.active {
        background: linear-gradient(135deg, #00ffcc, #008cff);
        color: #000;
        border: none;
        box-shadow: 0 6px 20px rgba(0,255,204,0.5);
      }

      .asset-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 20px;
        margin-top: 25px;
      }

      .asset-card {
        background: rgba(10,13,21,0.9);
        border: 2px solid rgba(0,255,204,0.3);
        border-radius: 20px;
        padding: 25px;
        backdrop-filter: blur(20px);
        transition: all 0.4s;
        animation: cardFadeIn 0.5s ease backwards;
      }

      @keyframes cardFadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .asset-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 15px 50px rgba(0,255,204,0.3);
        border-color: #00ffcc;
      }

      .asset-header {
        display: flex;
        gap: 15px;
        margin-bottom: 15px;
      }

      .asset-icon {
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, rgba(0,255,204,0.2), rgba(0,140,255,0.2));
        border: 2px solid rgba(0,255,204,0.4);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        flex-shrink: 0;
        transition: 0.3s;
      }

      .asset-card:hover .asset-icon {
        transform: scale(1.1) rotate(10deg);
      }

      .asset-info {
        flex: 1;
      }

      .asset-name {
        font-size: 20px;
        font-weight: 900;
        color: #00ffcc;
        margin-bottom: 5px;
        line-height: 1.2;
      }

      .asset-version {
        font-size: 12px;
        color: rgba(255,255,255,0.6);
        font-weight: 700;
      }

      .asset-desc {
        font-size: 14px;
        color: rgba(255,255,255,0.7);
        line-height: 1.5;
        margin-bottom: 15px;
      }

      .asset-tags {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 15px;
      }

      .asset-tag {
        padding: 6px 12px;
        background: rgba(0,255,204,0.15);
        border: 1px solid rgba(0,255,204,0.3);
        border-radius: 8px;
        font-size: 11px;
        font-weight: 700;
        color: #00ffcc;
        transition: 0.3s;
      }

      .asset-tag:hover {
        background: rgba(0,255,204,0.25);
        transform: scale(1.05);
      }

      .download-btn {
        width: 100%;
        padding: 14px;
        background: linear-gradient(135deg, #00ffcc, #008cff);
        border: none;
        border-radius: 12px;
        color: #000;
        font-weight: 900;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 6px 20px rgba(0,255,204,0.4);
      }

      .download-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(0,255,204,0.6);
      }

      .download-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
      }

      .empty-state {
        text-align: center;
        padding: 60px 20px;
        color: rgba(255,255,255,0.5);
      }

      .empty-icon {
        font-size: 60px;
        margin-bottom: 15px;
        opacity: 0.5;
        animation: float 3s ease-in-out infinite;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }

      @media (max-width: 768px) {
        .asset-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  `;

  // Empty state or asset cards
  if (filtered.length === 0) {
    html += `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3 style="font-size: 20px; margin-bottom: 8px; color: #fff;">No assets found</h3>
        <p>Try adjusting your search or filters</p>
      </div>
    `;
  } else {
    html += '<div class="asset-grid">';
    
    filtered.forEach((asset, index) => {
      html += `
        <div class="asset-card" style="animation-delay: ${index * 0.05}s;">
          <div class="asset-header">
            <div class="asset-icon">${asset.icon}</div>
            <div class="asset-info">
              <div class="asset-name">${asset.name}</div>
              <div class="asset-version">${asset.version}</div>
            </div>
          </div>
          <div class="asset-desc">${asset.desc}</div>
          <div class="asset-tags">
            ${asset.tags.map(tag => `<span class="asset-tag">${tag}</span>`).join('')}
            ${asset.featured ? '<span class="asset-tag" style="background: rgba(255,200,0,0.2); border-color: rgba(255,200,0,0.5); color: #ffcc00;">⭐ FEATURED</span>' : ''}
            ${asset.new ? '<span class="asset-tag" style="background: rgba(0,255,100,0.2); border-color: rgba(0,255,100,0.5); color: #00ff88;">🆕 NEW</span>' : ''}
          </div>
          <button class="download-btn" onclick="downloadAsset('${asset.name.replace(/'/g, "\\'")}', '${asset.url}', this)">
            ⬇ DOWNLOAD
          </button>
        </div>
      `;
    });
    
    html += '</div>';
  }

  container.innerHTML = html;

  // Re-initialize after render
  initSearch();
  initFilters();
  initSort();
}

// ================================================
// SEARCH FUNCTIONALITY
// ================================================
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  let debounceTimer;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchTerm = e.target.value.trim();
      renderLibrary();
      if (searchTerm) {
        showToast(`Searching for: "${searchTerm}"`, '🔍');
      }
    }, 300);
  });

  searchInput.addEventListener('focus', (e) => {
    e.target.style.borderColor = '#00ffcc';
    e.target.style.boxShadow = '0 0 20px rgba(0,255,204,0.3)';
  });

  searchInput.addEventListener('blur', (e) => {
    e.target.style.borderColor = 'rgba(0,255,204,0.3)';
    e.target.style.boxShadow = 'none';
  });
}

// ================================================
// FILTER FUNCTIONALITY
// ================================================
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
      renderLibrary();
      showToast(`Filter: ${btn.textContent.trim()}`, '🔍');
    });
  });
}

// ================================================
// SORT FUNCTIONALITY
// ================================================
function initSort() {
  const sortSelect = document.getElementById('sortSelect');
  if (!sortSelect) return;

  sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderLibrary();
    showToast(`Sorted: ${e.target.options[e.target.selectedIndex].text}`, '🔄');
  });
}

// ================================================
// DOWNLOAD ASSET
// ================================================
function downloadAsset(name, url, btn) {
  if (btn.disabled) return;
  
  btn.disabled = true;
  const originalText = btn.textContent;
  btn.textContent = '⏳ OPENING...';

  setTimeout(() => {
    try {
      // Try to open download link
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        throw new Error('Popup blocked');
      }
      
      btn.textContent = '✓ OPENED';
      btn.style.background = 'rgba(0,255,204,0.3)';
      btn.style.color = '#00ffcc';
      
      showToast(`${name} download started! Check your downloads.`, '⬇');
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '#000';
        btn.disabled = false;
      }, 2500);
      
    } catch (error) {
      console.error('Download error:', error);
      
      // Fallback method
      try {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        btn.textContent = '✓ STARTED';
        btn.style.background = 'rgba(0,255,204,0.3)';
        showToast(`${name} download started via fallback!`, '⬇');
      } catch (fallbackError) {
        btn.textContent = '❌ ERROR';
        btn.style.background = 'rgba(255,60,60,0.3)';
        showToast('Download failed. Please check popup blocker settings.', '❌');
      }
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '#000';
        btn.disabled = false;
      }, 2500);
    }
  }, 600);
}

// ================================================
// TOAST NOTIFICATION
// ================================================
let toastTimer;

function showToast(msg, icon = '✓') {
  const toast = document.getElementById('toast');
  const toastIcon = document.getElementById('toastIcon');
  const toastMsg = document.getElementById('toastMsg');
  
  if (!toast) return;
  
  clearTimeout(toastTimer);
  
  toastIcon.textContent = icon;
  toastMsg.textContent = msg;
  toast.classList.add('show');
  
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ================================================
// CONSOLE LOG
// ================================================
console.log('%c📦 Assetbacm852Roblox Library', 'color: #00ffcc; font-size: 18px; font-weight: bold;');
console.log(`%cTotal Assets: ${ASSETS.length}`, 'color: #008cff; font-size: 14px;');
console.log('%cUltra Professional v2.1', 'color: #8c00ff; font-size: 14px;');
