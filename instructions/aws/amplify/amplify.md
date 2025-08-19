# Setup Amplify

## Get EC2 Public IP

```bash
  # Amplify deploys app on (https)
    # So make sure your Backend Public IP (EC2 Public IP) is on (https)
    # Amplify (https) === EC2 Public IP (IPv4) (https)

  # navigate to your ec2 instance
  # on Section: Instance summary
    # look for label: "Public IPv4 address" (public ip)
    # By Default (http)
      http://<your_public_ip>

    # Workaround (hack) via Aws ApiGateway
      # This is only a temporary solution, Setup your https later
      # Copy your API Gateway's "Invoke Url"
        https://<your_api_gateweay_invoke_url>
```

## Deploy your app

```bash
  # Deploy an app via
    github
    gitlab
    bitbucket
    etc.
  
  # Select your repo
    # Select your branch
      master
    # Select directory (if monorepo)
      client
  
  # Add your envs
  NEXT_PUBLIC_API_BASE_URL = your_ec2_instance_public_ip

```
