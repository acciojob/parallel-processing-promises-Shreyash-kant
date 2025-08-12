//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loader = document.getElementById("loading");
const errorDiv = document.getElementById("error");


const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
function downloadImage(URL){
	return new Promise((resolve,reject)=>{
		const image = new Image();
		image.onload = ()=>resolve(image);
		image.onerror = ()=>reject(`Failed to load image: ${URL}`);
		image.src = URL;
	})
}
function downloadImages(){
	output.innerHTML = "";
	errorDiv.textContent = "";
	loader.style.display = "block";
	Promise.all(images.map(image=>downloadImage(image.url))).then((loadedImages)=>{
		loadedImages.forEach((image)=>{
			output.appendChild(image);
		})
		
	}).catch((err)=>{
		errorDiv.textContent = err;
	}).finally(()=>{
		loader.style.display="none";
	})
}
btn.addEventListener("click",downloadImages);
