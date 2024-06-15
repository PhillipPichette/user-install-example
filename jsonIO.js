import fs from 'fs';

export function WritetoFile(filePath, data) {
    const jsonData = JSON.stringify(data, null, 2); // Convert to JSON string with indentation
    fs.writeFileSync(filePath, jsonData, 'utf8');
  }
  
export function ReadFromFile(filePath) {
    if (fs.existsSync(filePath)) { // Check if the file exists
      const jsonData = fs.readFileSync(filePath, 'utf8'); // Read the file
      const data = JSON.parse(jsonData); // Parse the JSON string
      return data;
    } else {
      console.error('File not found');
      return null;
    }
  }