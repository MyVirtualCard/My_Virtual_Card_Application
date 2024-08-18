import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import axios from 'axios';

const ImageCropAndUpload = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => setImageSrc(reader.result);
    }
  };

  const getCroppedImg = useCallback(async () => {
    const createImage = (url) =>
      new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous'); // to avoid CORS-related issues
        image.src = url;
      });

    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const { width, height } = croppedAreaPixels;
    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      width,
      height,
      0,
      0,
      width,
      height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        const fileUrl = window.URL.createObjectURL(blob);
        resolve(fileUrl);
        setCroppedImage(fileUrl);
      }, 'image/jpeg');
    });
  }, [imageSrc, croppedAreaPixels]);

  const handleUpload = async () => {
    if (!croppedImage) return;

    const formData = new FormData();
    const response = await fetch(croppedImage);
    const blob = await response.blob();
    formData.append('file', blob, 'cropped_image.jpg');

    axios.post('/upload-endpoint', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((response) => {
      console.log('Upload Success:', response.data);
    }).catch((error) => {
      console.error('Upload Error:', error);
    });
  };

  return (
    <div style={{height:'100vh',overflow:scroll}}>
      <input type="file" accept="image/*" onChange={onSelectFile} />
      {imageSrc && (
        <>
          <div style={{ position: 'relative', width: '100%', height: 400 }}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <button onClick={getCroppedImg}>Crop Image</button>
          {croppedImage && (
            <div>
              <img src={croppedImage} alt="Cropped" />
              <button onClick={handleUpload}>Upload Cropped Image</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ImageCropAndUpload;
