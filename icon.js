// Icon.js - Icon Management System

// Icon Library
const IconLibrary = {
  // Category Icons
  categories: {
    all: '📋',
    ui: '🖥️',
    system: '⚙️',
    security: '🔒',
    avatar: '👤',
    economy: '💰'
  },
  
  // Status Icons
  status: {
    success: '✓',
    error: '✕',
    warning: '⚠️',
    info: 'ℹ️',
    loading: '⏳',
    pending: '⏸️'
  },
  
  // Action Icons
  actions: {
    download: '⬇',
    upload: '⬆',
    refresh: '🔄',
    settings: '⚙️',
    search: '🔍',
    filter: '🔽',
    sort: '↕️',
    close: '✕',
    edit: '✏️',
    delete: '🗑️',
    copy: '📋',
    share: '📤',
    link: '🔗',
    star: '⭐',
    heart: '❤️',
    bookmark: '🔖'
  },
  
  // Feature Icons
  features: {
    new: '🆕',
    hot: '🔥',
    trending: '📈',
    featured: '⭐',
    premium: '💎',
    verified: '✓',
    beta: '🅱️',
    alpha: '🅰️'
  },
  
  // File Type Icons
  fileTypes: {
    lua: '📜',
    js: '📄',
    json: '📋',
    txt: '📝',
    zip: '📦',
    image: '🖼️',
    video: '🎬',
    audio: '🎵',
    code: '💻'
  },
  
  // Asset Type Icons
  assetTypes: {
    script: '📜',
    module: '📦',
    plugin: '🔌',
    tool: '🛠️',
    template: '📋',
    model: '🎨',
    sound: '🔊',
    texture: '🖼️'
  }
};

// Icon Manager Class
class IconManager {
  constructor() {
    this.customIcons = {};
    this.iconCache = new Map();
  }

  // Get icon by category and key
  getIcon(category, key) {
    if (IconLibrary[category] && IconLibrary[category][key]) {
      return IconLibrary[category][key];
    }
    return '📦'; // Default fallback
  }

  // Get category icon
  getCategoryIcon(category) {
    return this.getIcon('categories', category);
  }

  // Get status icon
  getStatusIcon(status) {
    return this.getIcon('status', status);
  }

  // Get action icon
  getActionIcon(action) {
    return this.getIcon('actions', action);
  }

  // Add custom icon
  addCustomIcon(key, icon) {
    this.customIcons[key] = icon;
  }

  // Get custom icon
  getCustomIcon(key) {
    return this.customIcons[key] || '📦';
  }

  // Create icon element
  createIconElement(icon, className = 'icon') {
    const element = document.createElement('span');
    element.className = className;
    element.textContent = icon;
    return element;
  }

  // Create animated icon
  createAnimatedIcon(icon, animation = 'spin') {
    const element = this.createIconElement(icon);
    element.style.animation = `${animation} 1s ease-in-out infinite`;
    return element;
  }

  // Random icon from category
  getRandomIcon(category) {
    const icons = IconLibrary[category];
    if (!icons) return '📦';
    
    const keys = Object.keys(icons);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return icons[randomKey];
  }

  // Icon with badge
  createIconWithBadge(icon, badge) {
    const container = document.createElement('div');
    container.className = 'icon-with-badge';
    container.style.position = 'relative';
    container.style.display = 'inline-block';
    
    const iconElement = this.createIconElement(icon);
    const badgeElement = document.createElement('span');
    badgeElement.className = 'icon-badge';
    badgeElement.textContent = badge;
    
    container.appendChild(iconElement);
    container.appendChild(badgeElement);
    
    return container;
  }

  // Cache icon
  cacheIcon(key, icon) {
    this.iconCache.set(key, icon);
  }

  // Get cached icon
  getCachedIcon(key) {
    return this.iconCache.get(key);
  }

  // Clear icon cache
  clearCache() {
    this.iconCache.clear();
  }
}

// Icon Animation Utilities
const IconAnimations = {
  // Spin animation
  spin(element) {
    element.style.animation = 'spin 1s linear infinite';
  },

  // Bounce animation
  bounce(element) {
    element.style.animation = 'bounce 1s ease-in-out infinite';
  },

  // Pulse animation
  pulse(element) {
    element.style.animation = 'pulse 2s ease-in-out infinite';
  },

  // Shake animation
  shake(element) {
    element.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
      element.style.animation = '';
    }, 500);
  },

  // Tada animation
  tada(element) {
    element.style.animation = 'tada 1s ease-in-out';
    setTimeout(() => {
      element.style.animation = '';
    }, 1000);
  },

  // Stop animation
  stop(element) {
    element.style.animation = '';
  }
};

// Icon Color Utilities
const IconColors = {
  success: '#00ffcc',
  error: '#ff6060',
  warning: '#ffaa00',
  info: '#008cff',
  primary: '#00ffcc',
  secondary: '#008cff',
  accent: '#8c00ff',

  // Apply color to icon
  colorize(element, color) {
    element.style.color = this[color] || color;
    element.style.filter = `drop-shadow(0 0 10px ${this[color] || color})`;
  },

  // Apply gradient to icon
  gradient(element, colors = ['#00ffcc', '#008cff']) {
    element.style.background = `linear-gradient(135deg, ${colors.join(', ')})`;
    element.style.webkitBackgroundClip = 'text';
    element.style.webkitTextFillColor = 'transparent';
    element.style.backgroundClip = 'text';
  }
};

// Icon Size Utilities
const IconSizes = {
  tiny: '16px',
  small: '20px',
  medium: '24px',
  large: '32px',
  xlarge: '48px',
  huge: '64px',

  // Apply size to icon
  resize(element, size) {
    element.style.fontSize = this[size] || size;
  }
};

// Dynamic Icon Loader
class DynamicIconLoader {
  constructor() {
    this.loadedIcons = new Set();
  }

  // Load icon from URL
  async loadIcon(url, key) {
    try {
      const response = await fetch(url);
      const icon = await response.text();
      iconManager.addCustomIcon(key, icon);
      this.loadedIcons.add(key);
      return icon;
    } catch (error) {
      console.error(`Failed to load icon: ${key}`, error);
      return null;
    }
  }

  // Load multiple icons
  async loadIcons(iconMap) {
    const promises = Object.entries(iconMap).map(([key, url]) => 
      this.loadIcon(url, key)
    );
    return Promise.all(promises);
  }

  // Check if icon is loaded
  isLoaded(key) {
    return this.loadedIcons.has(key);
  }
}

// Icon Search Utility
class IconSearch {
  constructor() {
    this.searchIndex = this.buildSearchIndex();
  }

  // Build search index
  buildSearchIndex() {
    const index = {};
    
    for (const [category, icons] of Object.entries(IconLibrary)) {
      for (const [key, icon] of Object.entries(icons)) {
        const searchKey = `${category}-${key}`.toLowerCase();
        index[searchKey] = { category, key, icon };
      }
    }
    
    return index;
  }

  // Search icons
  search(query) {
    query = query.toLowerCase();
    const results = [];
    
    for (const [searchKey, data] of Object.entries(this.searchIndex)) {
      if (searchKey.includes(query)) {
        results.push(data);
      }
    }
    
    return results;
  }

  // Get all icons in category
  getByCategory(category) {
    return Object.entries(IconLibrary[category] || {}).map(([key, icon]) => ({
      category,
      key,
      icon
    }));
  }
}

// Icon Tooltip Helper
function addIconTooltip(element, text) {
  element.setAttribute('title', text);
  element.style.cursor = 'help';
  
  element.addEventListener('mouseenter', (e) => {
    const tooltip = document.createElement('div');
    tooltip.className = 'icon-tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
      position: absolute;
      background: rgba(10,13,21,0.95);
      color: white;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      z-index: 40000;
      pointer-events: none;
      border: 1px solid rgba(0,255,204,0.3);
      box-shadow: 0 6px 20px rgba(0,0,0,0.8);
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
    
    element._tooltip = tooltip;
  });
  
  element.addEventListener('mouseleave', () => {
    if (element._tooltip) {
      element._tooltip.remove();
      delete element._tooltip;
    }
  });
}

// Create global instances
const iconManager = new IconManager();
const iconSearch = new IconSearch();
const dynamicIconLoader = new DynamicIconLoader();

// Export for global use
if (typeof window !== 'undefined') {
  window.IconLibrary = IconLibrary;
  window.iconManager = iconManager;
  window.IconAnimations = IconAnimations;
  window.IconColors = IconColors;
  window.IconSizes = IconSizes;
  window.iconSearch = iconSearch;
  window.dynamicIconLoader = dynamicIconLoader;
  window.addIconTooltip = addIconTooltip;
}

// Helper function to update asset icons dynamically
function updateAssetIcons() {
  document.querySelectorAll('.cardIcon').forEach(icon => {
    const assetName = icon.closest('.card')?.querySelector('.cardName')?.textContent;
    if (assetName) {
      // Add animation on hover
      icon.addEventListener('mouseenter', () => {
        IconAnimations.tada(icon);
      });
      
      // Add glow effect
      IconColors.colorize(icon, 'primary');
    }
  });
}

// Auto-update icons when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateAssetIcons);
} else {
  updateAssetIcons();
}

console.log('✓ Icon.js loaded successfully');