# EC2 Delete User Script

## Script file: delete_user.sh

- **Option 1**

```bash
  #!/bin/bash
  # Usage: sudo bash delete_user.sh <username>

  # params
  USERNAME=$1

  # validations
  if [ -z "$USERNAME" ]; then
      echo "Usage: sudo bash delete_user.sh <username>"
      exit 1
  fi

  # Kill any running processes for the user
  if id "$USERNAME" &>/dev/null; then
      sudo pkill -u "$USERNAME" 2>/dev/null
  fi

  # Remove user from dev group (if exists)
  if getent group dev | grep -q "\b$USERNAME\b"; then
      sudo gpasswd -d "$USERNAME" dev
  fi

  # Delete the user and their home directory
  if id "$USERNAME" &>/dev/null; then
      sudo userdel -r "$USERNAME"
      echo "🗑️ User $USERNAME deleted."
  else
      echo "⚠️ User $USERNAME does not exist."
  fi

  # Delete the user's personal group (if exists)
  if getent group "$USERNAME" &>/dev/null; then
      sudo groupdel "$USERNAME"
      echo "🗑️ Group $USERNAME deleted."
  else
      echo "⚠️ Group $USERNAME does not exist."
  fi

  echo "✅ Cleanup for $USERNAME completed."
```

## Create file

```bash
  # touch
  touch delete_user.sh

  # or directly create and open
  nano delete_user.sh
```

## Make script executable

```bash
  # executable script
  chmod +x delete_user.sh

  # usage
  sudo bash delete_user.sh <user>
```
