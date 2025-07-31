# JALAI Deployment Guide

This guide will help you deploy the JALAI platform with the frontend on Vercel and the backend on Render.

## 🚀 Frontend Deployment (Vercel)

### Step 1: Connect Repository to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click "New Project"
3. Import your repository: `https://github.com/ILoveTech2001/JALAI-2`
4. Select the repository and click "Import"

### Step 2: Configure Build Settings
- **Framework Preset**: Vite
- **Root Directory**: `frontend/JALAI-Ecommerce/donation-Platform`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 3: Environment Variables
Add these environment variables in Vercel dashboard:
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### Step 4: Deploy
Click "Deploy" and wait for the build to complete.

## 🖥️ Backend Deployment (Render)

### Step 1: Create New Web Service
1. Go to [render.com](https://render.com) and sign in with your GitHub account
2. Click "New +" → "Web Service"
3. Connect your repository: `https://github.com/ILoveTech2001/JALAI-2`

### Step 2: Configure Service Settings
- **Name**: `jalai-backend`
- **Root Directory**: `backend-express`
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Step 3: Environment Variables
Add these environment variables in Render dashboard:
```
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Step 4: Deploy
Click "Create Web Service" and wait for deployment.

## 🔧 Post-Deployment Configuration

### Update Frontend API URL
After backend deployment, update the frontend environment variable:
1. Go to Vercel dashboard → Your project → Settings → Environment Variables
2. Update `VITE_API_URL` with your Render backend URL
3. Redeploy the frontend

### Update Backend CORS
After frontend deployment, update the backend environment variable:
1. Go to Render dashboard → Your service → Environment
2. Update `FRONTEND_URL` with your Vercel frontend URL
3. The service will automatically redeploy

## 🧪 Testing Deployment

### Test Accounts
Use these accounts to test the deployed application:
- **Admin**: `admin@jalai.com` / `admin123`
- **Client**: `client@jalai.com` / `client123`
- **Orphanage**: `orphanage@jalai.com` / `orphanage123`
- **Personal**: `moforbei@gmail.com` / `password123`

### Test Features
1. **Authentication**: Login with test accounts
2. **Donations**: Make donations and check admin approval
3. **Shopping**: Add items to cart and complete checkout
4. **Admin Panel**: Manage donations and orders
5. **Notifications**: Check real-time updates

## 🔍 Troubleshooting

### Common Issues

**CORS Errors**:
- Ensure `FRONTEND_URL` is correctly set in backend
- Check that both URLs are using HTTPS

**API Connection Issues**:
- Verify `VITE_API_URL` points to correct backend URL
- Ensure backend is running and accessible

**Build Failures**:
- Check build logs for specific errors
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

### Monitoring
- **Vercel**: Check function logs and analytics
- **Render**: Monitor service logs and metrics
- **GitHub**: Set up webhooks for automatic deployments

## 📱 Mobile Optimization

The application is responsive and works on mobile devices. Test on various screen sizes to ensure optimal user experience.

## 🔒 Security Considerations

- All test accounts use simple passwords for demo purposes
- In production, implement proper password hashing
- Add rate limiting and input validation
- Use environment variables for sensitive data
- Enable HTTPS for all communications

## 📈 Scaling

For production use, consider:
- Database integration (PostgreSQL, MongoDB)
- Redis for session management
- CDN for static assets
- Load balancing for high traffic
- Monitoring and logging services
