import { createClient } from "@supabase/supabase-js";
import { Buffer } from "buffer";
import * as FileSystem from "expo-file-system/legacy";
import { Platform } from "react-native";

// 🔐 Supabase client
const supabase = createClient(
  "https://unmbzlobuownlqlhgpzc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVubWJ6bG9idW93bmxxbGhncHpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1Mjg1NzYsImV4cCI6MjA4MTEwNDU3Nn0.yRpQ0kLHhqmqzt9enZKWOfJCU3F1rqlPnXMU7k60UQA"
);

export default function Mediauplod(fileUri) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!fileUri) {
        reject(new Error("No file selected"));
        return;
      }

      if (Platform.OS === "web") {
        // Web implementation: Use FileReader API
        const response = await fetch(fileUri);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          // remove the "data:image/jpeg;base64," part
          const base64File = base64data.split(",")[1];
          uploadToSupabase(base64File).then(resolve).catch(reject);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      } else {
        // Native implementation
        const base64File = await FileSystem.readAsStringAsync(fileUri, {
          encoding: "base64",
        });
        uploadToSupabase(base64File).then(resolve).catch(reject);
      }
    } catch (err) {
      console.error("Error in Mediauplod:", err);
      reject(err);
    }
  });
}

// Helper function to handle the Supabase upload logic
async function uploadToSupabase(base64File) {
  try {
    // Convert to Blob
    const fileBlob = Buffer.from(base64File, "base64");

    // File name
    const timeStamp = new Date().getTime();
    const fileName = `${timeStamp}.jpg`;

    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, fileBlob, {
        contentType: "image/jpeg",
        upsert: false,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      throw new Error("Failed to upload image");
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("images")
      .getPublicUrl(fileName);

    if (!publicUrlData) {
      throw new Error("Failed to get public URL");
    }

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error("Error in uploadToSupabase:", err);
    throw err; // Re-throw the error to be caught by the caller
  }
}
