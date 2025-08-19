# EC2 Create User Script

## Script file: create_user.sh

- **Option 1**

```bash
  #!/bin/bash
  
  # Usage: sudo bash create_user.sh <username>
  # Example: sudo bash create_user.sh alice

  # params
  USERNAME=$1

  # validations
  if [ -z "$USERNAME" ]; then
      echo "Usage: sudo bash create_user.sh <username>"
      exit 1
  fi

  # Create user and home directory 
  if ! id "$USERNAME" &>/dev/null; then
      sudo useradd -m -s /bin/bash "$USERNAME"
  fi

  # Create .ssh directory
  sudo mkdir -p /home/$USERNAME/.ssh

  # Generate RSA private key in PEM format (cross-platform compatible)
  sudo ssh-keygen -t rsa -b 4096 -m PEM -f /home/$USERNAME/.ssh/id_rsa -N "" -C "$USERNAME@$(hostname)"

  # Copy public key to authorized_keys
  sudo cp /home/$USERNAME/.ssh/id_rsa.pub /home/$USERNAME/.ssh/authorized_keys

  # Set correct permissions
  sudo chown -R $USERNAME:$(id -gn $USERNAME) /home/$USERNAME/.ssh
  sudo chmod 700 /home/$USERNAME/.ssh
  sudo chmod 600 /home/$USERNAME/.ssh/authorized_keys

  # Add user to dev group
  sudo usermod -aG dev $USERNAME

  # Log private key for manual copy
  echo "✅ User $USERNAME created and added to dev."
  echo "🔑 Private key for $USERNAME (PEM format):"
  echo
  cat /home/$USERNAME/.ssh/id_rsa
  echo
  echo "💡 Save this private key locally as <any_filename>.pem"
  echo "ssh -i ~/Desktop/<any_filename>.pem $USERNAME@<EC2_PUBLIC_IP>"
```

- **Option 2**

```bash
  #!/bin/bash
  
  # Usage: sudo bash create_user.sh <username> [<local_user> <local_ip> <local_os>]
  # Example without SCP: sudo bash create_user.sh alice
  # Example with SCP:    sudo bash create_user.sh alice Alice 192.168.1.100 linux
  # Supported local_os: linux, mac, windows

  # params
  USERNAME=$1
  LOCAL_USER=$2
  LOCAL_IP=$3
  LOCAL_OS=$4

  # validations
  if [ -z "$USERNAME" ]; then
      echo "Usage: sudo bash create_user.sh <username> [<local_user> <local_ip> <local_os>]"
      exit 1
  fi

  # Create user and home directory 
  if ! id "$USERNAME" &>/dev/null; then
      sudo useradd -m -s /bin/bash "$USERNAME"
  fi

  # Create .ssh directory
  sudo mkdir -p /home/$USERNAME/.ssh

  # Generate RSA private key in PEM format (cross-platform compatible)
  sudo ssh-keygen -t rsa -b 4096 -m PEM -f /home/$USERNAME/.ssh/id_rsa -N "" -C "$USERNAME@$(hostname)"

  # Copy public key to authorized_keys
  sudo cp /home/$USERNAME/.ssh/id_rsa.pub /home/$USERNAME/.ssh/authorized_keys

  # Set correct permissions
  sudo chown -R $USERNAME:$(id -gn $USERNAME) /home/$USERNAME/.ssh
  sudo chmod 700 /home/$USERNAME/.ssh
  sudo chmod 600 /home/$USERNAME/.ssh/authorized_keys

  # Add user to dev group 
  sudo usermod -aG dev $USERNAME

  # Log private key for manual copy
  echo "✅ User $USERNAME created and added to dev."
  echo "🔑 Private key for $USERNAME (PEM format):"
  echo
  cat /home/$USERNAME/.ssh/id_rsa
  echo

  # Optional: Attempt SCP only
  if [ -n "$LOCAL_USER" ] && [ -n "$LOCAL_IP" ] && [ -n "$LOCAL_OS" ]; then
      # Determine Desktop path based on OS
      case $LOCAL_OS in
          linux|mac)
              LOCAL_DESKTOP="~/Desktop/$USERNAME-key"
              ;;
          windows)
              LOCAL_DESKTOP="/c/Users/$LOCAL_USER/Desktop/$USERNAME-key"
              ;;
          *)
              echo "⚠️ Unsupported local OS: $LOCAL_OS. Skipping SCP."
              LOCAL_DESKTOP=""
              ;;
      esac

      if [ -n "$LOCAL_DESKTOP" ]; then
          # Test if local machine is reachable
          ping -c 1 -W 2 $LOCAL_IP &> /dev/null
          if [ $? -eq 0 ]; then
              echo "📦 Local machine reachable. Copying private key to $LOCAL_DESKTOP..."
              scp /home/$USERNAME/.ssh/id_rsa ${LOCAL_USER}@${LOCAL_IP}:$LOCAL_DESKTOP
              if [ $? -eq 0 ]; then
                  echo "✅ Private key copied to local Desktop as $LOCAL_DESKTOP"
              else
                  echo "⚠️ SCP failed. Save the key manually."
              fi
          else
              echo "⚠️ Local machine $LOCAL_IP is unreachable. Copy the key manually."
          fi
      fi
  fi

  echo "💡 Save the private key locally as <any_filename>.pem and connect with:"
  echo "ssh -i ~/Desktop/<any_filename>.pem $USERNAME@<EC2_PUBLIC_IP>"
```

## Create file

```bash
  # touch
  touch create_user.sh

  # or directly create and open
  nano create_user.sh
```

## Make script executable

```bash
  # executable script
  chmod +x create_user.sh

  # usage
  sudo bash create_user.sh <user>
```

## Get User, Ip, and OS

```bash
  # Local Username 
    # Linux / macOS
    whoami
    # Windows 
    echo $env:USERNAME

  # Local IP
    # Linux / macOS
    hostname -I | awk '{print $1}'
    # Windows 
    ipconfig | findstr /R "IPv4"

  # Local OS
    # Linux / macOS
    uname | tr '[:upper:]' '[:lower:]'
    # Windows
    $env:OS
```
