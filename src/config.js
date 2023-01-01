
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({ 
    cloud_name: 'ddysuykam', 
    api_key: '871329316697633', 
    api_secret: 'f-sPWm9qZ4j2ErmSj5EFb4aqQqo' 
  });

export const PORT = process.env.PORT || 4000;
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://anali:daniela.03@respositorio.gt4yfmx.mongodb.net/?retryWrites=true&w=majority";