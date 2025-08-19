# Git Config Global Edit

## Editors

```bash
  # default vi
    # Edit
    i
    # Save and exit 
    :wq

  # nano 
    # Save
    ctrl+o 
    Enter
    # Exit
    ctrl+x
```

## Set Editor

```bash
  # nano
  git config --global core.editor "nano"

  # view
  git config --global --edit
```

## Nano Commands

```bash
  # delete line
  ctrl+k
```

## Add Config

```bash
[alias]
  # configs
  cl = config --local
  cle = config --local --edit
  cll = config --local --list
  cg = config --global
  cge = config --global --edit
  cgl = config --global --list

# status
  st = status -s
  sta = status
# stagings
  a = add
  aa = add .
  rs = restore --staged
  rsa = restore --staged .
# commits
  c = commit -m
  ca = commit --amend --no-edit
  cae = commit --amend
# resets (default) [soft(staged),mixed(unstaged)]
  res = reset 
  ress = reset --soft
  resm = reset --mixed 
  resh = reset --hard
# reset previous (default: HEAD~ == HEAD~1)
  ress-p = reset --soft HEAD~
  resm-p = reset --mixed HEAD~
  resh-p = reset --hard HEAD~
# clean
  cdf = clean -df
  cdfn = clean -dfn

# combinations (add,status)
  ast = !git aa && git st
  rsst = !git rsa && git st
# combinations (add,status,commit)
  aca = !git aa && git ca
  acae = !git aa && git cae
  astc = !git aa && git st && git c
# combinations (reset,clean,)
  resa = !git resh && git cdf

# push
  p = push
  pf = push --force
  psu = push --set-upstream origin HEAD
# pull
  pl = pull
  plr = pull --rebase
  plf = !git fetch origin && git reset --hard @{u} && git clean -fd
# merge
  # git merge [feature]
  # from feature | git merge [feature] [default]
  mer = merge
  mera = merge --abort
  merc = merge --continue
# rebase
  reb = rebase
  reba = rebase --abort
  rebc = rebase --continue

# checkout
  co = checkout
  cob = checkout -b
  cod = checkout .
# branch
  br = branch
  bra = branch -a
# fetch
  f = fetch
  fa = fetch --all
# remote
  rem = remote
  remv = remote -v
  rema = remote add
  remsu = remote set-url

# log
  lo = log --oneline
  lop = log --oneline --pretty='format:%h %ad | %s%d [%an]' --date=short
# cherry pick
  cp = cherry-pick

# stash
  s = stash
  sa = stash apply
  sp = stash pop
  ss = stash save
  sl = stash list
  sd = stash drop

# Bash - delete all branches and tags (execpt master)
  # rlocbranch = "git branch | grep -v 'master' | xargs git branch -D",
  # rrembranch = "git branch -r | grep -v 'master' | sed 's/origin\\///' | xargs -I {} git push origin --delete {}",
  # rloctag = "git tag | xargs git tag -d",
  # rremtag = "git tag | xargs -I {} git push origin :refs/tags/{}",

# Git Alias - delete all branches and tags (execpt master)
  rlocbranch = "!git branch | grep -vE '^(\\*|\\s*master$)' | xargs -r git branch -D"
  rrembranch = "!git branch -r | grep -vE 'origin\\/master$' | sed 's/origin\\///' | xargs -r -I {} git push origin --delete {}"
  rloctag = "!git tag | xargs -r git tag -d"
  rremtag = "!git tag | xargs -r -I {} git push origin :refs/tags/{}"
```
