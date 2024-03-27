const axios = require("axios");
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");

// Connection string for Azure Storage Account
const connStr = "Your-Connection-String-Here";

// Initialize BlobServiceClient
const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);
const containerName = "joomlaarticles";

async function main() {
  const endpointURL = [
    "Your-Endpoints-Here"
  ];
  
  try {
    const token = "Your-Token-Here";
    const headers = {
      Authorization: `Bearer ${token}`,
      ContentType: "application/json",
    };

    // Ensure the container exists
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.createIfNotExists({ access: 'container' });

    for (let url of endpointURL) {
      const response = await axios.get(url, { headers });
      console.log("API Response for URL", url, ":", response.data);

      if (response.status !== 200) {
        console.error(`Failed to fetch data from the API. Status: ${response.status}`);
        throw new Error(`Failed to fetch data from the API. Status: ${response.status}`);
      }

      const articles = response.data.data;

      for (const article of articles) {
        const { title, text } = article.attributes;
        console.log("Processing article:", title);

        const htmlContent = `<html><head><title>${title}</title></head><body>${text}</body></html>`;
        const blobName = `usto/${title.replace(/[\/\?<>\\:\*\|":]/g, "_")}.html`;

        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.upload(htmlContent, Buffer.byteLength(htmlContent), {
          blobHTTPHeaders: { blobContentType: "text/html" },
        });

        console.log("Uploaded HTML file:", title);
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main().then(() => console.log("Script execution completed."));
