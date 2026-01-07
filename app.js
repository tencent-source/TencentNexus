// TencentNexus - URL Shortener with LocalStorage Backend
// OPSEC: No backend server, no API, all data stored in browser
// Links work only on your device - privacy-first design!

// Configuration
const CONFIG = {
    baseUrl: 'https://tencent-source.github.io/TencentNexus/' // Your GitHub Pages URL
};

// Matrix Rain Effect - Optimized for performance
function initMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    
    // Detect mobile devices
    const isMobile = window.innerWidth < 768;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;
    
    // Optimize for mobile: larger fontSize = fewer columns = better performance
    const fontSize = isMobile ? 20 : 16;
    const columns = canvas.width / fontSize;
    
    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }
    
    // Slower refresh rate on mobile for better performance
    const refreshRate = isMobile ? 50 : 30;
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ff0040';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
            
            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    }
    
    const intervalId = setInterval(draw, refreshRate);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Pause animation when page is not visible (saves battery)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(intervalId);
        } else {
            setInterval(draw, refreshRate);
        }
    });
}

// Initialize on load
initMatrixRain();

// URL Shortening Logic
class URLShortener {
    constructor() {
        this.links = this.loadLinks();
        this.renderLinks();
    }
    
    // Generate short code
    generateShortCode() {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }
    
    // Check if custom alias is available
    isAliasAvailable(alias) {
        return !this.links.some(link => link.shortCode === alias);
    }
    
    // Validate URL format and check for malicious patterns
    validateUrl(url) {
        try {
            const urlObj = new URL(url);
            
            // Check for valid protocols
            if (!['http:', 'https:'].includes(urlObj.protocol)) {
                return { valid: false, error: 'Only HTTP and HTTPS URLs are allowed' };
            }
            
            // Check for localhost/internal IPs (basic check)
            if (urlObj.hostname === 'localhost' || urlObj.hostname === '127.0.0.1') {
                return { valid: false, error: 'Cannot shorten localhost URLs' };
            }
            
            // Check URL length
            if (url.length > 2048) {
                return { valid: false, error: 'URL is too long (max 2048 characters)' };
            }
            
            return { valid: true };
        } catch (error) {
            return { valid: false, error: 'Invalid URL format' };
        }
    }
    
    // Create short URL (localStorage only - no backend needed!)
    async createShortUrl(longUrl, customAlias = '') {
        try {
            // Validate URL
            const validation = this.validateUrl(longUrl);
            if (!validation.valid) {
                throw new Error(validation.error);
            }
            
            // Validate custom alias format
            if (customAlias) {
                if (!/^[a-zA-Z0-9-_]+$/.test(customAlias)) {
                    throw new Error('Custom alias can only contain letters, numbers, hyphens, and underscores');
                }
                if (customAlias.length < 3) {
                    throw new Error('Custom alias must be at least 3 characters long');
                }
                if (customAlias.length > 50) {
                    throw new Error('Custom alias is too long (max 50 characters)');
                }
            }
            
            // Generate or use custom short code
            let shortCode = customAlias || this.generateShortCode();
            
            // Check if alias is available
            if (!this.isAliasAvailable(shortCode)) {
                throw new Error('Custom alias already exists. Please choose another.');
            }
            
            // Save link locally (no backend needed!)
            const linkData = {
                shortCode: shortCode,
                longUrl: longUrl,
                createdAt: new Date().toISOString(),
                clicks: 0
            };
            
            this.links.unshift(linkData);
            this.saveLinks();
            this.renderLinks();
            
            return {
                success: true,
                shortUrl: CONFIG.baseUrl + '?' + shortCode,
                shortCode: shortCode
            };
        } catch (error) {
            console.error('Error creating short URL:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    // No backend needed - everything stored in localStorage!
    
    // Get long URL from short code (localStorage only)
    async getLongUrl(shortCode) {
        const localLink = this.links.find(link => link.shortCode === shortCode);
        if (localLink) {
            localLink.clicks++;
            this.saveLinks();
            return localLink.longUrl;
        }
        
        return null;
    }
    
    // Local Storage Management
    saveLinks() {
        localStorage.setItem('tencentnexus_links', JSON.stringify(this.links));
    }
    
    loadLinks() {
        const saved = localStorage.getItem('tencentnexus_links');
        return saved ? JSON.parse(saved) : [];
    }
    
    deleteLink(shortCode) {
        if (confirm('Are you sure you want to delete this link?')) {
            this.links = this.links.filter(link => link.shortCode !== shortCode);
            this.saveLinks();
            this.renderLinks();
            toast.info('Link deleted', 2000);
        }
    }
    
    // Update statistics dashboard
    updateStats() {
        const totalLinks = this.links.length;
        const totalClicks = this.links.reduce((sum, link) => sum + link.clicks, 0);
        
        // Find most popular link
        let mostPopular = '-';
        if (this.links.length > 0) {
            const popular = this.links.reduce((max, link) => 
                link.clicks > max.clicks ? link : max
            );
            if (popular.clicks > 0) {
                mostPopular = popular.shortCode;
            }
        }
        
        // Get most recent link
        let recentLink = '-';
        if (this.links.length > 0) {
            recentLink = this.links[0].shortCode;
        }
        
        // Update UI
        document.getElementById('stat-total').textContent = totalLinks;
        document.getElementById('stat-clicks').textContent = totalClicks;
        document.getElementById('stat-popular').textContent = mostPopular;
        document.getElementById('stat-recent').textContent = recentLink;
    }
    
    // Render links list
    renderLinks() {
        const container = document.getElementById('links-list');
        
        // Update stats
        this.updateStats();
        
        if (this.links.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #ff4466;">No links yet. Create your first one above!</p>';
            return;
        }
        
        container.innerHTML = this.links.map(link => `
            <div class="link-item">
                <div class="link-info">
                    <div class="short">${CONFIG.baseUrl}?${link.shortCode}</div>
                    <div class="original">${link.longUrl}</div>
                    <div style="font-size: 0.8em; color: #888; margin-top: 5px;">
                        👁️ ${link.clicks} clicks | 📅 ${new Date(link.createdAt).toLocaleDateString()}
                    </div>
                </div>
                <div class="link-actions">
                    <button onclick="copyToClipboard('${CONFIG.baseUrl}?${link.shortCode}')">📋</button>
                    <button onclick="shortener.deleteLink('${link.shortCode}')">🗑️</button>
                </div>
            </div>
        `).join('');
    }
}

// Initialize shortener
const shortener = new URLShortener();

// Handle form submission
document.getElementById('shorten-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const longUrl = document.getElementById('long-url').value.trim();
    const customAlias = document.getElementById('custom-alias').value.trim();
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    // Validate inputs
    if (!longUrl) {
        toast.error('Please enter a URL to shorten');
        return;
    }
    
    // Disable button during processing
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '⏳ GENERATING...';
    
    try {
        const result = await shortener.createShortUrl(longUrl, customAlias);
        
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        if (result.success) {
            // Show success toast
            toast.success('Short link created successfully!');
            
            // Show result
            document.getElementById('short-url-display').value = result.shortUrl;
            document.getElementById('result-box').style.display = 'block';
            
            // Generate QR Code
            const qrContainer = document.getElementById('qr-code');
            qrContainer.innerHTML = '<p style="text-align: center; color: #ff4466;">Generating QR code...</p>';
            
            QRCode.toCanvas(result.shortUrl, { width: 200, margin: 2 }, (error, canvas) => {
                if (!error) {
                    qrContainer.innerHTML = '';
                    qrContainer.appendChild(canvas);
                } else {
                    qrContainer.innerHTML = '<p style="text-align: center; color: #ff0040;">Failed to generate QR code</p>';
                }
            });
            
            // Clear form
            document.getElementById('shorten-form').reset();
            
            // Scroll to result
            document.getElementById('result-box').scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            toast.error(result.error || 'Failed to create short link');
        }
    } catch (error) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        toast.error('An unexpected error occurred. Please try again.');
        console.error(error);
    }
});

// Copy short URL to clipboard
function copyShortUrl() {
    const input = document.getElementById('short-url-display');
    input.select();
    
    navigator.clipboard.writeText(input.value).then(() => {
        toast.success('Link copied to clipboard!', 2000);
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✓ COPIED!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }).catch(() => {
        // Fallback for older browsers
        document.execCommand('copy');
        toast.success('Link copied to clipboard!', 2000);
    });
}

// Copy to clipboard utility
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        toast.success('Link copied!', 2000);
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✓';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 1000);
    }).catch((error) => {
        toast.error('Failed to copy to clipboard');
        console.error('Copy failed:', error);
    });
}

// Handle URL redirection on page load
window.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const keys = Array.from(urlParams.keys());
    
    if (keys.length > 0) {
        const shortCode = keys[0];
        
        // Show loading
        document.body.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column;">
                <h1 style="color: #ff0040; text-shadow: 0 0 20px #ff0040;">⏳ Redirecting...</h1>
                <p style="color: #ff4466; margin-top: 20px;">Please wait...</p>
            </div>
        `;
        
        const longUrl = await shortener.getLongUrl(shortCode);
        
        if (longUrl) {
            window.location.href = longUrl;
        } else {
            document.body.innerHTML = `
                <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column;">
                    <h1 style="color: #ff0040; text-shadow: 0 0 20px #ff0040;">❌ Link Not Found</h1>
                    <p style="color: #ff4466; margin-top: 20px;">This short link doesn't exist.</p>
                    <a href="${CONFIG.baseUrl}" style="color: #ff0040; margin-top: 30px; text-decoration: none; border: 2px solid #ff0040; padding: 10px 20px; border-radius: 5px;">← Back to Home</a>
                </div>
            `;
        }
    }
});

// Schema.org structured data for SEO
const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TencentNexus",
    "description": "Free anime-themed URL shortener with dark red hacker aesthetics",
    "url": CONFIG.baseUrl,
    "applicationCategory": "UtilityApplication",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

// Inject structured data
const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(structuredData);
document.head.appendChild(script);

// Toast Notification System
class ToastManager {
    constructor() {
        this.container = document.getElementById('toast-container');
    }
    
    show(message, type = 'info', duration = 4000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: '✓',
            error: '✗',
            warning: '⚠',
            info: 'ℹ'
        };
        
        const titles = {
            success: 'Success',
            error: 'Error',
            warning: 'Warning',
            info: 'Info'
        };
        
        toast.innerHTML = `
            <div class="toast-icon">${icons[type]}</div>
            <div class="toast-content">
                <div class="toast-title">${titles[type]}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        `;
        
        this.container.appendChild(toast);
        
        // Auto remove after duration
        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
    
    success(message, duration) {
        this.show(message, 'success', duration);
    }
    
    error(message, duration) {
        this.show(message, 'error', duration);
    }
    
    warning(message, duration) {
        this.show(message, 'warning', duration);
    }
    
    info(message, duration) {
        this.show(message, 'info', duration);
    }
}

// Initialize toast manager
const toast = new ToastManager();

// No rate limiting - everything is local!
