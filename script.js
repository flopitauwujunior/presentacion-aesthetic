const imageInput = document.getElementById("imageUpload");
const paletteDiv = document.getElementById("palette");
const previewContainer = document.getElementById("previewContainer");
const slideCountInput = document.getElementById("slideCount");
const copyButton = document.getElementById("copyColors");
let palette = [];

imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    const img = new Image();
    const reader = new FileReader();
    reader.onload = () => {
        img.src = reader.result;
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            const colorThief = new ColorThief();
            palette = colorThief.getPalette(img, 6);
            displayPalette();
            generateSlides();
        };
    };
    reader.readAsDataURL(file);
});

slideCountInput.addEventListener("change", generateSlides);

function displayPalette() {
    paletteDiv.innerHTML = "";
    palette.forEach(rgb => {
        const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
        const div = document.createElement("div");
        div.className = "color-box";
        div.style.backgroundColor = hex;
        paletteDiv.appendChild(div);
    });
}

function generateSlides() {
    previewContainer.innerHTML = "";
    const count = parseInt(slideCountInput.value);
    for (let i = 0; i < count; i++) {
        const slide = document.createElement("div");
        slide.className = "slide-preview";
        const color = palette[i % palette.length];
        const hex = rgbToHex(...color);
        slide.style.backgroundColor = hex;
        slide.textContent = `Diapositiva ${i + 1}`;

        const sticker = document.createElement("img");
        sticker.src = "stickers/sticker1.png";
        sticker.className = "sticker";
        slide.appendChild(sticker);

        previewContainer.appendChild(slide);
    }
}

function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join("");
}

copyButton.addEventListener("click", () => {
    const hexColors = palette.map(rgb => rgbToHex(...rgb)).join(", ");
    navigator.clipboard.writeText(hexColors).then(() => {
        alert("Paleta copiada: " + hexColors);
    });
});
