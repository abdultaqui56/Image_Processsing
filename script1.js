var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    var originalImage;

    function loadImage(input) {
      var file = input.files[0];
      var reader = new FileReader();

      reader.onload = function(e) {
        img.onload = function() {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          originalImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

          // Display the image preview
          var imagePreview = document.getElementById('image-preview');
          imagePreview.src = canvas.toDataURL();
          imagePreview.style.display = 'block';
        };

        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }

    function applyOptions() {
      var grayscaleCheckbox = document.getElementById('grayscale-checkbox');
      var blurCheckbox = document.getElementById('blur-checkbox');

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.putImageData(originalImage, 0, 0);

      if (grayscaleCheckbox.checked) {
        applyGrayscale();
      }

      if (blurCheckbox.checked) {
        applyBlur();
      }
    }

    function applyGrayscale() {
      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var data = imageData.data;

      for (var i = 0; i < data.length; i += 4) {
        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
      }

      ctx.putImageData(imageData, 0, 0);
    }

    function applyBlur() {
      var blurLevel = 5;
      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var data = imageData.data;

      for (var i = 0; i < data.length; i += 4) {
        var sumRed = 0;
        var sumGreen = 0;
        var sumBlue = 0;
        var count = 0;

        for (var x = -blurLevel; x <= blurLevel; x++) {
          for (var y = -blurLevel; y <= blurLevel; y++) {
            var pixelIndex = i + (y * canvas.width + x) * 4;

            if (pixelIndex >= 0 && pixelIndex < data.length) {
              sumRed += data[pixelIndex];
              sumGreen += data[pixelIndex + 1];
              sumBlue += data[pixelIndex + 2];
              count++;
            }
          }
        }

        data[i] = sumRed / count;
        data[i + 1] = sumGreen / count;
        data[i + 2] = sumBlue / count;
      }

      ctx.putImageData(imageData, 0, 0);
    }

    function cropImage() {
      var x = parseInt(document.getElementById('crop-x').value);
      var y = parseInt(document.getElementById('crop-y').value);
      var width = parseInt(document.getElementById('crop-width').value);
      var height = parseInt(document.getElementById('crop-height').value);

      canvas.width = width;
      canvas.height = height;
      ctx.putImageData(originalImage, -x, -y);
      var croppedDataURL = canvas.toDataURL();

      var croppedImage = document.getElementById('cropped-image');
      croppedImage.src = croppedDataURL;
      croppedImage.style.display = 'block';

      var downloadButton = document.getElementById('download-button');
      downloadButton.style.display = 'block';
    }

    function resetImage() {
      var imagePreview = document.getElementById('image-preview');
      imagePreview.src = '';
      imagePreview.style.display = 'none';

      var croppedImage = document.getElementById('cropped-image');
      croppedImage.src = '';
      croppedImage.style.display = 'none';

      var downloadButton = document.getElementById('download-button');
      downloadButton.style.display = 'none';
    }

    function downloadImage() {
      var downloadLink = document.getElementById('download-link');
      downloadLink.href = canvas.toDataURL();
      downloadLink.download = 'edited_image.png';
      downloadLink.click();
    }

	