# Setup RDS (AWS Relational Databases)

## Tips

```bash
  # UNCHECK any options for 
    # "auto scalling"
    # "extended support" 
    # "monitoring"
    # "backups"
    # "encryptions"

  # Create your databse manually
  # Choose/Select [free,standard,general, minimum] tier as much as possible
  # Dont connect any aws services on setup
```

## Create Database

```bash
  # create database
  
  # Select your "creation method"
    # options
      easy create
      standard create
    # select
      standard create

  # Select your "engine option"
    # options
      MySql
      Postgresql
      Oracle
      etc...
    # select
      Postgresql

  # Select your "templates"
    # options
      Production
      Dev/Test
      Free Tier
    # Select
      Free Tier
```

```bash
  # on Section: Settings
    # set "DB instance identifier" (db name instance)
      <project>-rds
    # set "Master Username" (login ID for db instance)
      # leave it default 
      # for postgres (default)
        postgres
    # set "Credentials management"
      # select
        Self managed
    # Set "Master Password" (Password for db instance)
      # IMPORTANT: this is your password credentials
  
  # on Section: Storage (uncheck)
    # Under label: Additional storage configuration
      # Uncheck "Enable storage autoscalling"
```

```bash
  # on Section: Connectivity
    # Set "Compute Resource"
      # Select 
        Dont connect to an EC2 compute resource
    # Select your "Virtual private cloud (VPC)"
      <project>-vpc
    # Set "Public access"
      # Do not assign a public ip address
      # Select
        No
    # Set your "VPC security group (firewall)"
      # Create a new security group for rds
      # Select
        Create new
    # Set name
      <porject>-rds-sg
    # Set "Availability Zone"
     # any zone available in your selected region
```

```bash
  # on Section: Monitoring (uncheck)
    # Uncheck "Enable Monitoring Insights"

  # on Section: Additional configuration
    # under label: "Database options"
      # If you do not specify a database name, Amazon RDS does not create a database.
      # Set Initial Database
        any name 
    # Set Backup (uncheck)
      # Uncheck "Enable automated backups"
    # Set Encryption (uncheck)
      # Uncheck "Enable encryption"
    
  # --> create database
```

## Setup "Security Group Rules"

```bash
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

```bash
  
  # Set Inbound Rules (RDS)
    # navigate to your rds instance
    # on Section: "Connectivity & Security"
      # Under "VPC security group"
        # navigate to your security group
      
      # on Section: Inbound rules
        # navigate to "Edit inbound rules", then "Add rule"
          # Select your "engine options" (postgres)
            PostgreSQL
          # Look and Select your "EC2 instance security group"
            <project>-ec2-sg
      # --> Save Rule

  # Set Outbound Rules (EC2)
    # navigate to you ec2 instance
      # on Section: Security
        # navigate to your security group

    # on Section: Outbound rules
      # navigate to "Edit outboun rules", then "Add rule"
        # Select your "engine options" (postgres)
          PostgreSQL
        # Look and Select your "RDS instance security group"
          <project>-rds-sg
    # --> Save Rule
```

## Setup Database

```bash
  # Get RDS endpoint
    # navigate to your rds instance
    # under label: "Connectivity & Security"
      # look for endpoint (rds_endpoint)
      # look for port (rds_endpoint) -> 5432 (default)

  # Database URL
  DATABASE_URL="postgresql://<master_username>:<master_password>@<rds_endpoint>:<rds_port>/<dbname>?schema=public"

  # Execute your app db configs
    # For Progresql and Prisma
      # reset (optional)
        npm run prisma:reset
      # dev
        npm run setupdb:dev
      # dev
        npm run setupdb:prod
```
