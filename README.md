 ____      _  ____           ____  _______     __
|  _ \    | |/ ___|         |  _ \| ____\ \   / /
| | | |_  | | |      _____  | | | |  _|  \ \ / / 
| |_| | |_| | |___  |_____| | |_| | |___  \ V /  
|____/ \___/ \____|         |____/|_____|  \_/  


# Joomla Articles to AWS S3 HTML Files Script

This README provides a comprehensive guide on setting up and running a script designed to fetch articles from Joomla endpoints, convert them into HTML files, and upload them to an AWS S3 bucket. This automation is aimed at simplifying content migration and backup processes.

## Overview

The script utilizes Axios for making HTTP requests to Joomla endpoints, retrieves articles, converts them into HTML format, and uploads these files to an AWS S3 bucket. This process necessitates having AWS credentials with S3 full access and a Joomla API token for authentication.

## Prerequisites

- **Node.js and npm:** Make sure Node.js and npm are installed on your system. You can download them from [nodejs.org](https://nodejs.org/).
- **AWS Account:** You need to have an AWS account. If you don't have one, you can create it at [aws.amazon.com](https://aws.amazon.com/).
- **Joomla API Access:** You must have access to Joomla's API and possess a valid API token.

## AWS Configuration

### Creating an IAM User

1. Log into your AWS Management Console.
2. Navigate to the IAM (Identity and Access Management) service.
3. Create a new IAM user with programmatic access, which will provide an `accessKeyId` and `secretAccessKey`.
4. Attach the `AmazonS3FullAccess` policy to this user to grant the necessary permissions for S3 interactions.

### Setting Up S3 Bucket

1. Visit the S3 service page in the AWS Management Console.
2. Create a new S3 bucket, ensuring you note down the bucket's name and region.
3. For security, make sure the bucket has public access disabled unless you specifically require it.

## Script Configuration

### Installing Dependencies

Execute the following command in your project directory to install the required Node.js packages:

```bash
npm install axios @aws-sdk/client-s3

## Environment Variables

Configure the following environment variables in your system or within a .env file:

```plaintext
AWS_SECRET_ID=your_access_key_id
AWS_SECRET_KEY=your_secret_access_key

## Script Setup

In the S3Client configuration within the script, replace "Your-AWS-Region" with your actual S3 bucket region.
Replace "Your-S3-Bucket" with the name of your S3 bucket.
If desired, specify a folder within your bucket by adjusting {Folder-In-S3-Bucket} in the Key parameter.
Populate the endpointURL with your Joomla endpoint URLs.
Replace "Your-Joomla-Token" with your actual Joomla API token.

