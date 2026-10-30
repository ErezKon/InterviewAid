import os, re, subprocess, sys, time
import os as _os, sys as _sys
_sys.path.insert(0, _os.path.dirname(_os.path.abspath(__file__)))
from lc_paths import D, CACHE, BAK, FETCH
for name in sys.argv[1:]:
    t = open(os.path.join(D, name), encoding="utf-8").read()
    m = re.search(r"leetcode\.com/problems/([a-z0-9-]+)", t)
    title = re.match(r"#\s*\d+\.\s*(.+)", t).group(1).strip()
    slug = m.group(1) if m else re.sub(r"[^a-z0-9]+", "-", title.lower().replace("'", "")).strip("-")
    out = _os.path.join(CACHE, "%s.md" % slug)
    r = subprocess.run(["python3", FETCH, slug], stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    open(out, "wb").write(r.stdout)
    first = r.stdout.decode(errors="ignore").split("\n")[0]
    print(name, "->", slug, "|", first[:80], "|", len(r.stdout))
    time.sleep(1)
