import { Injectable } from '@angular/core';
import jsQR from "jsqr";
@Injectable({
  providedIn: 'root'
})
export class QrcropService {
 // Main function: crop only QR code from blob URL
  async cropOnlyQR(blobUrl: string): Promise<Blob> {
    const img = await this.loadImage(blobUrl); // call the private method

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, canvas.width, canvas.height);

    if (!code) throw new Error('QR not detected');

    // Get bounding box
    const xMin = Math.min(code.location.topLeftCorner.x, code.location.bottomLeftCorner.x);
    const yMin = Math.min(code.location.topLeftCorner.y, code.location.topRightCorner.y);
    const xMax = Math.max(code.location.bottomRightCorner.x, code.location.topRightCorner.x);
    const yMax = Math.max(code.location.bottomRightCorner.y, code.location.bottomLeftCorner.y);

    const width = xMax - xMin;
    const height = yMax - yMin;

    // Crop QR
    const croppedCanvas = document.createElement('canvas');
    croppedCanvas.width = width;
    croppedCanvas.height = height;
    const croppedCtx = croppedCanvas.getContext('2d')!;
    croppedCtx.drawImage(canvas, xMin, yMin, width, height, 0, 0, width, height);

    // Convert canvas to Blob
    return new Promise<Blob>((resolve, reject) => {
      croppedCanvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to create blob'));
      }, 'image/png');
    });
  }

  // Private helper to load image from URL or blob URL
  private loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

}
