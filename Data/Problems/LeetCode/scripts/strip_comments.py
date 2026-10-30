import os, re, sys
import os as _os, sys as _sys
_sys.path.insert(0, _os.path.dirname(_os.path.abspath(__file__)))
from lc_paths import D, CACHE, BAK, FETCH
# Removes <!-- ... --> blocks that lie inside "Problem Description" / "Examples" sections only.
for name in sys.argv[1:]:
    p = os.path.join(D, name)
    t = open(p, encoding="utf-8").read()
    idx = [0] + [m.start() for m in re.finditer(r"(?m)^## ", t) if m.start() > 0] + [len(t)]
    parts = [t[a:b] for a, b in zip(idx, idx[1:])]
    removed = 0
    for i, part in enumerate(parts):
        head = part.split("\n", 1)[0]
        if re.search(r"Problem Description|Examples", head):
            new, n = re.subn(r"\n?<!--.*?-->[ \t]*\n?", "\n", part, flags=re.S)
            new = re.sub(r"\n{3,}", "\n\n", new)
            parts[i] = new
            removed += n
    open(p, "w", encoding="utf-8").write("".join(parts))
    print(removed, "comment(s) removed:", name)
