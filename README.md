# Meme Generator 😎

A fun and fully-functional meme generator built using vanilla JavaScript, HTML, and CSS.Users can choose an image, add text, change font, size, color, alignments — and then download or save their meme locally. Saved memes are stored in `localStorage` and can be loaded later for editing or sharing.

---

## ✨ Features

- 🖼️ **Image Gallery** – Select memes from a diverse set of predefined images
- ✍️ **Text Editing** – Add multiple text lines, change color, size, font, and alignment
- 🎨 **Font Selection** – Choose from several Google Fonts and custom fonts
- 📅 **Save & Update** – Save your memes to localStorage and edit them later (CRUD)
- 📅 **Download** – Export your meme as a PNG image
- 📤 **Share** – Upload and share memes (e.g., via Facebook)
- 📱 **Touch Support** – Full support for mobile touch gestures
- 🧠 **No External Libraries** – Built entirely with Vanilla JS

---

## 🧹 Tech Stack

- HTML5
- CSS3 (including `flex`, `grid`, media queries)
- JavaScript (ES6+)
- `canvas` API
- LocalStorage

---

## 📂 Project Structure

```
📁 MemeGenerator
🔽 index.html
🔽 style.css
🔽 memeController.js         # Handles canvas rendering and interactions
🔽 memeService.js            # Meme data logic (create, update, set text, font, etc.)
🔽 galleryController.js      # Loads and renders the image gallery
🔽 savedMemesController.js   # Handles saving, loading, updating memes
🔽 util.js                   # Utility functions like ID generation and localStorage
🔽 assets/
    └─📁 meme-imgs/            # Folder containing meme images
```

---

## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Dorazar/MemeGenerator.git
   ```

2. Open `index.html` in your browser.

3. Start creating memes!

---

## 🖼️ Preview

To embed this README as an About page in your project:

1. Create a new file named `about.html`
2. Copy the content of this README (converted to HTML) into that file
3. Add a navigation link in your `header`:

```html
<a href="about.html">About</a>
```

4. (Optional) Style it with your existing `style.css` or create a dedicated stylesheet.

---

## 👤 Author

**Dor Azar**[LinkedIn](https://www.linkedin.com/in/dor-azar-19b749246/) | [GitHub](https://github.com/Dorazar)

---

## 📃 License

This project is for learning purposes and is free to use and modify.
