# Signal - Deployment Guide

## 📦 Deployment Options

### Option 1: Vercel (Recommended for Demos)

**Why Vercel?**
- Zero configuration needed
- Automatic HTTPS
- Global CDN
- Free tier available
- Perfect for React apps

**Steps:**

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add Environment Variables**
   - Go to your Vercel dashboard
   - Navigate to Settings > Environment Variables
   - Add your API keys:
     - `VITE_ANTHROPIC_API_KEY`
     - `VITE_ALPHA_VANTAGE_API_KEY`
     - `VITE_FINNHUB_API_KEY`
     - `VITE_NEWS_API_KEY`

5. **Redeploy with production settings**
   ```bash
   vercel --prod
   ```

**Auto Deployment from GitHub:**
1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Connect your repository
4. Configure environment variables
5. Deploy automatically on every push to main

---

### Option 2: Netlify

**Steps:**

1. **Install Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. **Configure Environment Variables**
   - Go to Site settings > Environment variables
   - Add all your API keys

---

### Option 3: Docker (Production)

**Why Docker?**
- Consistent environment
- Easy scaling
- Can deploy anywhere
- Production-grade

**Steps:**

1. **Build the Docker image**
   ```bash
   docker build -t signal-app:latest .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:80 signal-app:latest
   ```

3. **Using Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Access the app**
   Open `http://localhost:3000`

**Deploy to Cloud (AWS/GCP/Azure):**
- Push image to container registry
- Deploy to ECS, Cloud Run, or Azure Container Instances
- Configure load balancer
- Add SSL certificate

---

### Option 4: Traditional Hosting (Shared Hosting)

**Steps:**

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload files**
   - Upload everything in the `dist/` folder
   - Use FTP/SFTP to your hosting provider

3. **Configure server**
   - Make sure your server redirects all routes to `index.html`
   - Apache: Use `.htaccess`
   - Nginx: Use the provided `nginx.conf`

---

## 🔐 Environment Variables Setup

### Development (.env file)
```env
VITE_ANTHROPIC_API_KEY=your_key_here
VITE_ALPHA_VANTAGE_API_KEY=your_key_here
VITE_FINNHUB_API_KEY=your_key_here
VITE_NEWS_API_KEY=your_key_here
```

### Production
**Never commit API keys!**
- Use platform environment variable management
- Vercel: Dashboard > Settings > Environment Variables
- Netlify: Site settings > Environment variables
- Docker: Use `.env` file or pass via `-e` flag
- GitHub Actions: Repository secrets

---

## 🚀 CI/CD with GitHub Actions

The project includes a CI/CD pipeline (`.github/workflows/ci-cd.yml`) that:
1. Lints code on every push
2. Builds the application
3. Deploys to Vercel on main branch

**Setup:**
1. Add GitHub secrets:
   - `VERCEL_TOKEN` - Your Vercel API token
   - `VERCEL_ORG_ID` - Your Vercel organization ID
   - `VERCEL_PROJECT_ID` - Your Vercel project ID

2. Push to main branch
3. GitHub Actions will automatically deploy

---

## 🌐 Custom Domain Setup

### Vercel
1. Go to Project Settings > Domains
2. Add your domain
3. Configure DNS (follow Vercel's instructions)
4. SSL is automatic

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS
4. SSL is automatic

---

## 📊 Performance Optimization

### Production Build
```bash
npm run build
```

**Optimizations applied:**
- Code splitting (automatic with Vite)
- Minification
- Tree shaking
- CSS purging with Tailwind
- Gzip compression
- Asset optimization

### CDN Configuration
- Set proper cache headers
- Use Vercel/Netlify CDN (automatic)
- For custom hosting, configure CloudFlare

---

## 🔍 Monitoring & Analytics

### Recommended Tools
1. **Vercel Analytics** - Built-in (free on Vercel)
2. **Google Analytics** - Add to `index.html`
3. **Sentry** - Error tracking
4. **LogRocket** - Session replay

---

## 🛡️ Security Checklist

- [ ] API keys in environment variables (not code)
- [ ] HTTPS enabled (automatic on Vercel/Netlify)
- [ ] Security headers configured (in nginx.conf)
- [ ] CORS properly configured
- [ ] Rate limiting on API endpoints
- [ ] Regular dependency updates
- [ ] Content Security Policy (CSP)

---

## 📈 Scaling Considerations

### Current Architecture
- Static site (can handle high traffic)
- API calls from client (be mindful of rate limits)
- In-memory caching (per user session)

### To Scale Further
1. **Add Backend API**
   - Move API calls to server-side
   - Implement server-side caching (Redis)
   - Add database for user data

2. **Implement CDN**
   - Vercel/Netlify provide this automatically
   - For custom hosting: CloudFlare or AWS CloudFront

3. **Database**
   - Supabase (PostgreSQL + Auth)
   - Firebase (NoSQL + Auth)
   - MongoDB Atlas

4. **Authentication**
   - Clerk
   - Auth0
   - Supabase Auth
   - Firebase Auth

---

## 🧪 Testing Deployment

### Pre-deployment Checklist
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] Test production build locally: `npm run preview`
- [ ] All environment variables configured
- [ ] API keys working in production
- [ ] Test on mobile devices
- [ ] Check browser console for errors

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### API Keys Not Working
- Check if variables start with `VITE_` prefix
- Restart dev server after changing `.env`
- Verify keys are added to hosting platform

### Routes Not Working (404)
- Ensure server redirects all routes to index.html
- Check nginx.conf or hosting configuration
- Vercel/Netlify handle this automatically

---

## 📞 Support Resources

- **Vite Docs**: https://vitejs.dev/
- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com/
- **Docker Docs**: https://docs.docker.com/

---

## 🎯 Production Checklist

Before going live:
- [ ] All API keys secured
- [ ] Environment variables configured
- [ ] Custom domain set up
- [ ] SSL certificate active
- [ ] Analytics configured
- [ ] Error monitoring set up
- [ ] Backup strategy in place
- [ ] Performance tested
- [ ] Mobile responsiveness verified
- [ ] Browser compatibility checked
- [ ] SEO metadata added
- [ ] Legal pages (Privacy, Terms) added if needed

---

**Your Signal deployment is ready! 🚀**
