// utils.js

/**
 * Converts an image file to a Base64 encoded string.
 * @param {File} file - The file to convert.
 * @returns {Promise<string>} - A promise that resolves with the Base64 encoded string.
 */
export function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.readAsDataURL(file);
      
      reader.onload = () => resolve(reader.result);  // Resolves with Base64 string
      reader.onerror = (error) => reject(error);    // Rejects on error
    });
  }
  