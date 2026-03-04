const gitData = {
  id: 'git',
  name: 'Git & GitHub',
  description:
    'Version control workflows, branching strategies, and GitHub collaboration patterns',
  sections: [
    // ─── Section 1: Setup & Configuration ─────────────────────────────
    {
      id: 'setup-configuration',
      title: 'Setup & Configuration',
      blocks: [
        {
          type: 'text',
          content:
            'Before writing any code, configure Git with your identity and preferred settings. These settings apply globally (all repos) or locally (per repo).',
        },
        {
          type: 'heading',
          content: 'Identity & Defaults',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Global config',
          code: `# Set your identity (used in every commit)
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Set default branch name to main (instead of master)
git config --global init.defaultBranch main

# Set default editor (for commit messages, rebase, etc.)
git config --global core.editor "code --wait"   # VS Code
# git config --global core.editor "vim"          # Vim
# git config --global core.editor "nano"         # Nano

# Enable colored output
git config --global color.ui auto

# Set pull behavior to rebase (avoids merge commits on pull)
git config --global pull.rebase true

# Auto-setup remote tracking on push
git config --global push.autoSetupRemote true

# View all global settings
git config --global --list`,
        },
        {
          type: 'heading',
          content: 'SSH Key Setup (GitHub)',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Generate and add SSH key',
          code: `# Generate a new SSH key (Ed25519 — recommended)
ssh-keygen -t ed25519 -C "you@example.com"
# Press Enter for default location (~/.ssh/id_ed25519)
# Optionally set a passphrase

# Start the SSH agent
eval "$(ssh-agent -s)"

# Add your key to the agent
ssh-add ~/.ssh/id_ed25519

# Copy the public key to clipboard (Linux)
cat ~/.ssh/id_ed25519.pub | xclip -selection clipboard
# macOS: pbcopy < ~/.ssh/id_ed25519.pub
# Windows: clip < ~/.ssh/id_ed25519.pub

# Then: GitHub → Settings → SSH and GPG keys → New SSH key → Paste

# Test the connection
ssh -T git@github.com
# "Hi username! You've successfully authenticated..."`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Use SSH over HTTPS — you won\'t need to enter your username/password on every push. If you already cloned with HTTPS, switch with: git remote set-url origin git@github.com:user/repo.git',
        },
        {
          type: 'heading',
          content: 'Useful Git Aliases',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: '~/.gitconfig aliases',
          code: `# Add these aliases for faster workflow
git config --global alias.s "status -sb"
git config --global alias.co "checkout"
git config --global alias.br "branch"
git config --global alias.ci "commit"
git config --global alias.unstage "reset HEAD --"
git config --global alias.last "log -1 HEAD"
git config --global alias.lg "log --oneline --graph --all --decorate"
git config --global alias.amend "commit --amend --no-edit"
git config --global alias.undo "reset --soft HEAD~1"
git config --global alias.wip "commit -am 'WIP: work in progress'"

# Now you can use:
# git s         → short status
# git lg        → pretty log graph
# git undo      → undo last commit (keep changes staged)
# git amend     → add staged changes to last commit`,
        },
        {
          type: 'heading',
          content: 'Per-Project Config',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Local overrides',
          code: `# Override email for a work project (run inside the repo)
git config user.email "you@company.com"

# Check which config applies
git config user.email           # Shows effective value
git config --show-origin user.email  # Shows which file it comes from

# Line endings (important for cross-platform teams)
git config --global core.autocrlf input   # macOS/Linux
git config --global core.autocrlf true    # Windows`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Global config lives in ~/.gitconfig. Local config lives in .git/config inside each repo. Local settings always override global ones.',
        },
      ],
    },

    // ─── Section 2: Essential Commands ────────────────────────────────
    {
      id: 'essential-commands',
      title: 'Essential Commands',
      blocks: [
        {
          type: 'text',
          content:
            'These are the commands you\'ll use every day. Master these before moving to advanced topics.',
        },
        {
          type: 'heading',
          content: 'Starting a Repository',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Init and clone',
          code: `# Initialize a new repo
git init
git init my-project          # Create dir + init

# Clone an existing repo
git clone git@github.com:user/repo.git
git clone git@github.com:user/repo.git my-folder  # Clone into specific dir
git clone --depth 1 git@github.com:user/repo.git  # Shallow clone (latest commit only)`,
        },
        {
          type: 'heading',
          content: 'Staging & Committing',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Daily workflow',
          code: `# Check what's changed
git status              # Full status
git status -sb          # Short format (branch + changes)

# Stage changes
git add index.js        # Stage a specific file
git add src/            # Stage entire directory
git add -A              # Stage everything (new, modified, deleted)
git add -p              # Interactive: stage hunks (parts of files)

# Commit
git commit -m "feat: add user authentication"
git commit -am "fix: resolve login redirect"   # Stage tracked + commit
git commit --amend -m "fix: updated message"   # Rewrite last commit message
git commit --amend --no-edit                   # Add staged files to last commit

# View differences
git diff                # Unstaged changes (working dir vs staging)
git diff --staged       # Staged changes (staging vs last commit)
git diff HEAD           # All changes since last commit
git diff main..feature  # Compare two branches`,
        },
        {
          type: 'heading',
          content: 'History & Inspection',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Viewing history',
          code: `# Log
git log                      # Full log
git log --oneline            # One line per commit
git log --oneline --graph    # ASCII graph of branches
git log --oneline -10        # Last 10 commits
git log --author="Name"      # Filter by author
git log --since="2 weeks"    # Filter by date
git log -- src/auth/         # Commits affecting a path
git log -p -- file.js        # Show diffs for a specific file

# Show a specific commit
git show abc1234             # Full diff of a commit
git show HEAD~2              # 2 commits before HEAD

# Who changed what
git blame src/app.js         # Line-by-line author info
git blame -L 10,20 app.js   # Blame specific line range`,
        },
        {
          type: 'heading',
          content: 'Remote Operations',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Push, pull, fetch',
          code: `# Remote management
git remote -v                          # List remotes with URLs
git remote add origin git@github.com:user/repo.git
git remote set-url origin <new-url>    # Change remote URL

# Push
git push                               # Push current branch
git push -u origin main                # Push + set upstream tracking
git push origin feature-branch         # Push a specific branch
git push origin --delete old-branch    # Delete remote branch

# Pull (fetch + merge)
git pull                               # Pull current branch
git pull --rebase                      # Pull + rebase (cleaner history)

# Fetch (download without merging)
git fetch                              # Fetch all remotes
git fetch origin                       # Fetch from origin
git fetch --prune                      # Remove stale remote-tracking branches`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Use git pull --rebase to avoid unnecessary merge commits when pulling. Set it as default with: git config --global pull.rebase true',
        },
      ],
    },

    // ─── Section 3: Branching & Merging ───────────────────────────────
    {
      id: 'branching-merging',
      title: 'Branching & Merging',
      blocks: [
        {
          type: 'text',
          content:
            'Branches are lightweight pointers to commits. Use them for every feature, bugfix, or experiment. Merging integrates changes from one branch into another.',
        },
        {
          type: 'heading',
          content: 'Branch Operations',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Creating and switching branches',
          code: `# List branches
git branch              # Local branches
git branch -r           # Remote branches
git branch -a           # All branches (local + remote)
git branch -v           # Branches with last commit info

# Create and switch
git branch feature-auth           # Create branch
git checkout feature-auth         # Switch to it (old way)
git switch feature-auth           # Switch to it (modern way)
git checkout -b feature-auth      # Create + switch (old way)
git switch -c feature-auth        # Create + switch (modern way)

# Create branch from a specific point
git switch -c hotfix main         # Branch from main
git switch -c fix abc1234         # Branch from a commit

# Rename and delete
git branch -m old-name new-name   # Rename branch
git branch -d merged-branch       # Delete (safe — only if merged)
git branch -D unmerged-branch     # Force delete (even if not merged)

# Clean up remote-tracking branches that no longer exist
git fetch --prune
git branch -vv | grep 'gone'     # Show local branches whose remote is deleted`,
        },
        {
          type: 'heading',
          content: 'Merging',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Merging branches',
          code: `# Merge feature into main
git switch main
git merge feature-auth

# Fast-forward merge (linear history, no merge commit)
# Happens automatically when main hasn't diverged
git merge feature-auth            # Fast-forwards if possible

# Force a merge commit (even if fast-forward is possible)
git merge --no-ff feature-auth

# Merge with a custom message
git merge feature-auth -m "Merge feature-auth into main"

# Abort a merge in progress
git merge --abort`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Fast-forward merge: When main has no new commits since the branch was created, Git just moves the main pointer forward. No merge commit is created. 3-way merge: When both branches have new commits, Git creates a new merge commit that combines both.',
        },
        {
          type: 'heading',
          content: 'Resolving Merge Conflicts',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Conflict resolution workflow',
          code: `# When a merge has conflicts:
git merge feature-auth
# CONFLICT (content): Merge conflict in src/auth.js
# Automatic merge failed; fix conflicts and then commit the result.

# 1. See which files have conflicts
git status

# 2. Open the conflicting file — you'll see markers:
# <<<<<<< HEAD
# (your changes on main)
# =======
# (changes from feature-auth)
# >>>>>>> feature-auth

# 3. Edit the file: keep what you want, remove the markers

# 4. Stage the resolved file
git add src/auth.js

# 5. Complete the merge
git commit    # Git auto-generates a merge commit message

# Use VS Code's built-in merge editor for visual conflict resolution
# Click "Accept Current", "Accept Incoming", "Accept Both", or edit manually`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Never force-push to shared branches (main, develop) after resolving conflicts. This rewrites history and can destroy your teammates\' work.',
        },
      ],
    },

    // ─── Section 4: Branching Strategies ──────────────────────────────
    {
      id: 'branching-strategies',
      title: 'Branching Strategies',
      blocks: [
        {
          type: 'text',
          content:
            'A branching strategy defines how your team uses branches. Choose one based on your team size, release cadence, and project complexity.',
        },
        {
          type: 'heading',
          content: 'GitHub Flow (Recommended for Most Teams)',
        },
        {
          type: 'text',
          content:
            'Simple and effective. One main branch, short-lived feature branches, deploy from main. Best for teams practicing continuous deployment.',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'GitHub Flow workflow',
          code: `# 1. Create a feature branch from main
git switch main
git pull
git switch -c feature/add-user-profile

# 2. Work on the feature (commit often)
git add .
git commit -m "feat: add profile page component"
git commit -m "feat: add profile API integration"

# 3. Push and open a Pull Request
git push -u origin feature/add-user-profile
# Open PR on GitHub → request review → CI runs

# 4. After approval, merge via GitHub (squash or merge commit)

# 5. Clean up locally
git switch main
git pull
git branch -d feature/add-user-profile`,
        },
        {
          type: 'heading',
          content: 'Git Flow (For Scheduled Releases)',
        },
        {
          type: 'text',
          content:
            'More structured. Uses main, develop, feature, release, and hotfix branches. Best for projects with versioned releases (mobile apps, libraries).',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Git Flow branch structure',
          code: `# Long-lived branches:
#   main     → production-ready code (tagged releases)
#   develop  → integration branch for features

# Feature branch
git switch develop
git switch -c feature/shopping-cart
# ... work, commit ...
git switch develop
git merge --no-ff feature/shopping-cart
git branch -d feature/shopping-cart

# Release branch (freeze features, only bug fixes)
git switch develop
git switch -c release/1.2.0
# ... fix bugs, bump version ...
git switch main
git merge --no-ff release/1.2.0
git tag -a v1.2.0 -m "Release 1.2.0"
git switch develop
git merge --no-ff release/1.2.0
git branch -d release/1.2.0

# Hotfix branch (urgent production fix)
git switch main
git switch -c hotfix/fix-payment-crash
# ... fix the bug ...
git switch main
git merge --no-ff hotfix/fix-payment-crash
git tag -a v1.2.1 -m "Hotfix 1.2.1"
git switch develop
git merge --no-ff hotfix/fix-payment-crash
git branch -d hotfix/fix-payment-crash`,
        },
        {
          type: 'heading',
          content: 'Trunk-Based Development',
        },
        {
          type: 'text',
          content:
            'Everyone commits to main (or very short-lived branches). Requires feature flags and strong CI. Used by high-performing teams (Google, Meta).',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Trunk-based workflow',
          code: `# Short-lived branches (< 1 day)
git switch -c fix/typo-in-header
# ... quick fix ...
git commit -m "fix: typo in header component"
git push -u origin fix/typo-in-header
# Open PR → fast review → merge → delete branch

# Or commit directly to main (small teams with good CI)
git switch main
git pull
git commit -m "chore: update dependencies"
git push`,
        },
        {
          type: 'heading',
          content: 'Branch Naming Conventions',
        },
        {
          type: 'list',
          items: [
            'feature/description — new features (feature/add-auth, feature/user-profile)',
            'bugfix/description — bug fixes (bugfix/login-redirect, bugfix/cart-total)',
            'hotfix/description — urgent production fixes (hotfix/fix-payment-crash)',
            'release/version — release prep (release/1.2.0, release/2.0.0-beta)',
            'chore/description — maintenance tasks (chore/update-deps, chore/ci-config)',
            'docs/description — documentation only (docs/api-readme, docs/contributing)',
          ],
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'For most web projects with continuous deployment, GitHub Flow is the best choice. Use Git Flow only if you need versioned releases. Keep branches short-lived — long-lived feature branches lead to painful merges.',
        },
      ],
    },

    // ─── Section 5: Merge vs Rebase ──────────────────────────────────
    {
      id: 'merge-vs-rebase',
      title: 'Merge vs Rebase',
      blocks: [
        {
          type: 'text',
          content:
            'Both merge and rebase integrate changes from one branch into another, but they produce different histories. Understanding when to use each is critical.',
        },
        {
          type: 'heading',
          content: 'Merge: Preserves History',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Merge workflow',
          code: `# Merge creates a new "merge commit" combining both branches
git switch main
git merge feature-auth

# History looks like:
#   * Merge branch 'feature-auth'  (merge commit)
#   |\\
#   | * feat: add token refresh
#   | * feat: add login endpoint
#   |/
#   * previous commit on main

# Pros: Non-destructive, preserves exact history of when branches diverged
# Cons: Can create a cluttered history with many merge commits`,
        },
        {
          type: 'heading',
          content: 'Rebase: Linear History',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Rebase workflow',
          code: `# Rebase replays your commits on top of the target branch
git switch feature-auth
git rebase main

# History looks like:
#   * feat: add token refresh      (replayed on top of main)
#   * feat: add login endpoint     (replayed on top of main)
#   * latest commit on main
#   * previous commit on main

# Then fast-forward merge
git switch main
git merge feature-auth    # Fast-forward, no merge commit

# Pros: Clean, linear history — easy to read and bisect
# Cons: Rewrites commit hashes — dangerous on shared branches`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'The Golden Rule of Rebasing: NEVER rebase commits that have been pushed to a shared/public branch. Rebasing rewrites commit hashes, which forces everyone else to re-sync. Only rebase your own local/feature branches.',
        },
        {
          type: 'heading',
          content: 'Interactive Rebase (Cleaning Up Commits)',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Interactive rebase',
          code: `# Rewrite the last 4 commits
git rebase -i HEAD~4

# Opens editor with:
# pick abc1234 feat: add login form
# pick def5678 fix: typo in login
# pick ghi9012 feat: add validation
# pick jkl3456 fix: validation edge case

# Change to:
# pick abc1234 feat: add login form
# squash def5678 fix: typo in login        ← squash into previous
# pick ghi9012 feat: add validation
# fixup jkl3456 fix: validation edge case  ← squash + discard message

# Commands:
# pick   = use commit as-is
# squash = meld into previous commit (edit combined message)
# fixup  = meld into previous commit (discard this message)
# reword = use commit but edit the message
# drop   = remove the commit entirely
# edit   = pause rebase to amend the commit`,
        },
        {
          type: 'heading',
          content: 'Recommended Workflow',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Rebase + merge workflow',
          code: `# While working on a feature branch:

# 1. Keep your branch up-to-date with main
git switch feature-auth
git fetch origin
git rebase origin/main

# 2. If conflicts arise during rebase:
# Fix conflicts in the file
git add .
git rebase --continue
# Or abort: git rebase --abort

# 3. Clean up commits before PR
git rebase -i HEAD~3     # Squash/reword as needed

# 4. Force-push to YOUR feature branch (safe — it's your branch)
git push --force-with-lease

# 5. Merge to main via PR (GitHub squash-and-merge or merge commit)`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Use --force-with-lease instead of --force when pushing after a rebase. It will refuse to push if someone else has pushed to the same branch, preventing you from overwriting their work.',
        },
      ],
    },

    // ─── Section 6: Conventional Commits ─────────────────────────────
    {
      id: 'conventional-commits',
      title: 'Conventional Commits',
      blocks: [
        {
          type: 'text',
          content:
            'Conventional Commits is a specification for writing standardized commit messages. It makes history readable, enables automated changelogs, and works with semantic versioning.',
        },
        {
          type: 'heading',
          content: 'Commit Message Format',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Format',
          code: `# Structure:
# <type>(<optional scope>): <description>
#
# [optional body]
#
# [optional footer(s)]

# Examples:
git commit -m "feat: add user registration endpoint"
git commit -m "fix: resolve null pointer in auth middleware"
git commit -m "docs: update API documentation for v2"
git commit -m "style: format files with prettier"
git commit -m "refactor: extract validation into separate module"
git commit -m "test: add unit tests for payment service"
git commit -m "chore: update dependencies to latest versions"
git commit -m "perf: optimize database queries with indexing"
git commit -m "ci: add GitHub Actions workflow for staging"
git commit -m "build: switch from webpack to vite"`,
        },
        {
          type: 'heading',
          content: 'Types Reference',
        },
        {
          type: 'list',
          items: [
            'feat — A new feature (correlates with MINOR in semver)',
            'fix — A bug fix (correlates with PATCH in semver)',
            'docs — Documentation only changes',
            'style — Code style (formatting, semicolons) — not CSS changes',
            'refactor — Code change that neither fixes a bug nor adds a feature',
            'test — Adding or updating tests',
            'chore — Maintenance (deps, configs, scripts) — no production code change',
            'perf — Performance improvements',
            'ci — CI/CD configuration changes',
            'build — Build system or external dependency changes',
            'revert — Reverts a previous commit',
          ],
        },
        {
          type: 'heading',
          content: 'Scopes & Breaking Changes',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Advanced commit messages',
          code: `# With scope (component/area affected)
git commit -m "feat(auth): add OAuth2 Google login"
git commit -m "fix(api): handle timeout on user endpoint"
git commit -m "refactor(db): migrate from callbacks to async/await"

# Breaking change (footer)
git commit -m "feat(api)!: change response format to JSON:API

BREAKING CHANGE: All API responses now follow JSON:API spec.
Clients must update their response parsing logic."

# Multi-line commit (using editor)
git commit
# Opens editor:
# feat(auth): add JWT refresh token rotation
#
# Implement automatic token refresh when access token expires.
# Refresh tokens are rotated on each use and old tokens are
# invalidated to prevent replay attacks.
#
# Closes #142`,
        },
        {
          type: 'heading',
          content: 'Commitlint Setup',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Enforce commit conventions',
          code: `# Install commitlint
npm install -D @commitlint/cli @commitlint/config-conventional

# Create config file
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.mjs

# Install Husky for git hooks
npm install -D husky
npx husky init

# Add commit-msg hook
echo 'npx --no -- commitlint --edit $1' > .husky/commit-msg

# Now invalid commits are rejected:
# git commit -m "did stuff"        → ✗ (no type)
# git commit -m "feat: add login"  → ✓`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Write commit messages in the imperative mood: "add feature" not "added feature" or "adds feature". Think of it as completing the sentence: "If applied, this commit will [your message]."',
        },
      ],
    },

    // ─── Section 7: Undoing Changes ──────────────────────────────────
    {
      id: 'undoing-changes',
      title: 'Undoing Changes',
      blocks: [
        {
          type: 'text',
          content:
            'Git provides several ways to undo changes, each suited for different situations. Understanding the difference between reset, revert, and restore is essential.',
        },
        {
          type: 'heading',
          content: 'Discard Working Directory Changes',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Restore files',
          code: `# Discard changes in a specific file (restore to last commit)
git restore src/app.js

# Discard all unstaged changes
git restore .

# Unstage a file (keep changes in working directory)
git restore --staged src/app.js

# Restore a file from a specific commit
git restore --source HEAD~2 src/app.js

# Old syntax (still works):
# git checkout -- src/app.js       ← discard changes
# git reset HEAD src/app.js        ← unstage`,
        },
        {
          type: 'heading',
          content: 'Git Reset (Rewrite Local History)',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Three types of reset',
          code: `# --soft: Move HEAD back, keep changes STAGED
# Use case: Redo the commit message or combine commits
git reset --soft HEAD~1
# Changes from the undone commit are staged and ready to re-commit

# --mixed (default): Move HEAD back, keep changes UNSTAGED
# Use case: Unstage everything and selectively re-add
git reset HEAD~1
# Changes are in working directory but not staged

# --hard: Move HEAD back, DISCARD all changes
# Use case: Completely throw away recent commits
git reset --hard HEAD~1
# ⚠️ Changes are GONE (unless you use reflog)

# Reset to a specific commit
git reset --soft abc1234
git reset --hard origin/main   # Match remote exactly`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'git reset --hard is destructive — it permanently deletes uncommitted changes. Always commit or stash your work before using it. For pushed commits, use git revert instead.',
        },
        {
          type: 'heading',
          content: 'Git Revert (Safe Undo for Shared History)',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Revert commits',
          code: `# Revert creates a NEW commit that undoes a previous commit
# Safe for shared branches — doesn't rewrite history

# Revert the last commit
git revert HEAD

# Revert a specific commit
git revert abc1234

# Revert without auto-committing (make adjustments first)
git revert --no-commit abc1234

# Revert a merge commit (must specify which parent to keep)
git revert -m 1 <merge-commit-hash>   # Keep main's side`,
        },
        {
          type: 'heading',
          content: 'Git Stash (Temporary Shelf)',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Stash workflow',
          code: `# Stash current changes (staged + unstaged)
git stash
git stash push -m "WIP: auth feature"     # With a description

# Include untracked files
git stash -u
git stash push -u -m "WIP: including new files"

# List stashes
git stash list
# stash@{0}: On feature-auth: WIP: auth feature
# stash@{1}: WIP on main: abc1234 previous commit msg

# Apply stash
git stash pop              # Apply most recent + remove from stash
git stash apply            # Apply most recent + keep in stash
git stash apply stash@{1}  # Apply a specific stash

# Drop and clear
git stash drop stash@{0}   # Remove a specific stash
git stash clear             # Remove all stashes`,
        },
        {
          type: 'heading',
          content: 'Git Reflog (Recovery Safety Net)',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Recovering lost commits',
          code: `# Reflog records every HEAD movement (even after reset --hard)
git reflog
# abc1234 HEAD@{0}: reset: moving to HEAD~3
# def5678 HEAD@{1}: commit: feat: add payments
# ghi9012 HEAD@{2}: commit: feat: add cart
# jkl3456 HEAD@{3}: commit: feat: add products

# Recover "lost" commits by resetting to them
git reset --hard def5678    # Go back to the "lost" commit

# Or create a new branch from it
git switch -c recovered-feature def5678

# Reflog entries expire after 90 days by default`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Rule of thumb: Use git revert for commits that have been pushed. Use git reset for local-only commits. Use git stash when you need to switch branches temporarily. Use git reflog when you\'ve lost something.',
        },
      ],
    },

    // ─── Section 8: Pull Request Workflow ─────────────────────────────
    {
      id: 'pull-request-workflow',
      title: 'Pull Request Workflow',
      blocks: [
        {
          type: 'text',
          content:
            'Pull Requests (PRs) are the standard way to propose, review, and merge changes in team projects. A good PR workflow improves code quality and knowledge sharing.',
        },
        {
          type: 'heading',
          content: 'Creating a Pull Request',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'PR workflow',
          code: `# 1. Create and push your feature branch
git switch -c feature/user-profile
# ... make changes, commit ...
git push -u origin feature/user-profile

# 2. Create PR via GitHub CLI
gh pr create --title "feat: add user profile page" \\
  --body "## Summary
- Add profile page with avatar upload
- Add profile edit form
- Add API integration

## Test Plan
- [ ] Profile page renders correctly
- [ ] Avatar upload works (< 5MB)
- [ ] Form validation works"

# 3. Create a draft PR (not ready for review)
gh pr create --draft --title "WIP: user profile page"

# 4. Mark draft as ready
gh pr ready

# 5. Request reviewers
gh pr edit --add-reviewer teammate1,teammate2

# 6. View PR status
gh pr status
gh pr checks`,
        },
        {
          type: 'heading',
          content: 'PR Description Template',
        },
        {
          type: 'code',
          language: 'markdown',
          fileName: '.github/pull_request_template.md',
          code: `## Summary
<!-- What does this PR do? Why? -->

## Changes
- [ ] Change 1
- [ ] Change 2

## Screenshots
<!-- If UI changes, add before/after screenshots -->

## Test Plan
- [ ] Unit tests pass
- [ ] Manual testing done
- [ ] Edge cases considered

## Related Issues
Closes #123`,
        },
        {
          type: 'heading',
          content: 'Code Review Best Practices',
        },
        {
          type: 'list',
          items: [
            'Keep PRs small — under 400 lines of meaningful changes',
            'One PR = one concern — don\'t mix features with refactors',
            'Write a clear description — explain WHY, not just what',
            'Self-review before requesting — read your own diff first',
            'Respond to all comments — resolve or explain your reasoning',
            'Use draft PRs for work-in-progress — signal it\'s not ready',
            'Review within 24 hours — don\'t block teammates',
            'Be kind and constructive — critique code, not the person',
          ],
        },
        {
          type: 'heading',
          content: 'Merge Strategies on GitHub',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Merge options',
          code: `# Merge commit (default) — preserves all commits + adds merge commit
# Best for: seeing full branch history
# git log shows: individual commits + merge commit

# Squash and merge — combines all branch commits into one
# Best for: clean main history, messy feature branches
# git log shows: single commit on main

# Rebase and merge — replays commits on top of main (no merge commit)
# Best for: linear history with meaningful individual commits
# git log shows: individual commits, linear history

# Recommended for most teams: Squash and Merge
# → Each PR becomes one clean commit on main
# → PR title becomes the commit message
# → Follow conventional commits for PR titles`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Configure your repo to auto-delete branches after merge: GitHub Repo → Settings → General → "Automatically delete head branches". This keeps your branch list clean.',
        },
      ],
    },

    // ─── Section 9: .gitignore Patterns ──────────────────────────────
    {
      id: 'gitignore-patterns',
      title: '.gitignore Patterns',
      blocks: [
        {
          type: 'text',
          content:
            'The .gitignore file tells Git which files and directories to exclude from version control. Getting this right prevents committing sensitive data, build artifacts, and OS files.',
        },
        {
          type: 'heading',
          content: 'Node.js / MERN Project .gitignore',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: '.gitignore',
          code: `# Dependencies
node_modules/
.pnp
.pnp.js

# Build output
dist/
build/
.next/
out/

# Environment variables (NEVER commit these)
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
*.env

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Testing
coverage/
.nyc_output/

# IDE / Editor
.vscode/
!.vscode/settings.json
!.vscode/extensions.json
.idea/
*.swp
*.swo
*~
.project

# OS files
.DS_Store
Thumbs.db
desktop.ini

# Misc
*.tgz
.cache/
.parcel-cache/
.turbo/`,
        },
        {
          type: 'heading',
          content: 'Pattern Syntax',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Pattern examples',
          code: `# Basic patterns
*.log               # Ignore all .log files
build/              # Ignore build directory
/TODO.md            # Ignore TODO.md in root only (not sub/TODO.md)

# Wildcards
*.js                # Any .js file
doc/**/*.pdf        # Any .pdf in doc/ and its subdirectories

# Negation (un-ignore)
*.env               # Ignore all .env files
!.env.example       # BUT track .env.example

# Directory only (trailing slash)
logs/               # Ignore logs directory
temp/               # Ignore temp directory

# Comments
# This is a comment`,
        },
        {
          type: 'heading',
          content: 'Ignoring Already Tracked Files',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Remove tracked files from Git',
          code: `# If you accidentally committed a file and then added it to .gitignore:
# .gitignore only works for UNTRACKED files

# Remove from Git but keep the file on disk
git rm --cached .env
git rm --cached -r node_modules/
git commit -m "chore: remove tracked files that should be ignored"

# Remove from Git AND delete from disk
git rm secret-file.txt

# Remove all files that should be ignored (bulk clean)
git rm -r --cached .
git add .
git commit -m "chore: re-apply .gitignore rules"`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'If you committed a .env file with secrets, removing it from Git is NOT enough. The secret is still in Git history. You must rotate the exposed credentials immediately. Use git-filter-repo to purge it from history if needed.',
        },
        {
          type: 'heading',
          content: 'Global .gitignore & .gitkeep',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Global ignore and empty directories',
          code: `# Set a global .gitignore (applied to ALL your repos)
git config --global core.excludesfile ~/.gitignore_global

# Common global ignores (~/.gitignore_global):
# .DS_Store
# Thumbs.db
# *.swp
# .idea/
# .vscode/

# .gitkeep — track empty directories
# Git doesn't track empty directories. Use a .gitkeep placeholder:
mkdir logs
touch logs/.gitkeep
git add logs/.gitkeep
# Now the logs/ directory is tracked (but its contents are ignored via .gitignore)`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Use gitignore.io (or npx gitignore node) to generate .gitignore files for your stack. Always start a project by adding .gitignore BEFORE the first commit.',
        },
      ],
    },

    // ─── Section 10: GitHub Actions CI/CD ─────────────────────────────
    {
      id: 'github-actions',
      title: 'GitHub Actions CI/CD',
      blocks: [
        {
          type: 'text',
          content:
            'GitHub Actions automates your workflow — run tests, lint code, build, and deploy on every push or PR. Workflow files live in .github/workflows/ as YAML.',
        },
        {
          type: 'heading',
          content: 'Workflow File Structure',
        },
        {
          type: 'code',
          language: 'yaml',
          fileName: '.github/workflows/ci.yml',
          code: `name: CI

# When to run
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

# Jobs to run
jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18, 20, 22]

    steps:
      # 1. Check out the code
      - uses: actions/checkout@v4

      # 2. Set up Node.js
      - name: Use Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'

      # 3. Install dependencies
      - run: npm ci

      # 4. Run linting
      - run: npm run lint

      # 5. Run tests
      - run: npm test

      # 6. Build (check for build errors)
      - run: npm run build`,
        },
        {
          type: 'heading',
          content: 'Node.js CI with Caching',
        },
        {
          type: 'code',
          language: 'yaml',
          fileName: '.github/workflows/ci.yml (optimized)',
          code: `name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npm run type-check
        continue-on-error: false

      - name: Run tests
        run: npm test -- --coverage

      - name: Upload coverage
        if: github.event_name == 'pull_request'
        uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/`,
        },
        {
          type: 'heading',
          content: 'Deploy to Vercel / Netlify',
        },
        {
          type: 'code',
          language: 'yaml',
          fileName: '.github/workflows/deploy.yml',
          code: `name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install and Build
        run: |
          npm ci
          npm run build

      # Deploy to Vercel
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'`,
        },
        {
          type: 'heading',
          content: 'Environment Variables & Secrets',
        },
        {
          type: 'code',
          language: 'yaml',
          fileName: 'Using secrets in workflows',
          code: `# Secrets are added in: GitHub Repo → Settings → Secrets → Actions

jobs:
  deploy:
    runs-on: ubuntu-latest
    env:
      # Environment variable available to all steps
      NODE_ENV: production

    steps:
      - uses: actions/checkout@v4

      - name: Run with secrets
        env:
          DATABASE_URL: \${{ secrets.DATABASE_URL }}
          API_KEY: \${{ secrets.API_KEY }}
        run: |
          echo "Deploying with secrets..."
          npm run migrate
          npm run deploy`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Never hardcode secrets in workflow files. Use GitHub Secrets (Settings → Secrets and variables → Actions). Secrets are masked in logs automatically.',
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Use npm ci instead of npm install in CI — it\'s faster, uses the exact lockfile versions, and fails if package-lock.json is out of sync with package.json.',
        },
      ],
    },

    // ─── Section 11: Git Hooks ────────────────────────────────────────
    {
      id: 'git-hooks',
      title: 'Git Hooks',
      blocks: [
        {
          type: 'text',
          content:
            'Git hooks are scripts that run automatically at specific points in the Git workflow. Use them to enforce code quality before commits reach the repository.',
        },
        {
          type: 'heading',
          content: 'Husky + lint-staged Setup',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Setup',
          code: `# Install Husky (manages git hooks) and lint-staged (runs linters on staged files)
npm install -D husky lint-staged

# Initialize Husky
npx husky init
# Creates .husky/ directory and adds "prepare" script to package.json

# The init command creates a pre-commit hook. Edit it:
echo 'npx lint-staged' > .husky/pre-commit`,
        },
        {
          type: 'heading',
          content: 'lint-staged Configuration',
        },
        {
          type: 'code',
          language: 'json',
          fileName: 'package.json',
          code: `{
  "scripts": {
    "prepare": "husky",
    "lint": "eslint .",
    "format": "prettier --write ."
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,yml,yaml}": [
      "prettier --write"
    ],
    "*.css": [
      "prettier --write"
    ]
  }
}`,
        },
        {
          type: 'heading',
          content: 'Common Hook Types',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Hook scripts',
          code: `# pre-commit — runs before a commit is created
# Use: lint, format, run fast tests
echo 'npx lint-staged' > .husky/pre-commit

# commit-msg — runs after writing the commit message
# Use: validate commit message format (conventional commits)
echo 'npx --no -- commitlint --edit $1' > .husky/commit-msg

# pre-push — runs before pushing to remote
# Use: run full test suite, type checking
echo 'npm test' > .husky/pre-push

# Make hooks executable (Linux/macOS)
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
chmod +x .husky/pre-push`,
        },
        {
          type: 'heading',
          content: 'Complete Setup Example',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Full setup from scratch',
          code: `# 1. Install everything
npm install -D husky lint-staged eslint prettier @commitlint/cli @commitlint/config-conventional

# 2. Initialize Husky
npx husky init

# 3. Configure hooks
echo 'npx lint-staged' > .husky/pre-commit
echo 'npx --no -- commitlint --edit $1' > .husky/commit-msg

# 4. Create commitlint config
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.mjs

# 5. Add lint-staged config to package.json (see above)

# Now on every commit:
# ✓ Staged .js/.jsx files are linted and formatted
# ✓ Commit message is validated against conventional commits
# ✓ Bad code or bad messages are rejected before committing`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'lint-staged only processes files that are staged (git add). This means it won\'t slow down your workflow by linting your entire codebase on every commit — just the files you changed.',
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Never use --no-verify to bypass hooks regularly. If your hooks are too slow, optimize them (e.g., use lint-staged instead of linting the entire project). Hooks exist to protect code quality.',
        },
      ],
    },

    // ─── Section 12: Advanced Git ─────────────────────────────────────
    {
      id: 'advanced-git',
      title: 'Advanced Git',
      blocks: [
        {
          type: 'text',
          content:
            'These are power-user commands for specific situations. You won\'t use them daily, but they\'re invaluable when you need them.',
        },
        {
          type: 'heading',
          content: 'Cherry-Pick (Copy Specific Commits)',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Cherry-pick workflow',
          code: `# Apply a specific commit from another branch to your current branch
git cherry-pick abc1234

# Cherry-pick without committing (just stage the changes)
git cherry-pick --no-commit abc1234

# Cherry-pick a range of commits
git cherry-pick abc1234..def5678

# Use case: A bugfix was committed to feature-branch but main needs it now
git switch main
git cherry-pick <bugfix-commit-hash>

# If there are conflicts:
# Resolve them, then:
git cherry-pick --continue
# Or abort:
git cherry-pick --abort`,
        },
        {
          type: 'heading',
          content: 'Git Bisect (Find the Bug)',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Binary search for bugs',
          code: `# Bisect uses binary search to find which commit introduced a bug

# Start bisecting
git bisect start

# Mark current commit as bad (has the bug)
git bisect bad

# Mark a known good commit (before the bug existed)
git bisect good v1.0.0    # Or a commit hash

# Git checks out a middle commit. Test it, then:
git bisect good    # If this commit is fine
git bisect bad     # If this commit has the bug

# Git narrows down and repeats until it finds the exact commit
# "abc1234 is the first bad commit"

# Done — reset to original state
git bisect reset

# Automate with a test script
git bisect start
git bisect bad HEAD
git bisect good v1.0.0
git bisect run npm test    # Git runs tests automatically to find the bad commit`,
        },
        {
          type: 'heading',
          content: 'Tags & Releases',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Tagging versions',
          code: `# Lightweight tag (just a pointer)
git tag v1.0.0

# Annotated tag (recommended — includes metadata)
git tag -a v1.0.0 -m "Release version 1.0.0"

# Tag a specific commit
git tag -a v1.0.0 abc1234 -m "Release 1.0.0"

# List tags
git tag                  # All tags
git tag -l "v1.*"        # Filter tags

# Push tags to remote
git push origin v1.0.0   # Push a single tag
git push origin --tags    # Push all tags

# Delete a tag
git tag -d v1.0.0                    # Delete locally
git push origin --delete v1.0.0      # Delete remote tag

# Create a GitHub release from a tag
gh release create v1.0.0 --title "v1.0.0" --notes "Release notes here"
gh release create v1.0.0 --generate-notes   # Auto-generate from commits`,
        },
        {
          type: 'heading',
          content: 'Git Blame & Log Investigation',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Investigating code history',
          code: `# Who wrote each line (and when)
git blame src/auth.js
git blame -L 10,20 src/auth.js    # Only lines 10-20

# Search commit messages
git log --grep="payment"           # Find commits mentioning "payment"
git log --all --grep="fix"         # Search across all branches

# Search code changes (when was this function added/removed?)
git log -S "processPayment"       # Find commits that add/remove this string
git log -G "function.*Payment"    # Regex search in diffs

# Show file at a specific commit
git show HEAD~5:src/auth.js       # View file as it was 5 commits ago

# Track how a file changed over time
git log --follow -p -- src/auth.js   # Full diff history (follows renames)`,
        },
        {
          type: 'heading',
          content: '.gitattributes',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: '.gitattributes',
          code: `# Normalize line endings (LF in repo, native on checkout)
* text=auto

# Force LF for these file types
*.js text eol=lf
*.jsx text eol=lf
*.ts text eol=lf
*.tsx text eol=lf
*.json text eol=lf
*.css text eol=lf
*.html text eol=lf
*.md text eol=lf
*.yml text eol=lf
*.yaml text eol=lf

# Mark as binary (no diff, no merge)
*.png binary
*.jpg binary
*.gif binary
*.ico binary
*.woff binary
*.woff2 binary
*.ttf binary
*.eot binary

# Linguist overrides (for GitHub language stats)
*.min.js linguist-vendored
*.min.css linguist-vendored
dist/** linguist-generated`,
        },
        {
          type: 'heading',
          content: 'Submodules Basics',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Working with submodules',
          code: `# Add a submodule (embeds another repo inside yours)
git submodule add git@github.com:user/lib.git libs/lib

# Clone a repo that has submodules
git clone --recurse-submodules git@github.com:user/repo.git

# If already cloned without --recurse-submodules:
git submodule update --init --recursive

# Update submodule to latest
cd libs/lib
git pull origin main
cd ../..
git add libs/lib
git commit -m "chore: update lib submodule"

# Remove a submodule
git submodule deinit libs/lib
git rm libs/lib
rm -rf .git/modules/libs/lib`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Prefer npm packages over Git submodules for dependencies. Submodules are hard to manage and confuse team members. Use them only when you need to embed a separate repository (e.g., shared config across multiple projects).',
        },
        {
          type: 'heading',
          content: 'Large File Handling',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Git LFS (Large File Storage)',
          code: `# Install Git LFS
git lfs install

# Track large file types
git lfs track "*.psd"
git lfs track "*.zip"
git lfs track "*.mp4"
git lfs track "assets/videos/**"

# This creates/updates .gitattributes — commit it!
git add .gitattributes
git commit -m "chore: configure Git LFS tracking"

# Check what's being tracked
git lfs ls-files

# Normal git workflow — LFS handles the rest
git add design.psd
git commit -m "feat: add homepage design"
git push   # Large file uploaded to LFS storage, pointer stored in repo`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'GitHub has a 100MB file size limit. For files larger than 50MB, use Git LFS. GitHub provides 1GB of free LFS storage and 1GB of bandwidth per month.',
        },
      ],
    },
  ],
};

export default gitData;
