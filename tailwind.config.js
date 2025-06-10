/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./assets/flowbite/**/*.js",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#4A6670", // Vert sauge profond
                secondary: "#D67D5B", // Terracotta doux
                accent1: "#E4B363", // Jaune moutarde
                accent2: "#2F7D95", // Bleu canard
                neutral: "#F1EEE9", // Beige clair
                dark: "#2E353E", // Gris anthracite
            },
            fontFamily: {
                sans: ["Montserrat", "Lato", "sans-serif"],
                heading: ["Montserrat", "sans-serif"],
                body: ["Lato", "sans-serif"],
            },
        },
    },
    plugins: [
        require('flowbite/plugin')
    ],
};
