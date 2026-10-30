"""Run apply_official.py on files while keeping the manual `>` notes of their Problem Description.

usage: apply_keep_notes.py "File.md" ...
Blockquote blocks (lines starting with '>') in the old Problem Description section are re-inserted
verbatim right after the section header; if any exist, the automatic premium note is dropped.
"""
import os, re, subprocess, sys

import os as _os, sys as _sys
_sys.path.insert(0, _os.path.dirname(_os.path.abspath(__file__)))
from lc_paths import D

APPLY = os.path.join(os.path.dirname(os.path.abspath(__file__)), "apply_official.py")
AUTO = "> *Note: premium problem — statement verified via doocs/leetcode.*"


def desc_bounds(t):
    m = re.search(r"(?m)^## .*Problem Description.*$", t)
    if not m:
        return None
    n = re.search(r"(?m)^## ", t[m.end():])
    return m.start(), m.end(), m.end() + n.start() if n else len(t)


def notes_of(t):
    b = desc_bounds(t)
    if not b:
        return []
    blocks, cur = [], []
    for l in t[b[1]:b[2]].split("\n"):
        if l.startswith(">"):
            cur.append(l)
        elif cur:
            blocks.append("\n".join(cur)); cur = []
    if cur:
        blocks.append("\n".join(cur))
    return blocks


for name in sys.argv[1:]:
    p = os.path.join(D, name)
    notes = notes_of(open(p, encoding="utf-8").read())
    r = subprocess.run([sys.executable, APPLY, name], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, universal_newlines=True)
    out = r.stdout.strip()
    if notes and out.startswith("OK"):
        t = open(p, encoding="utf-8").read()
        s, h, e = desc_bounds(t)
        body = t[h:e].replace("\n" + AUTO + "\n", "\n", 1)
        t = t[:h] + "\n\n" + "\n\n".join(notes) + "\n\n" + body.lstrip("\n") + t[e:]
        open(p, "w", encoding="utf-8").write(t)
        out += " | kept %d note(s)" % len(notes)
    print(out)
