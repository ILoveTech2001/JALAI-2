# JALAI - Donate & Shop for Good

JALAI is a comprehensive platform that bridges the gap between compassion and action. We connect generous hearts with orphanages in need, while also providing a sustainable marketplace for quality second-hand goods.

## 🌟 Features

### 🏠 Donation System
- **Direct Donations**: Make monetary or item donations to verified orphanages
- **Auto-fill Forms**: Logged-in users get pre-filled donation forms
- **Status Tracking**: Track donation approval/rejection status
- **Admin Management**: Admins can approve/reject donations with custom messages
- **Notifications**: Real-time notifications for donation status updates

### 🛍️ E-commerce Platform
- **Second-hand Marketplace**: Browse clothing, electronics, furniture, and more
- **Shopping Cart**: Add items with images, prices, and quantities
- **Checkout System**: Multiple payment options (Mobile Money, Orange Money, PayPal)
- **Order Management**: Track orders and purchase history

### 👥 User Management
- **Multi-role System**: Clients, Admins, and Orphanages
- **User Dashboards**: Personalized dashboards for each user type
- **Profile Management**: Update personal information and preferences

## 🚀 Tech Stack

### Frontend
- **React** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons
- **FontAwesome** for additional icons

### Backend
- **Node.js** with Express
- **RESTful API** architecture
- **In-memory storage** (for demo purposes)
- **CORS** enabled for cross-origin requests

## 📁 Project Structure

```
JALAI-2/
├── frontend/JALAI-Ecommerce/donation-Platform/    # React frontend
│   ├── src/
│   │   ├── components/                            # Reusable components
│   │   ├── pages/                                 # Page components
│   │   ├── contexts/                              # React contexts
│   │   ├── hooks/                                 # Custom hooks
│   │   └── services/                              # API services
│   └── public/                                    # Static assets
└── backend-express/                               # Node.js backend
    ├── test-server.js                             # Main server file
    └── package.json                               # Backend dependencies
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Frontend Setup
```bash
cd frontend/JALAI-Ecommerce/donation-Platform
npm install
npm run dev
```

### Backend Setup
```bash
cd backend-express
npm install
node test-server.js
```

## 🌐 Deployment

### Frontend (Vercel)
- Build command: `npm run build`
- Output directory: `dist`
- Framework preset: Vite

### Backend (Render)
- Build command: `npm install`
- Start command: `node test-server.js`
- Environment: Node.js

## 🔑 Test Accounts

- **Admin**: `admin@jalai.com` / `admin123`
- **Client**: `client@jalai.com` / `client123`
- **Orphanage**: `orphanage@jalai.com` / `orphanage123`
- **Personal**: `moforbei@gmail.com` / `password123`

## 🎯 Key Features Implemented

- ✅ **Donation Flow**: Complete donation system with admin approval
- ✅ **Shopping Cart**: Full e-commerce functionality with checkout
- ✅ **Payment Simulation**: Mobile Money, Orange Money, PayPal
- ✅ **User Authentication**: Multi-role login system
- ✅ **Responsive Design**: Mobile-friendly interface
- ✅ **Real-time Notifications**: Status updates and alerts
- ✅ **Admin Dashboard**: Comprehensive management interface

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

For questions or support, please contact the development team.
