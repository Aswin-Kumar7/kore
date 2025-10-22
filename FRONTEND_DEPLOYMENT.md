# Frontend Deployment Guide

Your frontend is ready to be deployed to Vercel! Here's how to deploy your React + Vite frontend.

## 🚀 Quick Deployment Steps

### Step 1: Update API URL
I've already updated your frontend to use environment variables for the API URL. You'll need to set the backend URL when deploying.

### Step 2: Deploy to Vercel

#### Option A: Deploy Frontend as Separate Project (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"

2. **Import Repository**
   - Select your GitHub repository
   - **Important**: Set the **Root Directory** to `frontend`

3. **Configure Build Settings**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-app.vercel.app/api`
   - Replace `your-backend-app` with your actual backend Vercel URL

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

#### Option B: Deploy Both Frontend and Backend Together

If you want both in one Vercel project:

1. **Create a new Vercel project**
2. **Set Root Directory** to project root (not backend or frontend)
3. **Configure Build Settings**:
   - **Build Command**: `cd frontend && npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `cd frontend && npm install`

## 🔧 Configuration Files Created

### `frontend/vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/assets/(.*)",
      "dest": "/assets/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Updated `frontend/src/services/api.ts`
- Now uses `import.meta.env.VITE_API_URL` for the API base URL
- Falls back to localhost for development

## 🌐 Your URLs After Deployment

- **Backend API**: `https://your-backend-app.vercel.app`
- **Frontend**: `https://your-frontend-app.vercel.app`

## 🧪 Testing Your Deployment

1. **Test Backend**: Visit `https://your-backend-app.vercel.app/health`
2. **Test Frontend**: Visit `https://your-frontend-app.vercel.app`
3. **Test Full Flow**: 
   - Register/Login on frontend
   - Browse menu items
   - Place an order

## 🔄 Environment Variables

### For Frontend (Vercel Dashboard):
```
VITE_API_URL=https://your-backend-app.vercel.app/api
```

### For Backend (already configured):
```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your-jwt-secret
NODE_ENV=production
```

## 🚨 Important Notes

1. **CORS Configuration**: Your backend is already configured to allow requests from your frontend domain
2. **Database**: Make sure to run the seed script to populate your menu items
3. **HTTPS**: Both frontend and backend will use HTTPS automatically on Vercel

## 🐛 Troubleshooting

### Common Issues:

1. **API Connection Failed**
   - Check that `VITE_API_URL` is set correctly
   - Verify backend is deployed and accessible
   - Check browser console for CORS errors

2. **Build Failures**
   - Ensure all dependencies are in `package.json`
   - Check that TypeScript compilation succeeds
   - Verify Vite build works locally: `npm run build`

3. **Routing Issues**
   - The `vercel.json` handles SPA routing
   - All routes should redirect to `index.html`

## 🎉 Success!

Once deployed, you'll have:
- ✅ **Backend API** running on Vercel
- ✅ **Frontend** running on Vercel  
- ✅ **Database** connected to MongoDB Atlas
- ✅ **Full-stack** food ordering system live!

Your KORE Food Ordering System will be fully deployed and accessible to users worldwide! 🌍
