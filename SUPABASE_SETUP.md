# Supabase Setup Guide for BloomCart

This guide will help you set up Supabase as the database for your BloomCart e-commerce application.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization and enter project details:
   - **Name**: BloomCart
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region to your users
4. Click "Create new project"

## 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **Anon/Public Key** (starts with `eyJ`)

## 3. Configure Environment Variables

Create a `.env.local` file in your project root and add:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project-ref.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# NextAuth.js (required for the app to run)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

## 4. Set Up the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `supabase-schema.sql` from your project root
3. Paste it into the SQL Editor and click "Run"

This will create:
- The `products` table with all necessary columns
- Indexes for better performance
- Row Level Security (RLS) policies
- Sample data with 12 products

## 5. Verify the Setup

1. Go to **Table Editor** in your Supabase dashboard
2. You should see the `products` table with sample data
3. The table should have columns: `id`, `name`, `description`, `type`, `price`, etc.

## 6. Test Your Application

1. Start your Next.js development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000`
3. You should see:
   - Featured products on the homepage (loaded from Supabase)
   - Products page with filtering and search working
   - Product images from Unsplash URLs

## Database Schema Overview

The `products` table includes:

- **id**: UUID primary key
- **name**: Product name
- **description**: Product description
- **type**: Product type (FRESH_FLOWERS, DRIED_FLOWERS, etc.)
- **price**: Price in paise (multiply by 100)
- **original_price**: Original price for discounts
- **category**: Product category
- **occasion**: Array of occasions
- **stock**: Available quantity
- **is_active**: Whether product is active
- **is_featured**: Whether product is featured
- **rating**: Product rating (0-5)
- **review_count**: Number of reviews
- **partner_id**: Partner identifier
- **partner_name**: Partner name
- **image**: Product image URL
- **created_at**: Creation timestamp
- **updated_at**: Last update timestamp

## Features Implemented

✅ **Dynamic Product Loading**: All products now load from Supabase
✅ **Search & Filtering**: Full-text search and filtering by type, category, price
✅ **Pagination**: Efficient pagination with proper counting
✅ **Sorting**: Sort by price, rating, newest, featured
✅ **Image Support**: Product images from Unsplash
✅ **Error Handling**: Graceful fallbacks if Supabase is unavailable
✅ **Type Safety**: Full TypeScript support with proper types

## Next Steps

1. **Add More Products**: Use the Supabase dashboard to add more products
2. **Customize Images**: Replace Unsplash URLs with your own product images
3. **Set Up Authentication**: Configure user authentication for cart/orders
4. **Add Image Upload**: Integrate Cloudinary for product image uploads
5. **Performance**: Add caching with Redis or similar

## Troubleshooting

**Products not loading?**
- Check your environment variables are correct
- Verify the Supabase project is active
- Check the browser console for errors

**Images not showing?**
- Unsplash images should work by default
- Replace with your own image URLs if needed

**Database errors?**
- Ensure the SQL schema was run successfully
- Check RLS policies are enabled
- Verify the anon key has proper permissions

