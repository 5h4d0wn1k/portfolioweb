import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to download image from URL
const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const directory = path.join(__dirname, 'public', 'assets');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    
    const filePath = path.join(directory, filename);
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete file on error
      console.error(`Error downloading ${filename}: ${err.message}`);
      reject(err);
    });
  });
};

// Updated Unsplash images for each project
const images = [
  // Nikhil's portrait - Professional headshot
  {
    name: 'nikhil-portrait.jpg',
    url: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    description: 'Professional portrait for Nikhil Nagpure'
  },
  
  // Metatask Web3 Project - Blockchain visualization
  {
    name: 'stock-blockchain.jpg',
    url: 'https://images.unsplash.com/photo-1639322537231-2f206f0da56f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    description: 'Blockchain visualization for Metatask Web3 Productivity App'
  },
  
  // Social Media Marketing Platform - Analytics dashboard
  {
    name: 'stock-socialmedia.jpg',
    url: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    description: 'Social media marketing analytics dashboard'
  },
  
  // Offensive Scanner - Security Testing Tool
  {
    name: 'stock-security.jpg',
    url: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    description: 'Cybersecurity code scanning and vulnerability assessment'
  },
  
  // Open-Source SIEM Platform - Security operations center
  {
    name: 'stock-siem.jpg',
    url: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    description: 'Security operations center with analytics dashboard'
  },
  
  // Web Development Services - Modern web design
  {
    name: 'stock-webdev.jpg',
    url: 'https://images.unsplash.com/photo-1603468620905-8de7d86b781e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    description: 'Modern web development environment with responsive design'
  },
  
  // Cybersecurity Education Platform - Learning environment
  {
    name: 'stock-education.jpg',
    url: 'https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    description: 'Cybersecurity education and learning environment'
  }
];

// Download all images
const downloadAllImages = async () => {
  try {
    console.log('Starting image downloads from Unsplash...');
    
    // Run downloads sequentially to avoid overwhelming the server
    for (const image of images) {
      await downloadImage(image.url, image.name);
      console.log(`   Description: ${image.description}`);
    }
    
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
};

// Execute the download
downloadAllImages(); 