-- SQL generated from Prisma schema for Nextora Agency
-- Run this in Hostinger phpMyAdmin (or any MySQL client)

CREATE TABLE IF NOT EXISTS User (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL DEFAULT 'admin',
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS Lead (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255),
  company VARCHAR(255),
  service VARCHAR(255),
  message TEXT,
  status VARCHAR(255) NOT NULL DEFAULT 'new',
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS BlogPost (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content LONGTEXT NOT NULL,
  seoTitle VARCHAR(255),
  metaDesc TEXT,
  featuredImage VARCHAR(255),
  category VARCHAR(255),
  status VARCHAR(255) NOT NULL DEFAULT 'draft',
  publishedAt DATETIME,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS PortfolioProject (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  content LONGTEXT,
  category VARCHAR(255),
  projectUrl VARCHAR(255),
  featuredImage VARCHAR(255),
  images LONGTEXT NOT NULL DEFAULT '[]',
  results LONGTEXT NOT NULL DEFAULT '[]',
  tags LONGTEXT NOT NULL DEFAULT '[]',
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS Testimonial (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  role VARCHAR(255),
  content TEXT NOT NULL,
  image VARCHAR(255),
  rating INT NOT NULL DEFAULT 5,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS ServiceItem (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(255) NOT NULL DEFAULT 'Globe',
  features LONGTEXT NOT NULL DEFAULT '[]',
  `order` INT NOT NULL DEFAULT 0,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS Subscriber (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Media (
  id VARCHAR(255) PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL DEFAULT 'image',
  size INT NOT NULL DEFAULT 0,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Setting (
  id VARCHAR(255) PRIMARY KEY DEFAULT 'global',
  data LONGTEXT NOT NULL DEFAULT '{}'
);

-- ============================================
-- Create default admin user
-- Email:    admin@nextora.com
-- Password: admin123
-- ============================================
INSERT IGNORE INTO User (id, email, name, password, role, createdAt, updatedAt)
VALUES (
  UUID(),
  'admin@nextora.com',
  'Admin',
  '$2b$12$Rcrv1STgXvfTCWit/DCG4u1cDa/i86zyJwZ6J9aSh5pyzF.C6rfE6',
  'admin',
  NOW(),
  NOW()
);
