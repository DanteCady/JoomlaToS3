const axios = require("axios");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

// AWS Credentials
accessKeyId = process.env.AWS_SECRET_ID;
secretAccessKey = process.env.AWS_SECRET_KEY;
// Configure AWS SDK
const s3Client = new S3Client({
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
  region: "Your-AWS-Region-Here",
});

async function main() {
  // HTTP Endpoints
   const endpointURL = [
 
   ];
  try {
    const token =
      "Your-Joomla-Token-Here";
    const headers = {
      Authorization: `Bearer ${token}`,
      ContentType: "application/json",
    };

    for (let url of endpointURL) {
      const response = await axios.get(url, { headers });
      console.log("API Response for URL", url, ":", response.data);

      if (response.status !== 200) {
        console.error(
          `Failed to fetch data from the API. Status: ${response.status}`
        );
        throw new Error(
          `Failed to fetch data from the API. Status: ${response.status}`
        );
      }

      const articles = response.data.data;

      for (const article of articles) {
        const { title, text } = article.attributes;
        console.log("Processing article:", title);

        const htmlContent = `<html><head><title>${title}</title></head><body>${text}</body></html>`;

        const params = {
          Bucket: "joomla-articles",
          Key: `{Your-Bucket-Folder-Here}/${title.replace(/[\/\?<>\\:\*\|":]/g, "_")}.html`,
          Body: htmlContent,
          ContentType: "text/html",
        };

        const putObjectCommand = new PutObjectCommand(params);
        await s3Client.send(putObjectCommand);

        console.log("Uploaded HTML file:", title);
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main().then(() => console.log("Script execution completed."));
