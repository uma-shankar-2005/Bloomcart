-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  price INTEGER NOT NULL, -- Price in cents/paise
  original_price INTEGER,
  category VARCHAR(100) NOT NULL,
  occasion TEXT[] DEFAULT '{}', -- Array of occasions
  stock INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  rating DECIMAL(3,2) DEFAULT 0.0,
  review_count INTEGER DEFAULT 0,
  partner_id VARCHAR(100) NOT NULL,
  partner_name VARCHAR(255) NOT NULL,
  image TEXT NOT NULL, -- URL to product image
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_type ON products(type);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_rating ON products(rating);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to active products
CREATE POLICY "Allow public read access to active products" ON products
  FOR SELECT USING (is_active = true);

-- Insert sample data
INSERT INTO products (name, description, type, price, original_price, category, occasion, stock, is_active, is_featured, rating, review_count, partner_id, partner_name, image) VALUES
('Red Rose Bouquet', 'A beautiful arrangement of 12 fresh red roses, perfect for expressing love and romance.', 'FRESH_FLOWERS', 89900, 129900, 'Roses', '{"Valentine''s Day", "Anniversary", "Romance"}', 25, true, true, 4.8, 124, 'partner-1', 'Delhi Florist', 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400'),

('Mixed Flower Arrangement', 'A vibrant mix of seasonal flowers including roses, lilies, and chrysanthemums.', 'FRESH_FLOWERS', 129900, 159900, 'Mixed Bouquets', '{"Birthday", "Anniversary", "Congratulations"}', 18, true, true, 4.9, 89, 'partner-2', 'Mumbai Blooms', 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400'),

('Sunflower Bouquet', 'Bright and cheerful sunflowers that bring sunshine to any room.', 'FRESH_FLOWERS', 69900, 99900, 'Sunflowers', '{"Birthday", "Get Well Soon", "Congratulations"}', 32, true, false, 4.7, 156, 'partner-1', 'Delhi Florist', 'https://images.unsplash.com/photo-1597848212624-e19db83e34ba?w=400'),

('Orchid Plant', 'Elegant orchid plant perfect for home or office decoration.', 'FRESH_FLOWERS', 159900, 199900, 'Plants', '{"Home Décor", "Office", "Gift"}', 15, true, true, 4.6, 78, 'partner-3', 'Bangalore Garden', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'),

('Dried Lavender Bundle', 'Fragrant dried lavender perfect for home décor and aromatherapy.', 'DRIED_FLOWERS', 39900, 59900, 'Dried Herbs', '{"Home Décor", "Wedding", "Gift"}', 45, true, true, 4.6, 78, 'partner-3', 'Bangalore Garden', 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?w=400'),

('Artificial Rose Arrangement', 'Lifelike artificial roses that never wilt, perfect for long-term decoration.', 'ARTIFICIAL_FLOWERS', 59900, 79900, 'Artificial Roses', '{"Home Décor", "Office", "Wedding"}', 67, true, false, 4.5, 92, 'partner-2', 'Mumbai Blooms', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'),

('Ceramic Vase Set', 'Beautiful ceramic vases perfect for displaying your favorite flowers.', 'DECOR_ITEMS', 129900, 169900, 'Vases', '{"Home Décor", "Wedding", "Gift"}', 23, true, true, 4.7, 45, 'partner-4', 'Chennai Crafts', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'),

('Wedding Package - Premium', 'Complete wedding decoration package including flowers, centerpieces, and archway.', 'EVENT_PACKAGES', 1599900, 1999900, 'Wedding Packages', '{"Wedding", "Anniversary"}', 5, true, true, 4.9, 23, 'partner-1', 'Delhi Florist', 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400'),

('Custom Bouquet Builder', 'Create your own unique bouquet by selecting from our wide variety of flowers.', 'CUSTOM_BOUQUETS', 79900, 99900, 'Custom Arrangements', '{"Birthday", "Anniversary", "Valentine''s Day", "Wedding"}', 100, true, false, 4.8, 67, 'partner-2', 'Mumbai Blooms', 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400'),

('White Lily Bouquet', 'Pure white lilies symbolizing peace and tranquility.', 'FRESH_FLOWERS', 109900, 149900, 'Lilies', '{"Sympathy", "Wedding", "Anniversary"}', 20, true, true, 4.7, 95, 'partner-1', 'Delhi Florist', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'),

('Tulip Garden Mix', 'Colorful tulips in various shades, perfect for spring celebrations.', 'FRESH_FLOWERS', 89900, 119900, 'Tulips', '{"Spring", "Birthday", "Mother''s Day"}', 28, true, false, 4.6, 112, 'partner-2', 'Mumbai Blooms', 'https://images.unsplash.com/photo-1520637836862-4d197d17c50a?w=400'),

('Eucalyptus Dried Bundle', 'Aromatic eucalyptus branches perfect for modern home décor.', 'DRIED_FLOWERS', 49900, 69900, 'Dried Leaves', '{"Home Décor", "Modern", "Minimalist"}', 35, true, false, 4.5, 67, 'partner-3', 'Bangalore Garden', 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?w=400');

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

