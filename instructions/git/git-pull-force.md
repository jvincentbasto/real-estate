# Forced git pull

## Force repo to match remote repo

### Scenarios

- **When branch diverge, maybe due to git push force**

```bash
  git fetch origin
  git reset --hard origin/main   
  # removes untracked files 
  git clean -fd                  

  # create git alias
  echo "alias pull-force='!git fetch origin && git reset --hard @{u} && git clean -fd'" >> ~/.bashrc
  source ~/.bashrc

  # usage git alias
  git pull-force
```
