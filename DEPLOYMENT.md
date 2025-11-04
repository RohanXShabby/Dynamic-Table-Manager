# 🚀 Deployment Guide

## Overview

This guide covers deploying the Dynamic Data Table Manager to various platforms.

## Prerequisites

- Node.js 18+ installed
- Git repository set up
- Account on deployment platform

## Build for Production

### 1. Test Production Build Locally

```bash
# Build the application
npm run build

# Start production server
npm start

# Test at http://localhost:3000
```

### 2. Verify Build Output

Check for:
- ✅ No build errors
- ✅ No TypeScript errors
- ✅ All pages load correctly
- ✅ Redux state persists
- ✅ CSV import/export works

## Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Built by Next.js creators
- Zero configuration
- Automatic HTTPS
- Global CDN
- Free tier available

**Steps:**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Production Deployment**
   ```bash
   vercel --prod
   ```

**Or via GitHub:**

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

**Environment Variables:**
- None required for basic deployment
- Add any future API keys in Vercel dashboard

---

### Option 2: Netlify

**Steps:**

1. **Build Command:** `npm run build`
2. **Publish Directory:** `.next`
3. **Deploy:**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

**netlify.toml Configuration:**

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

### Option 3: Docker

**Dockerfile:**

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

**Build and Run:**

```bash
# Build image
docker build -t dynamic-table-manager .

# Run container
docker run -p 3000:3000 dynamic-table-manager
```

---

### Option 4: AWS Amplify

**Steps:**

1. Push code to GitHub/GitLab/Bitbucket
2. Go to AWS Amplify Console
3. Connect repository
4. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
5. Deploy

**amplify.yml:**

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

---

### Option 5: Self-Hosted (VPS/Dedicated Server)

**Requirements:**
- Ubuntu 20.04+ or similar
- Node.js 18+
- Nginx (recommended)
- PM2 for process management

**Steps:**

1. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Install PM2**
   ```bash
   sudo npm install -g pm2
   ```

3. **Clone and Build**
   ```bash
   git clone <your-repo>
   cd dynamic-table-manager
   npm install
   npm run build
   ```

4. **Start with PM2**
   ```bash
   pm2 start npm --name "table-manager" -- start
   pm2 save
   pm2 startup
   ```

5. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Enable HTTPS with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

---

## Environment Configuration

### Production Environment Variables

Create `.env.production`:

```env
# Add any production-specific variables here
# Currently, the app doesn't require any
```

### Next.js Configuration

Update `next.config.ts` if needed:

```typescript
const nextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  
  // Add your domain for image optimization
  images: {
    domains: ['yourdomain.com'],
  },
  
  // Disable source maps in production (optional)
  productionBrowserSourceMaps: false,
};

export default nextConfig;
```

---

## Performance Optimization

### 1. Enable Compression

Already enabled by Next.js by default.

### 2. Optimize Images

Use Next.js Image component for any images you add:

```tsx
import Image from 'next/image';

<Image src="/image.jpg" width={500} height={300} alt="Description" />
```

### 3. Code Splitting

Already handled by Next.js automatically.

### 4. Caching Strategy

Configure in `next.config.ts`:

```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

---

## Monitoring & Analytics

### 1. Vercel Analytics

```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 2. Google Analytics

```bash
npm install @next/third-parties
```

### 3. Error Tracking (Sentry)

```bash
npm install @sentry/nextjs
```

---

## Security Checklist

- ✅ HTTPS enabled
- ✅ Environment variables secured
- ✅ Dependencies up to date
- ✅ No sensitive data in client code
- ✅ CSP headers configured (if needed)
- ✅ Rate limiting (if needed)

---

## Post-Deployment Checklist

### Functionality Testing
- [ ] Homepage loads correctly
- [ ] Search functionality works
- [ ] Sorting works on all columns
- [ ] Pagination works
- [ ] CSV import works
- [ ] CSV export works
- [ ] Inline editing works
- [ ] Row deletion works
- [ ] Column management works
- [ ] Theme toggle works
- [ ] Data persists after refresh
- [ ] Mobile responsive

### Performance Testing
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 3s
- [ ] No console errors
- [ ] No 404 errors

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

---

## Rollback Strategy

### Vercel
```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback [deployment-url]
```

### PM2
```bash
# Restore previous version
git checkout <previous-commit>
npm install
npm run build
pm2 restart table-manager
```

---

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Troubleshooting

### Build Fails

**Issue:** TypeScript errors
```bash
# Check for errors
npm run build

# Fix type issues
npm run lint
```

**Issue:** Out of memory
```bash
# Increase Node memory
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### Runtime Errors

**Issue:** Redux persist not working
- Check browser localStorage is enabled
- Clear browser cache
- Check for quota exceeded errors

**Issue:** CSV import fails
- Verify file size < 10MB
- Check CSV format matches expected structure
- Check browser console for errors

---

## Maintenance

### Regular Updates

```bash
# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Update major versions (carefully)
npm install <package>@latest
```

### Backup Strategy

- Redux state is stored in browser localStorage
- Consider adding server-side storage for production
- Regular database backups if you add a backend

---

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Support**: https://vercel.com/support
- **Community**: Next.js Discord

---

## Cost Estimates

### Vercel (Recommended)
- **Free Tier**: Perfect for this app
- **Pro**: $20/month (if needed)

### Netlify
- **Free Tier**: 100GB bandwidth
- **Pro**: $19/month

### AWS Amplify
- **Pay as you go**: ~$5-20/month

### Self-Hosted VPS
- **DigitalOcean**: $6-12/month
- **Linode**: $5-10/month
- **AWS EC2**: $5-15/month

---

**Recommended for this project**: Vercel Free Tier

✅ Zero configuration
✅ Automatic HTTPS
✅ Global CDN
✅ Perfect for Next.js
✅ Free for personal projects
