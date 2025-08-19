# VPC (Virtual Private Cloud) Setup

## 1. Set Region

- **Always set your region in any aws service**
  - **Select a Region Near You**

## 2. Create your VPC

- **Set VPC Resource: VPC only**
  - **VPC only**
- **Set VPC Name**

```bash
  # custom vpc name
  <project>-vpc 
```

- **Set IPv4 CIDR block**
  - **manual input**

- **Sample IPv4 CIDR Ranges**

```bash
  # format
  # n ranges -> 0 -255
  # b ranges -> 16 - 28
  <n>.<n>.<n>.<n>/<b>

  # if b = 24 | first 3 are locked  
    # <locked>.<locked>.<locked>.<n>/<b>
    10.0.0.0/24
    10.0.0.128/24
    10.0.0.255/24

  # if b = 16 | first 2 are locked  
    # <locked>.<locked>.<n>.<n>/<b>
    10.0.0.0/24
    10.0.32.64/24
    10.0.255.128/24

  # if b = 8 | first item is locked  
    # <locked>.<n>.<n>.<n>/<b>
    10.32.64.128/24
```

```bash
  # Set IPv4 CIDR
  10.0.0.0/16
```

- **Set IPv6 CIDR block**
  - **No IPv6 CIDR block**

- **Create VPC**

## Next Steps

- **Setup Subnets**
- **Setup Route Tabels**
