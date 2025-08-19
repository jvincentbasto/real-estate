# Setup Subnets

## Custom Subnet names

```bash
  # custom subnet name
  <project>-public-subnet-<n>
  <project>-private-subnet-<n>
```

### Sample Availability Zone

- **Select an Availability Zone Near You**

```bash
  # <region> <zone> -> (us-east)-(1a)

  # For United States (N. Virginia)
  # us-east-1a
  # us-east-1b
  # us-east-1c

  # For Asia Pacific (Sydney)
  # ap-southeast-2a
  # ap-southeast-2b
  # ap-southeast-2c
```

### Sample Subnet CIDR Block

- **Select an Availability Zone Near You**

```bash
  # Always check for the amount of IPs
    # Usually, pick 256 IPs 

  # highest Ips (16) -> 65,536 IPs
  10.0.0.0/24

  # (24) -> 256 IPs
  10.0.0.0/24

  # lowest Ips (28) -> 16 IPs
  10.0.0.0/28

  # (18) -> 16,384 IPs
  # (19) -> 8,192 IPs
  # (20) -> 4,096 IPs
  # (21) -> 2,048 IPs
  # (22) -> 1,024 IPs
  # (23) -> 512 IPs
  
  # (25) -> 128 IPs
  # (26) -> 64 IPs
  # (26) -> 64 IPs
  # (27) -> 32 IPs
```

## Create Subnets

- **Create PUBLIC Subnets**

- **1st Public subnet**

```bash
  # Set Subnet Name
  <project>-public-subnet-1

  # Set Availability Zone
  us-east-1a

  # Set IPv4 subnet CIDR block
  # 10.0.<n>.0/24
  10.0.0.0/24

  # --> Add a New Subnet
```

- **Create PRIVATE Subnets**
  - **Usually, 2 Private subnets are needed for the backend DB (Ex: Aws RDS)**
  - **Private subnets Purpose:**
    - **1st Private Subnet:**
      - **Main Zone for DB**
      - **Connect Private Subnet to Public Subnet**
    - **2nd Private Subnet:**
      - **Backup Zone for DB**

- **1st Private subnet**

```bash
  # Set Subnet Name
  <project>-private-subnet-1

  # Set Availability Zone
    # match zones for 1st public subnet and 1st private subnet
  us-east-1a

  # Set IPv4 subnet CIDR block
  # 10.0.<n>.0/24
  10.0.1.0/24

  # --> Add a New Subnet
```

- **2nd Private subnet**

```bash
  # Set Subnet Name
  <project>-private-subnet-2

  # Set Availability Zone
  us-east-1b
  
  # Set IPv4 subnet CIDR block
  # 10.0.<n>.0/24
  10.0.2.0/24

  # --> Add a New Subnet
```
