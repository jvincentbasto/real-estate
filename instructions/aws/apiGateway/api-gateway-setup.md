# Setup API Gateway

## Create API Gateway for EC2 Public IP

```bash
  # navigate to Aws Api Gateway

  # Choose an API type
    # Options
      Http API
      WebSocket API
      REST API 
      REST API Private
    # Select
      REST API
    # --> build
  
  # Create Rest API
    # API Details
      New API
    # API name
      <project>-api-gateway
  # --> Create API
  
```

## Setup Authorizers for Aws Cognito

```bash
  # Authorizers applies "cognito" to all your "proxy resource"
    # Which means all your app's public routes are also required to be authenticated by cognito
    # To avoid this, you have to add your public endpoints manually to your resources
      # sample
      /properties

  # Navigate to Authorizers
  
  # Create Authorizers
    # Set Authorizer name
      <project>-api-gateway-cognito-authorizer
    # Set Authorizer type
      cognito
    # Select your "Cognito user pool"
    # Set "Token Source"
      Authorization
  # --> Create Authorizer

  # Navigate to your Proxy Resource
    # Select on "ANY"
    # on Section: Method request settings, then select "Edit"
      # Set Authorization (your-api-gateway-authorizer)
        <project>-api-gateway-cognito-authorizer
  # --> save
```

## Tips on Resource

```bash
  # NOTE: (By Default) Resources are declared per single endpoint
    # Which means that you have to manually add all app endpoint to your resource
    # But this can be solved through proxy resource (proxies) 
  # Method Type === Http method

```

## Setup Proxy Resource (Endpoints) for (https)

```bash
  # Create Proxy Resource
    # Create Resource
    # on Section: Resource details
      # Check "Proxy resource"
      # Set "Resource Path" 
        # By Default: -> / (forward slash) 
      # Set Resource Name
        {proxy+}
      # Check CORS
  # --> Create Resource

  # Proxy Resource Name should be:
    /{proxy+}
  
  # under the created Proxy Resource, Select "Any"
    # Set "Edit integration"
    # on Section: Method details
      # under label: Integration type
        # Select
          http
      # Check "HTTP proxy integration"
      # Set "Http method"
        ANY
      # Set "Endpoint Url"
        http://<your_ec2_public_ip>/{proxy}
  # --> save
```

## Setup Resource for Public Routes

```bash
  # Manually Set your App's Public Endpoints
    # Create Resource
      # Set "Resource Path"
        (default) -> / 
      # Set "Resource Name"
        properties
      # Check CORS
  # --> Create Reource

  # Sample Resource
    /properties

  # Navigate to your Public Route Resource
    # Create Method
    # on Section: Method details
      # Select your "Method type"
        GET
      # under label: Integration type
        http
      # Check "HTTP proxy integration"
      # Set "Http method"
        GET
      # Set "Endpoint Url"
        # format
        http://<your_ec2_public_ip>/<your_public_endpoint>
        # sample
        http://<your_ec2_public_ip>/properties
  # --> Create Method
```

## Deploy API

```bash
  # Navigate to your Resources page
    # Deploy API
    # Set Stage
      New Stage
    # Set "Stage Name"
      prod
  # --> Deploy

  # on Section: API -> Stages (sidebar)
    # Select your Stage (deployed API)
      prod
    # on Section: Stage Details
      # Copy "Invoke Url" to your Amplify .env
        https://<your_api_gateweay_invoke_url>
```
