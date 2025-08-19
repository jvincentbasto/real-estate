# Setup Route Tables

## Usually, 1 Route Tables per Subnet

## Custom route table names

```bash
  # custom subnet name
  <project>-public-route-table-<n>
  <project>-private-route-table-<n>
```

## Jargons

```bash
  # NACL (Network Access Control List)
    # -> blacklist of IPs (Subnet Level)

  # Security Groups
    # Similar to NACL but associated individual aws services
    # -> blacklist of individual aws serviecs (Aws Service Level)

  # Public Table Routes
    # -> whitelist of IPs (domains, public access, or private access)
```

## Create Table Routes

- **Create PUBLIC Route Tables**

- **1st Public Route Table**

```bash
  # Set Table Route Name
  <project>-public-route-table-1

  # Select your VPC
  <project>-vpc
  # --> Create route table

  # Navigate back to your recently created route table
  # Edit subnet associations
    # Select your subnet
    <project>-public-subnet-1
  # --> Save associations

  # Navigate back to your recently created route table
  # On routes section -> Edit Routes
    # Add Routes
    0.0.0.0/0
    # Select your Internet Gateway (For public access)
    <project>-internet-gateway
  # --> Save Changes
```

- **Create PRIVATE Route Tables**
  - **Usually, 2 Private subnets are needed for the backend DB (Ex: Aws RDS)**
  - **Private subnets Purpose:**
    - **1st Private Subnet: For the backend Databse (Aws RDS)**
    - **2nd Private Subnet: For connecting DB to Public subnet**

- **1st Private Route Table**

```bash
  # Set Table Route Name
  <project>-private-route-table-1

  # Select your VPC
  <project>-vpc
  # --> Create route table

  # Navigate back to your recently created route table
  # Edit subnet associations
    # Select your subnet
    <project>-private-subnet-1
  # --> Save associations
```

- **2nd Private Route Table**

```bash
  # Set Table Route Name
  <project>-private-route-table-2

  # Select your VPC
  <project>-vpc
  # --> Create route table

  # Navigate back to your recently created route table
  # Edit subnet associations
    # Select your subnet
    <project>-private-subnet-2
  # --> Save associations
```
