import os, re, sys
import os as _os, sys as _sys
_sys.path.insert(0, _os.path.dirname(_os.path.abspath(__file__)))
from lc_paths import D, CACHE, BAK, FETCH
def other_sections(t):
    idx = [0] + [m.start() for m in re.finditer(r"(?m)^## ", t) if m.start() > 0] + [len(t)]
    parts = [t[a:b] for a, b in zip(idx, idx[1:])]
    keep = [p for p in parts if not re.search(r"^## .*(Problem Description|Example|Constraints)", p.split("\n", 1)[0])]
    return [re.sub(r"\n---\s*$", "", p).rstrip() for p in keep]
bad = 0
for name in sorted(os.listdir(BAK)):
    a = other_sections(open(_os.path.join(BAK, name), encoding="utf-8").read())
    b = other_sections(open(os.path.join(D, name), encoding="utf-8").read())
    if a != b:
        bad += 1; print("CHANGED outside desc/examples:", name)
print("checked", len(os.listdir(BAK)), "bad", bad)
