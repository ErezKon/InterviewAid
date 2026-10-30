import glob, os, re, sys
import os as _os, sys as _sys
_sys.path.insert(0, _os.path.dirname(_os.path.abspath(__file__)))
from lc_paths import D, CACHE, BAK, FETCH
files = sorted({f for p in sys.argv[1:] for f in glob.glob(os.path.join(D, p))})
for f in files:
    sec = "HEADER"
    for i, l in enumerate(open(f, encoding="utf-8").read().split("\n"), 1):
        if l.startswith("## "): sec = l[3:40]
        if re.search(r"<!--|Actually|Wait[ ,]|Let's correct|adjusted", l):
            print(os.path.basename(f), "|", i, "|", sec, "|", l.strip()[:90])
