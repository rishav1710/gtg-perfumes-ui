# GTG Perfumes UI

A premium e-commerce website for high-end perfumes built with vanilla HTML, CSS, and JavaScript. Features an interactive product gallery, subscription plans, and a fully responsive design optimized for all devices.

## 🌟 Key Features

- **Sticky Navigation** - Header that becomes fixed on scroll with blur effect
- **Mobile-Friendly** - Responsive design with hamburger menu for mobile devices
- **Interactive Product Gallery** - Image carousel with navigation and thumbnail previews
- **Subscription Plans** - Toggle between Single and Double fragrance options
- **Animated Statistics** - Count-up animation triggered on scroll
- **Accordion Component** - Expandable collection sections
- **Feature Comparison** - Table comparing GTG with competitors
- **Lazy Loading** - Optimized images for better performance

## 🚀 Quick Start

No build process required! Simply open `index.html` in your browser or use a local server:

## 📁 Project Structure

```
gtg-perfumes-ui/
├── index.html          # Main HTML file
├── css/style.css       # Complete styling
├── js/main.js          # Interactive functionality
└── assets/
    ├── icons/          # SVG icons
    └── images/         # Product and hero images
```

## 🎨 Tech Stack

- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Flexbox/Grid layouts, animations, responsive design
- **JavaScript** - Vanilla JS (no dependencies) with modern APIs

## 📱 Responsive Design

- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 992px)
- ✅ Mobile (480px - 768px)
- ✅ Small Mobile (<480px)

## 🎯 Main Components

| Component          | Purpose                             |
| ------------------ | ----------------------------------- |
| Header             | Navigation and branding             |
| Hero Section       | Main call-to-action with stats      |
| Product Gallery    | Image carousel with thumbnails      |
| Subscription Plans | Plan selector and fragrance options |
| Collection         | Accordion with product details      |
| Stats Section      | Animated counter statistics         |
| Comparison         | Feature comparison table            |
| Footer             | Links and newsletter signup         |

## 💡 Customization

### Change Fragrances

Update the fragrances array in `js/main.js`

### Modify Prices

Update prices in the HTML subscription section

## 🔧 JavaScript Features

- **IntersectionObserver** - Scroll-based animations
- **Dynamic Element Creation** - Fragrance cards and gallery
- **Event Handling** - Click, scroll, and change events
- **URL Parameter Builder** - Checkout URL construction

## 🌐 Browser Support

- Chrome/Chromium
- Firefox
- Safari
- Edge
- Mobile browsers

## 📊 Performance

- No external dependencies
- Optimized with lazy loading
- CSS-based animations
- ~52KB total code size

## 📝 Notes

- Update all `#` links with real URLs
- Add product images to `assets/images/` folder
- Newsletter form requires backend integration
- Checkout system ready for API integration
