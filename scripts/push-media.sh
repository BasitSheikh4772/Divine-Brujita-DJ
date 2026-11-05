#!/bin/bash
# Push heavy media in small commits (GitHub HTTP times out on one huge push).
set -u
cd "$(dirname "$0")/.."
TRAILER="Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
push_batch() {
  git commit -q -m "$1

$TRAILER" || return 0
  for i in 1 2 3; do git push -q origin main && return 0; echo "retry $i"; sleep 5; done
  echo "FAILED: $1"; exit 1
}
ls public/img/site | split -l 150 - /tmp/imgbatch_
n=0
for f in /tmp/imgbatch_*; do
  n=$((n+1)); sed 's#^#public/img/site/#' "$f" | xargs git add --
  push_batch "Add site images (batch $n)"; echo "images batch $n pushed"
done
ls public/videos | sed 's#^#public/videos/#' > /tmp/vids.txt
split -l 6 /tmp/vids.txt /tmp/vidbatch_
n=0
for f in /tmp/vidbatch_*; do
  n=$((n+1)); xargs git add -- < "$f"
  push_batch "Add ritual videos (batch $n)"; echo "videos batch $n pushed"
done
echo ALLDONE
