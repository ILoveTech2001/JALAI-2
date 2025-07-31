-- JALAI Database Initialization Script
-- Run this script to set up the database for local development

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS jalai_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the database
USE jalai_db;

-- Show current database
SELECT DATABASE() as 'Current Database';

-- Create a simple user for development (optional)
-- Uncomment the lines below if you want a dedicated user
-- CREATE USER IF NOT EXISTS 'jalai_dev'@'localhost' IDENTIFIED BY 'jalai_dev_password';
-- GRANT ALL PRIVILEGES ON jalai_db.* TO 'jalai_dev'@'localhost';
-- FLUSH PRIVILEGES;

-- Show existing tables (will be empty initially, tables will be created by Flyway migrations)
SHOW TABLES;

-- Display success message
SELECT 'Database setup completed successfully!' as 'Status';
