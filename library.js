// ================================================
// ULTRA ASSETS LIBRARY - CLEAN & BUG FREE v2.1
// ================================================

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

// State
let currentFilter = "all";
let currentSort = "name-asc";
let searchTerm = "";

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderLibrary();
  initSearch();
  initFilters();
  initSort();
});

// Render Library
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
      default: return 0;
    }
  });

  // Create HTML
  let html = `
    <div style="margin-bottom: 25px;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px; margin-bottom: 20px;">
        <div style="flex: 1; min-width: 300px;">
          <input 
            type="text" 
            id="searchInput" 
            placeholder="🔍 Search assets..." 
            style="width: 100%; padding: 14px 18px; background: rgba(0,0,0,0.4); border: 2px solid rgba(0,255,204,0.3); border-radius: 12px; color: #fff; font-size: 14px; font-weight: 600; outline: none;"
          >
        </div>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <select id="sortSelect" style="padding: 12px 18px; background: rgba(0,0,0,0.4); border: 2px solid rgba(0,255,204,0.3); border-radius: 12px; color: #fff; font-weight: 700; font-size: 13px; cursor: pointer; outline: none;">
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>

      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <button class="filter-btn ${currentFilter === 'all' ? 'active' : ''}" data-filter="all">📋 All</button>
        <button class="filter-btn ${currentFilter === 'ui' ? 'active' : ''}" data-filter="ui">🖥️ UI</button>
        <button class="filter-btn ${currentFilter === 'system' ? 'active' : ''}" data-filter="system">⚙️ System</button>
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
      }

      .asset-info {
        flex: 1;
      }

      .asset-name {
        font-size: 20px;
        font-weight: 900;
        color: #00ffcc;
        margin-bottom: 5px;
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
      }
    </style>
  `;

  if (filtered.length === 0) {
    html += `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3 style="font-size: 20px; margin-bottom: 8px;">No assets found</h3>
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
          <button class="download-btn" onclick="downloadAsset('${asset.name}', '${asset.url}', this)">
            ⬇ DOWNLOAD
          </button>
        </div>
      `;
    });
    
    html += '</div>';
  }

  container.innerHTML = html;

  // Re-init after render
  initSearch();
  initFilters();
  initSort();
}

// Search
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  searchInput.value = searchTerm;
  
  let debounceTimer;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchTerm = e.target.value.trim();
      renderLibrary();
    }, 300);
  });
}

// Filters
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

// Sort
function initSort() {
  const sortSelect = document.getElementById('sortSelect');
  if (!sortSelect) return;

  sortSelect.value = currentSort;
  
  sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderLibrary();
    showToast(`Sorted: ${e.target.options[e.target.selectedIndex].text}`, '🔄');
  });
}

// Download Asset
function downloadAsset(name, url, btn) {
  if (btn.disabled) return;
  
  btn.disabled = true;
  btn.textContent = '⏳ OPENING...';

  setTimeout(() => {
    try {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        throw new Error('Popup blocked');
      }
      
      btn.textContent = '✓ OPENED';
      btn.style.background = 'rgba(0,255,204,0.3)';
      
      showToast(`${name} download started!`, '⬇');
      
      setTimeout(() => {
        btn.textContent = '⬇ DOWNLOAD';
        btn.style.background = '';
        btn.disabled = false;
      }, 2500);
      
    } catch (error) {
      console.error('Download error:', error);
      
      try {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        btn.textContent = '✓ STARTED';
        showToast(`${name} download started!`, '⬇');
      } catch (fallbackError) {
        btn.textContent = '❌ ERROR';
        btn.style.background = 'rgba(255,60,60,0.3)';
        showToast('Download failed. Check popup blocker.', '❌');
      }
      
      setTimeout(() => {
        btn.textContent = '⬇ DOWNLOAD';
        btn.style.background = '';
        btn.disabled = false;
      }, 2500);
    }
  }, 600);
}

// Toast
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

console.log('%c📦 Assets Library Loaded', 'color: #00ffcc; font-size: 16px; font-weight: bold');
console.log(`%cTotal Assets: ${ASSETS.length}`, 'color: #008cff; font-size: 14px');
