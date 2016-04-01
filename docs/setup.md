# First time installation

1. Create S3 bucket(s) for the marketing site (if desired) and the app. In this example, we'll be deploying to www.brainlogger.com and app.brainlogger.com.
  - The code currently assumes `US Standard` (aka `us-east-1`) so it may be easiest to choose that for the region.

2. Edit the buckets' `Permissions` -> `Edit bucket policy`:
```
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "PublicReadGetObject",
			"Effect": "Allow",
			"Principal": "*",
			"Action": [
				"s3:GetObject"
			],
			"Resource": [
				"arn:aws:s3:::app.brainlogger.com/*"
			]
		}
	]
}
```

(This policy was copied from http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteAccessPermissionsReqd.html )

3. Enable `Static Website Hosting` with `index.html` as your `Index` and `Error` documents.

4. Create an IAM User to do deploys. Then, add permissions:
  - Permissions -> Attach Policy
    - Attach these two policies:
	    `AmazonS3FullAccess`
	    `AWSLambdaFullAccess`

4. Set up your `~/.aws/credentials` and then run:
```
nvm use
npm install
npm run build
node scripts/deploy/app.js
```

5. Create the Lambda function. The code currently assumes the name of `test-write-to-dynamo`.
  Enter anything as a placeholder for the code.
  Use recommended `lambda_basic_execution` Role.

6. Use DynamoDB console to manually add a user. (There's no programmatic way to do this yet.)

7. Create an API endpoint for the Lambda function and put the API endpoint URL in  `browser/api.js`.

  Amazon API Gateway allows us to hit an HTTP URL and invoke a Lambda function to fulfill the request.

8. Go to Amazon API Gateway and find the API you created and `Enable CORS`. For security, you may want to set the `Access-Control-Allow-Origin`, e.g. `'http://app.brainlogger.com.s3-website-us-east-1.amazonaws.com'`

9. Click `Deploy API` to deploy the API again with CORS enabled.

10. Use `npm run deploy` to deploy the app.

11. Create 4 DynamoDB tables. The code currently assumes the following names:
```
	rcrd-users
	rcrd-records
	rcrd-view-data
	rcrd-access-tokens
```

In all cases:
	Give the `Primary key` the name `id` and leave its type as `String`.
	Optional, if you are cheap: Uncheck `Use default settings` and reduce the `Provisioned capacity` to `1` and `1`.

13. Generate a password hash for your user:
```
% node
> require('crypto').createHash('sha256').update('YOUR PASSWORD HERE').digest('base64')
```

12. In `rcrd-users`, have 3 attributes:
`id`: You can use your email address.
`hash`: The password hash you generated above.
`time_zone`: e.g. `America/Los_Angeles`.
```

13. IAM > Roles > lambda_basic_execution -> Attach Policy -> `AmazonDynamoDBFullAccess`.

14. Write an iOS app for rcrd using React Native.

Congrats! You're done.

Create an Issue if you find problems! :D
