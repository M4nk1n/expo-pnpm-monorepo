#!/bin/sh

if [ -f "/etc/zprofile" ]; then
  source /etc/zprofile
fi
if [ -f "$HOME/.zprofile" ]; then
  source $HOME/.zprofile
fi

# window平台git hooks有时候可能会失败。
# 在 Windows 上通过 Git Bash ( stdin is not a tty) 使用 Yarn 时，Git 钩子可能会失败。如果您有 Windows 用户，强烈建议添加以下解决方法。
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi
