# 🔗 TencentNexus - Anime Hacker URL Shortener

![TencentNexus Banner](https://data.phcorner.org/avatars/o/2699/2699812.jpg?1766775989)

A free, open-source URL shortener with a dark red anime hacker aesthetic. Built with pure client-side JavaScript and GitHub Issues API as a backend.

## ✨ Features

- 🎨 **Anime Cyberpunk Theme** - Dark red hacker aesthetic with Matrix rain effects
- 🔗 **URL Shortening** - Convert long URLs into short, shareable links
- 🎯 **Custom Aliases** - Create memorable custom short codes
- 📊 **Click Tracking** - Track how many times your links are clicked
- 📱 **QR Code Generation** - Automatically generate QR codes for each link
- 💾 **Local Storage** - Your links are saved locally in your browser
- 🔒 **Privacy Focused** - No tracking, no ads (until you add them)
- 🌐 **SEO Optimized** - Ready for Google Search Console and AdSense
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile

## 🚀 Quick Setup

### 1. Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/TencentNexus.git
cd TencentNexus
```

### 2. Configure

Edit `app.js` and update these lines:

```javascript
const CONFIG = {
    githubOwner: 'YOUR_GITHUB_USERNAME',     // Your GitHub username
    githubRepo: 'TencentNexus',              // Keep as is
    githubToken: '',                          // Optional: Personal Access Token
    baseUrl: 'https://YOUR_USERNAME.github.io/TencentNexus/'  // Your GitHub Pages URL
};
```

Also update `index.html` meta tags:

```html
<link rel="canonical" href="https://YOUR_USERNAME.github.io/TencentNexus/">
<meta property="og:url" content="https://YOUR_USERNAME.github.io/TencentNexus/">
```

### 3. Enable GitHub Pages

1. Go to your repository settings
2. Navigate to **Pages** section
3. Select **Source**: Deploy from a branch
4. Choose **Branch**: `main` and **Folder**: `/ (root)`
5. Click **Save**

Your site will be live at: `https://YOUR_USERNAME.github.io/TencentNexus/`

### 4. Create GitHub Personal Access Token (Optional but Recommended)

For better rate limits and reliability:

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `public_repo` scope
3. Copy the token and add it to `app.js` CONFIG section

⚠️ **OPSEC WARNING**: If you add a token to `app.js`, anyone visiting your site can see it. For a public site, it's safer to leave it blank and accept the lower rate limits.

## 📖 How It Works

### Backend Architecture

TencentNexus uses **GitHub Issues as a database**:

1. When you create a short link, it creates a GitHub Issue with the mapping
2. Issues are labeled with `url-shortener` and `active`
3. When someone visits a short link, it queries the Issues API
4. Links are also cached in localStorage for faster access

### Data Flow

```
User enters URL → Creates GitHub Issue → Generates short code → Saves to localStorage
↓
Short link shared → Page loads → Checks localStorage → Falls back to GitHub API → Redirects
```

## 🔧 Customization

### Change Colors

Edit the CSS in `index.html`:

```css
/* Main accent color */
color: #ff0040;  /* Change to your preferred color */

/* Adjust shadows and glows */
text-shadow: 0 0 10px #ff0040;
box-shadow: 0 0 20px rgba(255, 0, 64, 0.5);
```

### Add Your Own Logo

Replace the creator image in `index.html`:

```html
<img src="YOUR_IMAGE_URL" alt="Creator">
```

### Customize Matrix Effect

Modify the `initMatrixRain()` function in `app.js` to change:
- Characters used in the rain
- Color scheme
- Animation speed

## 📊 SEO & Analytics

### Google Search Console

1. Add your site to [Google Search Console](https://search.google.com/search-console)
2. Verify ownership using HTML tag method
3. Submit your sitemap (you can create one manually)

### Google AdSense

Add AdSense code to `index.html`:

```html
<!-- Add before </head> -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXX"
     crossorigin="anonymous"></script>
```

Insert ad units in the appropriate places.

## 🛡️ OPSEC Considerations

This is designed for a **public repository** with these safety measures:

- ✅ No backend server required
- ✅ No sensitive credentials in code (unless you add a token)
- ✅ All data stored in GitHub Issues (public) or localStorage (private)
- ✅ No personal information exposed
- ✅ Uses GitHub API which is rate-limited but free

If you add a **GitHub token** to the config:
- ⚠️ The token will be visible to anyone viewing the page source
- ⚠️ Only use tokens with minimal permissions (`public_repo` only)
- ⚠️ Consider using GitHub Actions for a more secure backend

## 📱 Mobile Optimization

The site is fully responsive with:
- Touch-friendly buttons
- Mobile-optimized layout
- Adaptive font sizes
- Smooth animations

## 🐛 Troubleshooting

### Links not working

1. Check that you've updated `CONFIG.baseUrl` in `app.js`
2. Verify GitHub Pages is enabled
3. Make sure Issues are enabled in your repository

### Rate limit errors

- Add a Personal Access Token to `CONFIG.githubToken`
- Or use the site less frequently (60 requests per hour without token)

### QR codes not showing

- Check browser console for errors
- Ensure the QRCode library is loading from CDN
- Try clearing browser cache

## 📄 License

MIT License - Feel free to use, modify, and distribute!

## 👨‍💻 Creator

Created by [pinoyakogago](https://phcorner.org/members/pinoyakogago.2699812/)

## 🤝 Contributing

Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Fork and customize for your needs

## 🌟 Show Your Support

If you like this project:
- ⭐ Star the repository
- 🔗 Share it with others
- 💬 Spread the word on social media

---

**Built with ❤️ and ☕ | Powered by GitHub Pages**
