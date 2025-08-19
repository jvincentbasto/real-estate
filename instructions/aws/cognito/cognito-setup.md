# Setup Cognito

## Create Cognito

```bash
  # Navigate to Cognito
  
  # on Section: User pools (sidebar)
  # select: Create User Pool
    # on Section: Define your Application
      # Set "Application Type"
        Single-page application (SPA)
      # Set "Name your application"
        <project>-cognito-appclient
    # on Section: Configure Options
      # Set: Options for sign-in identifiers
        # options
          email
          phone number
          username
        # select
          email
          username
      # Select: attributes
        email
  # --> create

  # Navigate to your created userpool
    # Rename
      <project>-cognito-userpool
```

```bash  
  # Navigate to Authentication -> Sign-up (sidebar)
    # on Section: Custom Attributes
      # Add custom attribute
        # Set Name
          role
  # --> Save
  # should show "custom:role"

  # envs
    # on Section: Overview (sidebar)
      # copy: user pool ID
    # on Section: Applications -> App clients (sidebar)
      # copy: client ID
```
