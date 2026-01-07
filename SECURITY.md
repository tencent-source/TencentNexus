# 🔒 Security Policy - TencentNexus

## OPSEC Considerations for Public Repository

This project is designed to be deployed as a **public repository** on GitHub. Here are the security considerations:

## ✅ Safe by Design

- **No Backend Server**: Pure client-side JavaScript
- **No Credentials**: No passwords, API keys, or secrets required
- **No User Data**: Links stored locally in browser or in public GitHub Issues
- **Open Source**: Fully transparent code

## ⚠️ Known Limitations

### GitHub Personal Access Token

If you add a GitHub token to improve API rate limits:

- ❌ **Token is visible** to anyone viewing page source
- ❌ Token can be extracted from JavaScript
- ✅ Only grant **public_repo** permission (minimal access)
- ✅ Token can only access public repositories
- ✅ Can be revoked anytime from GitHub settings

**Recommendation**: For public sites, leave `githubToken: ''` empty and accept the lower rate limits (60 requests/hour).

### Data Storage

1. **localStorage** (Browser)
   - ✅ Private to each user
   - ✅ Never leaves the device
   - ❌ Cleared if browser cache is cleared

2. **GitHub Issues** (Public)
   - ❌ All shortened URLs are PUBLIC
   - ❌ Anyone can read the Issues
   - ❌ Visible in repository
   - ✅ Free and reliable storage

**Don't shorten sensitive URLs!** Examples of what NOT to shorten:
- Password reset links
- Private documents
- Confidential information
- Personal data URLs

## 🛡️ Best Practices

### For Users

1. **Don't shorten private links**: Assume all links are public
2. **Use incognito mode**: If you want truly temporary links
3. **Clear localStorage**: Regularly clear browser data if privacy is a concern

### For Developers

1. **Never commit real tokens**: Use placeholders
2. **Document token permissions**: Make it clear what access is needed
3. **Regular security audits**: Review Issues for inappropriate content
4. **Consider private repos**: For internal use cases

## 🚨 Reporting Security Issues

If you find a security vulnerability:

1. **Do NOT** open a public issue
2. Contact the repository owner directly
3. Provide detailed information about the vulnerability
4. Allow time for a fix before public disclosure

## 🔐 Alternative Secure Implementations

For production use with better security:

### Option 1: Private Repository
- Make the repo private
- Use GitHub Actions for backend
- Store tokens as GitHub Secrets

### Option 2: Backend Server
- Deploy a simple backend (Node.js, Python, etc.)
- Store URLs in a database
- Use environment variables for secrets

### Option 3: Third-Party Service
- Integrate with Bitly API
- Use Firebase
- AWS Lambda + DynamoDB

## 📜 License

This project is open source (MIT License). Use at your own risk. No warranty provided.

## 🤝 Responsible Disclosure

We appreciate security researchers who:
- Report vulnerabilities privately
- Give reasonable time for fixes
- Don't exploit vulnerabilities for malicious purposes

---

**Remember**: This is a fun, educational project. For business-critical URL shortening, consider professional services.
