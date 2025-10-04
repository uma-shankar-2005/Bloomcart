-- Create products table
CREATE TABLE products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    razorpay_order_id VARCHAR(255),
    razorpay_payment_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Products can be read by anyone, but only admins can modify
CREATE POLICY "Products are viewable by everyone" 
ON products FOR SELECT 
TO PUBLIC 
USING (true);

-- Orders can only be viewed and created by the owner
CREATE POLICY "Users can view their own orders" 
ON orders FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" 
ON orders FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- Insert sample products
INSERT INTO products (name, description, type, price, image_url) VALUES
('Red Rose Bouquet', 'Beautiful arrangement of fresh red roses', 'FRESH_FLOWERS', 49.99, 'https://example.com/red-roses.jpg'),
('Sunflower Bunch', 'Bright and cheerful sunflowers', 'FRESH_FLOWERS', 39.99, 'https://example.com/sunflowers.jpg'),
('Mixed Tulips', 'Colorful mix of fresh tulips', 'FRESH_FLOWERS', 44.99, 'https://example.com/tulips.jpg'),
('White Lily Bouquet', 'Elegant white lilies', 'FRESH_FLOWERS', 54.99, 'https://example.com/lilies.jpg');