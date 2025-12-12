import { createClient } from "@supabase/supabase-js";
import { Buffer } from "buffer";
import * as FileSystem from "expo-file-system";

// 🔐 Supabase client
const supabase = createClient(
  "https://unmbzlobuownlqlhgpzc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVubWJ6bG9idW93bmxxbGhncHpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1Mjg1NzYsImV4cCI6MjA4MTEwNDU3Nn0.yRpQ0kLHhqmqzt9enZKWOfJCU3F1rqlPnXMU7k60UQA.yRpQ0kLHhqmqzt9enZKWOfJCU3F1rqlPnXMU7k60UQAeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4bWFqa2t2eHB5bXdldW54bmhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NTc3MzksImV4cCI6MjA2MjEzMzczOX0.YFRgO7Ufs_LNKK_8MfLtfyPYvMlvg3CySdTzFwpWao4"
);

export default function Mediauplod(fileUri) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!fileUri) {
        reject(new Error("No file selected"));
        return;
      }

      // Read file as base64
      const base64File = await FileSystem.readAsStringAsync(fileUri, {
        encoding: "base64",
      });

      // Convert to Blob
      const fileBlob = Buffer.from(base64File, "base64");

      // File name
      const timeStamp = new Date().getTime();
      const fileName = `${timeStamp}.jpg`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from("images")
        .upload(fileName, fileBlob, {
          contentType: "image/jpeg",
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.log(error);
        reject(error);
        return;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);

      resolve(urlData.publicUrl);

    } catch (err) {
      reject(err);
    }
  });
}
