const paleta = document.querySelector(".paleta");

function createColor(num){
    const color = document.createElement("a");
    color.style.border = `1px solid var(--color-${num})`;
    color.style.background = `var(--color-${num})`;
    return color;
}

for(let i =1; i<11; i++){
    const newColor = createColor(i);
    paleta.append(newColor);
}