const image1Input = document.getElementById('image1');
const image2Input = document.getElementById('image2');
const blendModeSelect = document.getElementById('blend-mode');
const blendButton = document.getElementById('blend-button');
const imageContainer = document.getElementById('image-container');
const downloadButton = document.getElementById('download-button');

blendButton.addEventListener('click', () => {
  const image1 = new Image();
  image1.src = URL.createObjectURL(image1Input.files[0]);
  image1.onload = () => {
    const image2 = new Image();
    image2.src = URL.createObjectURL(image2Input.files[0]);
    image2.onload = () => {
      const blendMode = blendModeSelect.value;
      const canvas = document.createElement('canvas');
      canvas.width = image1.width;
      canvas.height = image1.height;
      const context = canvas.getContext('2d');
      context.globalCompositeOperation = blendMode;
      context.drawImage(image1, 0, 0);
      context.drawImage(image2, 0, 0);
      const blendedImage = new Image();
      blendedImage.src = canvas.toDataURL();
      imageContainer.innerHTML = '';
      imageContainer.appendChild(blendedImage);
      downloadButton.removeAttribute('disabled');
    };
  };
});

downloadButton.addEventListener('click', () => {
  const blendedImage = imageContainer.querySelector('img');
  const link = document.createElement('a');
  link.href = blendedImage.src;
  link.download = 'blended_image.png';
  link.click();
});
