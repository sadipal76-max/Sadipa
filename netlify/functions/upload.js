const AWS = require("aws-sdk");
const s3 = new AWS.S3();

exports.handler = async (event) => {
  try {
    // Decode the base64 body that Netlify provides
    const fileContent = Buffer.from(event.body, "base64");

    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: "uploaded-file", // you can change this to event.queryStringParameters.name if you want dynamic names
      Body: fileContent,
    };

    await s3.putObject(params).promise();

    return {
      statusCode: 200,
      body: "File uploaded successfully",
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: "Upload failed: " + err.message,
    };
  }
};
