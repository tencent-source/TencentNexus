# 🚀 TencentNexus Setup Guide

## Step-by-Step Installation

### Prerequisites
- GitHub account
- Basic knowledge of Git (optional, can use GitHub web interface)

---

## Option 1: Quick Setup (Recommended)

### 1. Create Repository on GitHub

1. Go to GitHub and create a new repository named `TencentNexus`
2. Make it **Public**
3. **Do NOT** initialize with README, .gitignore, or license

### 2. Upload Files

**Via GitHub Web Interface:**
1. Click "uploading an existing file"
2. Drag and drop all files from TencentNexus folder:
   - `index.html`
   - `app.js`
   - `README.md`
   - `.gitignore`
   - `_config.yml`
   - `robots.txt`
   - `sitemap.xml`
3. Commit the files

**Via Git Command Line:**
```bash
cd TencentNexus
git init
git add .
git commit -m "Initial commit: TencentNexus URL Shortener"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/TencentNexus.git
git push -u origin main
```

### 3. Configure the Application

Edit **THREE** files with your information:

#### File 1: `app.js` (Lines 5-9)
```javascript
const CONFIG = {
    githubOwner: 'YOUR_ACTUAL_USERNAME',  // ← Change this!
    githubRepo: 'TencentNexus',
    githubToken: '',  // Optional: Add token for higher limits
    baseUrl: 'https://YOUR_ACTUAL_USERNAME.github.io/TencentNexus/'  // ← Change this!
};
```

#### File 2: `index.html` (Lines 15 & 18)
```html
<link rel="canonical" href="https://YOUR_ACTUAL_USERNAME.github.io/TencentNexus/">
<!-- ... -->
<meta property="og:url" content="https://YOUR_ACTUAL_USERNAME.github.io/TencentNexus/">
```

#### File 3: `sitemap.xml` (Line 4)
```xml
<loc>https://YOUR_ACTUAL_USERNAME.github.io/TencentNexus/</loc>
```

**Commit these changes:**
```bash
git add .
git commit -m "Configure with actual username"
git push
```

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section (left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes for deployment

Your site will be live at: `https://YOUR_USERNAME.github.io/TencentNexus/`

### 5. Enable Issues (Important!)

The app uses GitHub Issues as a database:

1. Go to **Settings** tab
2. Scroll to **Features** section
3. Make sure **Issues** checkbox is ✅ **checked**

---

## Option 2: Fork Existing Repository

If someone has already set this up:

1. Fork the repository
2. Edit the configuration files (see Step 3 above)
3. Enable GitHub Pages (see Step 4 above)
4. Done!

---

## Optional: Add GitHub Token (Higher Rate Limits)

### Why?
- **Without token**: 60 API requests per hour
- **With token**: 5,000 API requests per hour

### How to Create Token

1. Go to GitHub Settings → Developer settings
2. Click **Personal access tokens** → **Tokens (classic)**
3. Click **Generate new token (classic)**
4. Give it a name: "TencentNexus API"
5. Set expiration: No expiration (or custom)
6. Select scopes: ✅ **public_repo** only
7. Click **Generate token**
8. **COPY THE TOKEN** (you won't see it again!)

### Add Token to App

Edit `app.js`:
```javascript
githubToken: 'ghp_xxxxxxxxxxxxxxxxxxxx',  // Your token here
```

⚠️ **SECURITY WARNING**: 
- This token will be **visible to anyone** who views your page source
- Only grant **public_repo** permission
- Consider it "public" once added to the site
- For production, use a backend server instead

---

## Google Search Console Setup

### 1. Verify Your Site

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **Add Property** → URL prefix
3. Enter: `https://YOUR_USERNAME.github.io/TencentNexus/`
4. Verify using **HTML tag** method:
   - Copy the meta tag
   - Add it to `index.html` in the `<head>` section
   - Commit and push
   - Click **Verify**

### 2. Submit Sitemap

1. In Search Console, click **Sitemaps** (left sidebar)
2. Enter: `sitemap.xml`
3. Click **Submit**

### 3. Wait for Indexing

Google will start indexing your site within a few days.

---

## Google AdSense Setup

### 1. Apply for AdSense

1. Go to [Google AdSense](https://www.google.com/adsense)
2. Sign up with your Google account
3. Add your site URL
4. Wait for approval (can take 1-2 weeks)

### 2. Add AdSense Code

Once approved, add the code to `index.html`:

```html
<!-- Add in <head> section -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
```

### 3. Place Ad Units

Add ad units where you want them to appear:

```html
<!-- Example: Below the header -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

Good places for ads:
- Below the header
- Between the form and results
- In the footer
- Sidebar (if you add one)

---

## Customization Tips

### Change Theme Colors

Edit `index.html` CSS section:

```css
/* Main theme color */
color: #ff0040;  /* Dark red */

/* Try these alternatives: */
/* Blue: #0066ff */
/* Purple: #cc00ff */
/* Green: #00ff66 */
/* Orange: #ff6600 */
```

### Add Your Branding

1. Replace creator info in footer
2. Change the tagline
3. Add your own logo/image
4. Customize the Matrix rain characters

### Add Features

Ideas for expansion:
- Link expiration dates
- Password-protected links
- Link editing
- Bulk import/export
- Statistics dashboard
- Social media preview cards

---

## Troubleshooting

### Site not loading
- Check GitHub Pages is enabled
- Verify the URL matches your configuration
- Wait 2-3 minutes after enabling Pages

### Links not working
- Make sure Issues are enabled
- Check `CONFIG.baseUrl` matches your actual URL
- Open browser console (F12) to see errors

### GitHub API rate limit
- Add a Personal Access Token
- Use the site less frequently
- Wait for the limit to reset (every hour)

### QR codes not showing
- Check internet connection (loads from CDN)
- View browser console for errors
- Try a different browser

---

## Security Best Practices

### OPSEC Considerations

✅ **Safe for public repos:**
- No backend server
- No sensitive data
- Client-side only code

⚠️ **Be careful with:**
- GitHub tokens (visible in source code)
- Personal information
- Analytics data

🔒 **Recommendations:**
- Use tokens with minimal permissions
- Don't store sensitive URLs
- Consider private repo if needed
- Regularly rotate tokens

---

## Need Help?

- **Issues**: Open an issue on GitHub
- **Questions**: Check existing issues first
- **Contributions**: Pull requests welcome!

---

**Built with ❤️ and ☕**

Created by [pinoyakogago](https://phcorner.org/members/pinoyakogago.2699812/)
