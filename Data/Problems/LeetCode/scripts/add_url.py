import os, re, sys
import os as _os, sys as _sys
_sys.path.insert(0, _os.path.dirname(_os.path.abspath(__file__)))
from lc_paths import D, CACHE, BAK, FETCH
# usage: add_url.py "File.md=slug" ...
for arg in sys.argv[1:]:
    name, slug = arg.rsplit("=", 1)
    p = os.path.join(D, name)
    lines = open(p, encoding="utf-8").read().split("\n")
    head = "\n".join(lines[:8])
    if "leetcode.com/problems/" in head:
        print("SKIP (has url)", name); continue
    i = next(i for i, l in enumerate(lines[:8]) if l.startswith("**Difficulty:**") or l.startswith("**Acceptance:**"))
    if i + 1 < len(lines) and lines[i + 1].startswith("**Acceptance:**"): i += 1
    url = "https://leetcode.com/problems/%s" % slug
    lines.insert(i + 1, "**LeetCode:** [%s](%s)" % (url, url))
    open(p, "w", encoding="utf-8").write("\n".join(lines))
    print("ADDED", name)
