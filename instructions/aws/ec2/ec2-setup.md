# Setup EC2 Instance

## Tips

```bash
  # Double Check Everything before launching intance
    # Some settings cannot be changed and only shown as metadata

  # Inbound
    # allowed incoming (allowed action from)
  # Outbound
    # allowed out going (allowed action to)
  # Sample
    # Connect EC2 backend to RDS
    # EC2 to RDS -> outbound (allow certain action for RDS)
    # RDS from EC2 -> inbound (allow certain action from EC2)
    # Both needs to be set
```

## Create EC2 Instance

- **Navgitate to Instances**
  - **Launch Instance**

- **Section: Name and Tags**

```bash
  # Set EC2 Instance Name
  <project>-ec2
```

- **Section: Application and OS Images**

```bash
  # Set "Application and OS Images"
    # Default -> Amazon Linux
    # Select Default or your choice

  # Set "Amazon Machine Image (AMI)"
    # Select Default or your choice
```

- **Section: Instance type**

```bash
  # Set "Amazon Machine Image (AMI)"
    # Select Default or your choice
  
  # Set "Instance type"
    # Default -> t3.micro (currently 2025)
    # Select Default or your choice
```

- **Section: Key Pair (Login)**

```bash
  # NOTE: 
  # There is no option to modify Key Pair

  # Generate Key Pair (usually, .pem file)
    # "Create New Key Pair" 
    # Save file 
    # Select key pair

  # If Failed/Unable to Save Key Pair
    # Navigate to "Network & Security" (Sidebar)
    # "Key Pairs" Section
    # Create Key Pair
    # Research on how to add the Key Pair on EC2 session
```

- **Section: Network Settings**

```bash
  # Firewall (security groups)
    # Default: Create security group
    # Select default or your choice (Select existing security group)

  # Enable traffic settings:
    # "Allow SSH traffic from"
      # Default -> Anywhere (0.0.0.0/0)
    # "Allow HTTPS traffic from the internet"
    # "Allow HTTP traffic from the internet"
  # NOTE: Allow all these BUT configure this later

  # Edit Network Settings
    # Select your VPC
      <project>-vpc
    # Select Subnet (your public subnet)
      <project>-public-subnet-1
    # Enable "Auto-assign public IP"
      # Auto Assigns our public IP
      # NOTE: this has usage cost
    # Set Security Group Name
      <project>-security-group
    # Modfy Security Group Description
      # copy <Security Group Name> before "created <date | timestamp>"
      <project>-security-group created <date | timestamp>

  # --> Launch Instance
```

## Connect EC2 Instance

```bash
   # Navigate to "Connect"

   # On Section "EC2 Instance Connect"
    # "Connect" (connect directly from aws)

  # On Section "SSH Client"
    # Follow Instructions or
    # Open Terminal
      # Navigate to your .pem file
      # copy and paste ssh command
      ssh -i "<filename>.pem" <ec2-user>@<ec2_ip>

  # Exit
  exit
  
  # Force exit | Kill process
    # Login via aws ec2 connect
    # view process
      last
    # kill process
      sudo pkill -u <user>
```

## Check Inbound Port

- **Check and match your Instance Port to your (.env) file**

```bash
  # Navigate to your instance
  # On Section: Security
    # Under "Inbound Rules"
    # Look for "Port Ranges"
      # Default: 22, 443, 80

  # Update your port in your .env file
```

## Access your public IP

- **To verify your Public IP**

```bash
  # Make sure your app is running (pm2 start)

  # Navigate to your instance
  # Look for "Public IPv4 address"
    # copy and paste on address bar or "open address"

  # Usually, "open address" opens in "https"
    # But since its not configured for "https", replace it with "http"
    # Default: https://<your_public_ip>
    http://<your_public_ip>
```
