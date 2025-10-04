# BloomCart - Flower & Décor E-Commerce Platform

A production-ready, SEO-friendly e-commerce website for fresh flowers, artificial/dried décor, and event decoration packages. Built with Next.js 14, TypeScript, and modern web technologies.

## 🌸 Features

### Customer Features
- **Product Catalog**: Browse flowers and décor with advanced filtering
- **Product Details**: High-resolution images, reviews, and detailed descriptions
- **Shopping Cart**: Add to cart, wishlist, and quantity management
- **Checkout**: Secure payment with Razorpay (India) and Stripe (International)
- **Order Tracking**: Real-time order status updates via email & WhatsApp
- **Event Booking**: Date/time picker with décor add-ons and instant quotes
- **User Authentication**: Email/OTP and Google login
- **Address Management**: Multiple delivery addresses
- **Reviews & Ratings**: Product reviews and ratings system

### Partner Features
- **Partner Dashboard**: Manage products, pricing, and inventory
- **Order Management**: Accept/dispatch orders
- **Analytics**: Sales reports and performance metrics
- **Commission Tracking**: Real-time commission calculations

### Admin Features
- **Admin Dashboard**: Sales reports and user management
- **Commission Settings**: Configure partner commission rates
- **Content Management**: Manage products, categories, and promotions

## 🛠 Tech Stack

- **Frontend**: Next.js 14 with App Router, TypeScript
- **Styling**: TailwindCSS + Shadcn UI
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Razorpay (India) + Stripe (International)
- **Image Upload**: Cloudinary
- **Deployment**: Vercel
- **Notifications**: Twilio (WhatsApp/SMS) + SendGrid (Email)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bloomcart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your actual values:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/bloomcart"
   
   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # OAuth Providers
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # Email Configuration
   EMAIL_SERVER_HOST="smtp.gmail.com"
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER="your-email@gmail.com"
   EMAIL_SERVER_PASSWORD="your-app-password"
   EMAIL_FROM="noreply@bloomcart.com"
   
   # Payment Gateways
   RAZORPAY_KEY_ID="your-razorpay-key-id"
   RAZORPAY_KEY_SECRET="your-razorpay-key-secret"
   STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
   STRIPE_SECRET_KEY="your-stripe-secret-key"
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
   CLOUDINARY_API_KEY="your-cloudinary-api-key"
   CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
   
   # Notifications
   TWILIO_ACCOUNT_SID="your-twilio-account-sid"
   TWILIO_AUTH_TOKEN="your-twilio-auth-token"
   SENDGRID_API_KEY="your-sendgrid-api-key"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
bloomcart/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (dashboard)/        # Dashboard pages
│   │   ├── api/               # API routes
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/                # Shadcn UI components
│   │   ├── layout/            # Layout components
│   │   └── forms/             # Form components
│   └── lib/                   # Utility functions
│       ├── auth.ts            # NextAuth configuration
│       ├── db.ts              # Database connection
│       ├── types.ts           # TypeScript types
│       └── utils.ts           # Utility functions
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
└── components.json            # Shadcn UI configuration
```

## 🗄 Database Schema

The application uses a comprehensive database schema with the following main models:

- **Users**: Customer, partner, and admin accounts
- **Products**: Flower and décor items with images
- **Orders**: Order management with tracking
- **Partners**: Florist and decorator profiles
- **Reviews**: Product reviews and ratings
- **Events**: Event booking and management
- **Addresses**: Delivery and billing addresses
- **Cart**: Shopping cart items

## 🎨 Design System

The application uses a floral-inspired color palette:

- **Primary**: Sage Green (#8BB9A8)
- **Secondary**: Soft Cream (#F8F5F0)
- **Accent**: Soft Pink (#E2B7C6)
- **Background**: White with subtle gradients

## 🔐 Authentication

The application supports multiple authentication methods:

- **Email/Password**: Traditional email and password login
- **Email/OTP**: Passwordless login with OTP
- **Google OAuth**: Social login with Google
- **Role-based Access**: Customer, Partner, and Admin roles

## 💳 Payment Integration

- **Razorpay**: Primary payment gateway for India
- **Stripe**: International payment processing
- **Secure Checkout**: PCI-compliant payment handling
- **Multiple Payment Methods**: Cards, UPI, Net Banking, Wallets

## 📱 Responsive Design

- **Mobile-first**: Optimized for mobile devices
- **Responsive Layout**: Adapts to all screen sizes
- **Touch-friendly**: Optimized for touch interactions
- **Fast Loading**: Optimized images and code splitting

## 🚀 Deployment

### Vercel Deployment

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run e2e tests
npm run test:e2e

# Run all tests
npm run test:all
```

## 📊 SEO Features

- **Dynamic Meta Tags**: SEO-optimized page titles and descriptions
- **OpenGraph**: Social media sharing optimization
- **Schema.org**: Structured data for products and reviews
- **Sitemap**: Automatic sitemap generation
- **Performance**: Core Web Vitals optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email hello@bloomcart.com or join our Discord community.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Shadcn UI for the beautiful component library
- Prisma team for the excellent ORM
- All contributors who help make this project better

---

**BloomCart** - Bringing nature's beauty to your doorstep 🌸# Bloomcart
