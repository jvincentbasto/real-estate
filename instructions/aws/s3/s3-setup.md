# Setup S3 Bucket

## Setup S3 Bucket for Images

```json
  // Sample Bucket Policy

  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "Statement1",
        "Effect": "Allow",
        "Principal": "*",
        "Action": "s3:GetObject",
        "Resource": "<Your_Bucket_ARN>/*"
      }
    ]
  }

```

```bash
  # Set Name
    # format
      <project>-s3b-<type>
    # select
      <project>-s3b-images

  # Set Owenership
    # ACLs Disabled (recommended)
  
  # on Section: Block Public Access settings for this bucket
    # Uncheck "Block all public access"
    # Check "Acknowledged"
  
  # --> Create Bucket

  # Navigate to your s3 instance (s3-instance-images)
    # on Sections: Permissions
    # On Section: Bucket Policy, Select "Edit"
      # Paste you bucket policy
  # --> Save Changes

  # on Section: Objects
    # upload your files (images)
  # --> upload

  # envs
    # navigate to your s3 instance images
    # on Top (title)
      # s3 name = <project>-s3b-images
    # on Section: Properties
      # region = ap-southeast-2
```
