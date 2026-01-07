# ⚡ TencentNexus - Quick Start (5 Minutes)

## 🎯 Goal
Get your anime hacker URL shortener live in 5 minutes.

---

## 🚀 Three Simple Steps

### 1️⃣ Create GitHub Repository (1 min)

1. Go to https://github.com/new
2. Repository name: `TencentNexus`
3. Make it **Public**
4. **Don't** add README, .gitignore, or license
5. Click **Create repository**

---

### 2️⃣ Upload & Configure (2 min)

**Option A: Automated (Recommended)**
```bash
cd TencentNexus
bash DEPLOY.sh
# Enter your GitHub username when prompted
git push -u origin main
```

**Option B: Manual**
```bash
cd TencentNexus

# Edit these 3 files and replace YOUR_USERNAME with your GitHub username:
# - app.js (lines 5-9)
# - index.html (lines 15, 18)
# - sitemap.xml (line 4)

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/TencentNexus.git
git push -u origin main
```

---

### 3️⃣ Enable GitHub Pages (2 min)

1. Go to your repo: `https://github.com/YOUR_USERNAME/TencentNexus`
2. Click **Settings** tab
3. Click **Pages** in left sidebar
4. Under **Source**:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Click **Code** tab at top
7. Click **Settings** tab again
8. Scroll to **Features** section
9. Check ✅ **Issues**

---

## ✅ Done!

Your site is live at:
```
https://YOUR_USERNAME.github.io/TencentNexus/
```

Wait 1-2 minutes for deployment, then visit your URL! 🎉

---

## 🎨 What You Get

- ⚡ Dark red anime hacker theme
- 🔗 URL shortening with custom aliases
- 📊 Click tracking
- 📱 QR code generation
- 💾 Link management
- 🌐 SEO optimized
- 🔒 OPSEC safe

---

## 🔧 Must Know

### URLs Are Public
All shortened URLs are stored in GitHub Issues and are **publicly visible**.

### Rate Limits
- Without token: 60 API requests/hour
- With token: 5,000 requests/hour

### Add Token (Optional)
To increase rate limits:

1. GitHub Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Permission: `public_repo` only
4. Copy token
5. Edit `app.js` line 7:
   ```javascript
   githubToken: 'ghp_YOUR_TOKEN_HERE',
   ```
6. Commit and push

⚠️ **Warning**: Token will be visible in page source!

---

## 📊 SEO Setup (Later)

### Google Search Console
1. Visit https://search.google.com/search-console
2. Add property: `https://YOUR_USERNAME.github.io/TencentNexus/`
3. Verify with HTML tag method
4. Submit sitemap: `sitemap.xml`

### Google AdSense
1. Apply at https://www.google.com/adsense
2. Wait for approval (1-2 weeks)
3. Add AdSense code to `index.html` in `<head>` section
4. Place ad units in strategic locations

---

## 🆘 Common Issues

**Site not loading?**
- Wait 2-3 minutes after enabling Pages
- Check Pages is enabled (Settings → Pages)

**Can't create links?**
- Check Issues are enabled (Settings → Features)
- Open browser console (F12) for errors

**Links not redirecting?**
- Verify `CONFIG.baseUrl` in `app.js` matches your actual URL
- Clear browser cache

---

## 📚 More Help

- **Full Guide**: `SETUP_GUIDE.md`
- **Complete Checklist**: `CHECKLIST.md`
- **Security Info**: `SECURITY.md`
- **Project Details**: `PROJECT_SUMMARY.md`

---

## 🎉 You're Live!

Share your new URL shortener:
- 📱 Social media
- 💬 PHCorner community
- 🌐 Reddit, Dev.to, Hacker News
- 📧 Friends and colleagues

**Enjoy your anime hacker URL shortener!** 🚀⚡

---

**Made with ❤️ by [pinoyakogago](https://phcorner.org/members/pinoyakogago.2699812/)**
