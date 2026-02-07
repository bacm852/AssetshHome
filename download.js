// Download.js - Advanced Download Management System

class DownloadManager {
  constructor() {
    this.downloads = [];
    this.downloadQueue = [];
    this.maxConcurrent = 3;
    this.activeDownloads = 0;
  }

  // Add download to queue
  addDownload(asset) {
    const download = {
      id: Date.now() + Math.random(),
      name: asset.name,
      url: asset.url,
      status: 'pending',
      progress: 0,
      timestamp: new Date()
    };

    this.downloads.push(download);
    this.downloadQueue.push(download);
    this.processQueue();
    
    return download.id;
  }

  // Process download queue
  processQueue() {
    while (this.activeDownloads < this.maxConcurrent && this.downloadQueue.length > 0) {
      const download = this.downloadQueue.shift();
      this.startDownload(download);
    }
  }

  // Start individual download
  startDownload(download) {
    this.activeDownloads++;
    download.status = 'downloading';

    // Simulate download progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress > 100) progress = 100;

      download.progress = Math.floor(progress);
      this.updateDownloadUI(download);

      if (progress >= 100) {
        clearInterval(interval);
        this.completeDownload(download);
      }
    }, 200);

    // Open actual download link
    window.open(download.url, '_blank');
  }

  // Complete download
  completeDownload(download) {
    download.status = 'completed';
    download.progress = 100;
    this.activeDownloads--;
    this.updateDownloadUI(download);
    this.processQueue();

    // Show completion notification
    if (typeof showToast !== 'undefined') {
      showToast(`${download.name} downloaded successfully!`, '✓');
    }
  }

  // Update download UI
  updateDownloadUI(download) {
    const event = new CustomEvent('downloadUpdate', { detail: download });
    window.dispatchEvent(event);
  }

  // Get all downloads
  getAllDownloads() {
    return this.downloads;
  }

  // Get download by ID
  getDownload(id) {
    return this.downloads.find(d => d.id === id);
  }

  // Clear completed downloads
  clearCompleted() {
    this.downloads = this.downloads.filter(d => d.status !== 'completed');
  }

  // Cancel download
  cancelDownload(id) {
    const download = this.getDownload(id);
    if (download && download.status === 'downloading') {
      download.status = 'cancelled';
      this.activeDownloads--;
      this.processQueue();
    }
  }
}

// Create global download manager instance
const downloadManager = new DownloadManager();

// Enhanced download function
function initiateDownload(asset) {
  const downloadId = downloadManager.addDownload(asset);
  
  // Create download notification
  createDownloadNotification(asset, downloadId);
  
  return downloadId;
}

// Create download notification element
function createDownloadNotification(asset, downloadId) {
  const notification = document.createElement('div');
  notification.className = 'download-notification';
  notification.id = `download-${downloadId}`;
  
  notification.innerHTML = `
    <div class="download-info">
      <div class="download-icon">${asset.icon || '📦'}</div>
      <div class="download-details">
        <div class="download-name">${asset.name}</div>
        <div class="download-progress-bar">
          <div class="download-progress-fill" id="progress-${downloadId}"></div>
        </div>
        <div class="download-status" id="status-${downloadId}">Starting...</div>
      </div>
      <button class="download-cancel" onclick="downloadManager.cancelDownload(${downloadId})">✕</button>
    </div>
  `;
  
  // Add to download container
  let container = document.getElementById('downloadContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'downloadContainer';
    container.className = 'download-container';
    document.body.appendChild(container);
  }
  
  container.appendChild(notification);
  
  // Listen for download updates
  window.addEventListener('downloadUpdate', (e) => {
    if (e.detail.id === downloadId) {
      updateDownloadNotification(e.detail);
    }
  });
  
  // Auto-remove after completion
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Update download notification
function updateDownloadNotification(download) {
  const progressFill = document.getElementById(`progress-${download.id}`);
  const status = document.getElementById(`status-${download.id}`);
  
  if (progressFill) {
    progressFill.style.width = download.progress + '%';
  }
  
  if (status) {
    if (download.status === 'downloading') {
      status.textContent = `Downloading... ${download.progress}%`;
    } else if (download.status === 'completed') {
      status.textContent = 'Completed ✓';
      status.style.color = '#00ffcc';
    } else if (download.status === 'cancelled') {
      status.textContent = 'Cancelled';
      status.style.color = '#ff6060';
    }
  }
}

// Download history management
const DownloadHistory = {
  storageKey: 'assetDownloadHistory',
  
  add(asset) {
    const history = this.get();
    history.unshift({
      name: asset.name,
      url: asset.url,
      timestamp: new Date().toISOString(),
      version: asset.version
    });
    
    // Keep only last 50 downloads
    if (history.length > 50) {
      history.splice(50);
    }
    
    localStorage.setItem(this.storageKey, JSON.stringify(history));
  },
  
  get() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    } catch {
      return [];
    }
  },
  
  clear() {
    localStorage.removeItem(this.storageKey);
  },
  
  remove(index) {
    const history = this.get();
    history.splice(index, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(history));
  }
};

// Export for global use
if (typeof window !== 'undefined') {
  window.downloadManager = downloadManager;
  window.initiateDownload = initiateDownload;
  window.DownloadHistory = DownloadHistory;
}

console.log('✓ Download.js loaded successfully');