# CrossFlow Backend API - MongoDB

Backend API server for CrossFlow Protocol with MongoDB database.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 6.0+
- Redis (optional, for caching)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp ../.env .env

# Start MongoDB (if not running)
# macOS with Homebrew:
brew services start mongodb-community

# Or with Docker:
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Start development server
npm run dev
```

## 📊 MongoDB Setup

### Local MongoDB

```bash
# Install MongoDB (macOS)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify MongoDB is running
mongosh
```

### MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/crossflow
   ```

## 🗄️ Database Schema

### Collections

- **users** - User accounts and profiles
- **bankaccounts** - Banking accounts (Savings, Checking, Investment)
- **transactions** - All transactions (deposits, withdrawals, swaps, etc.)
- **loans** - Loan applications and active loans

### Indexes

- `users`: walletAddress, email
- `bankaccounts`: walletAddress, accountNumber
- `transactions`: walletAddress + createdAt, txHash, status
- `loans`: walletAddress + status

## 🔌 API Endpoints

### Banking

- `GET /api/banking/accounts/:walletAddress` - Get all accounts
- `POST /api/banking/accounts` - Create new account
- `POST /api/banking/deposit` - Deposit funds
- `POST /api/banking/withdraw` - Withdraw funds
- `POST /api/banking/loans/apply` - Apply for loan

### Swap

- `POST /api/swap/quote` - Get swap quote
- `POST /api/swap/execute` - Execute swap

### User

- `GET /api/user/:walletAddress` - Get user profile
- `GET /api/user/:walletAddress/portfolio` - Get portfolio
- `GET /api/user/:walletAddress/transactions` - Get transaction history

### Analytics

- `GET /api/analytics/stats` - Get protocol statistics
- `GET /api/analytics/volume?days=7` - Get volume data

## 🔧 Development

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test
```

## 📝 Environment Variables

```bash
MONGODB_URI=mongodb://localhost:27017/crossflow
MONGODB_DB_NAME=crossflow
PORT=3001
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your_secret_here
NODE_ENV=development
```

## 🔐 Security

- Helmet.js for security headers
- CORS configured for frontend
- Rate limiting on API endpoints
- Input validation with express-validator
- JWT authentication ready
- MongoDB injection protection

## 📊 Monitoring

```bash
# Check MongoDB status
mongosh --eval "db.serverStatus()"

# View collections
mongosh crossflow --eval "show collections"

# Count documents
mongosh crossflow --eval "db.users.countDocuments()"
```

## 🚀 Production Deployment

### With MongoDB Atlas

1. Create MongoDB Atlas cluster
2. Whitelist your server IP
3. Get connection string
4. Update MONGODB_URI in production .env
5. Deploy backend to your server

### With Docker

```bash
# Build image
docker build -t crossflow-backend .

# Run container
docker run -p 3001:3001 --env-file .env crossflow-backend
```

## 📈 Scaling

- MongoDB sharding for horizontal scaling
- Redis for caching frequently accessed data
- Load balancer for multiple backend instances
- MongoDB replica sets for high availability

## 🎯 Next Steps

1. Install MongoDB locally or use Atlas
2. Run `npm install` in backend folder
3. Start MongoDB service
4. Run `npm run dev`
5. Test API at http://localhost:3001/health
