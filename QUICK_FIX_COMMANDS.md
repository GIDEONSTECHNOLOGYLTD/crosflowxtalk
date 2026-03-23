# ⚡ Quick Fix Commands - Run These Now

## 🔧 **Fix Missing Modals & Wallet Connection**

### **Run these commands in order:**

```bash
# 1. Navigate to frontend folder
cd /Users/gideonaina/CascadeProjects/windsurf-project-7/frontend

# 2. Install missing dependencies (CRITICAL)
npm install @radix-ui/react-dialog @radix-ui/react-toast @radix-ui/react-slot

# 3. Create .env.local file for WalletConnect
cat > .env.local << 'EOF'
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=demo
EOF

# 4. Restart dev server
# Press Ctrl+C to stop current server, then:
npm run dev
```

---

## 🌐 **Get Real WalletConnect ID** (5 minutes)

1. Go to: https://cloud.walletconnect.com
2. Sign up (free)
3. Click "Create Project"
4. Name it "CrossFlow Protocol"
5. Copy the Project ID
6. Replace "demo" in `.env.local` with your real ID

---

## 🧪 **Test After Installing**

1. **Hard refresh browser**: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
2. **Click "Launch App"** → Should go to /swap page
3. **Click "Connect Wallet"** → Should show wallet selection modal
4. **Go to /banking** → Click Deposit → Should show confirmation modal

---

## 📊 **What Will Work After These Fixes**

✅ Launch App button → navigates to /swap  
✅ Connect Wallet → shows wallet modal (MetaMask/WalletConnect)  
✅ Banking deposit → shows confirmation modal  
✅ Banking withdraw → shows confirmation modal  
✅ Banking transfer → shows confirmation modal  
✅ Swap tokens → shows confirmation modal  
✅ All forms validate input  
✅ All operations show loading states  
✅ All transactions show success/error messages  

---

## 🚀 **Push to GitHub**

```bash
cd /Users/gideonaina/CascadeProjects/windsurf-project-7
git push -u origin main
```

If you get authentication error, use GitHub Personal Access Token as password.

---

## 📝 **Add Your L1X API Key**

Edit `.env` file and replace:
```
L1X_API_KEY=your_actual_api_key_from_l1x_app
```

With your actual key from https://l1xapp.com/account/api-keys

---

## ⚡ **TL;DR - Just Run This**

```bash
cd /Users/gideonaina/CascadeProjects/windsurf-project-7/frontend
npm install @radix-ui/react-dialog @radix-ui/react-toast @radix-ui/react-slot
echo "NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=demo" > .env.local
# Then restart dev server (Ctrl+C, then npm run dev)
```

After this, modals and wallet connection will work.
