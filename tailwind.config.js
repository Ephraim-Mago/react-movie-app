/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            width: {
                96: "24rem",
            },
        },
        spinner: (theme) => ({
            default: {
                color: '#dae1e7',
                size: '1em',
                border: '2px',
                speed: '500ms',
            },
        })
    },
    variants: {
        spinner: ['responsive'],
    },
    plugins: [
        require('tailwindcss-spinner')(),
    ],
};
