import glob, os, re, sys
import os as _os, sys as _sys
_sys.path.insert(0, _os.path.dirname(_os.path.abspath(__file__)))
from lc_paths import D, CACHE, BAK, FETCH
pats = sys.argv[1:]
files = sorted({f for p in pats for f in glob.glob(os.path.join(D, p))})
print("TOTAL", len(files))
for f in files:
    t = open(f, encoding="utf-8").read()
    name = os.path.basename(f)
    flags = []
    if not re.search(r"(^|\n)\s*(#+\s*(\d+\.\s*)?|\*\*)Constraints", t): flags.append("NO_CONSTRAINTS")
    if "leetcode.com/problems/" not in t.split("---")[0]: flags.append("NO_URL")
    if re.search(r"[\u202f\u00a0]", t): flags.append("HIDDEN")
    if re.search(r"<!--|Actually|Wait[ ,]|Let's correct|adjusted", t): flags.append("JUNK")
    if re.search(r"reconstructed|derived, not from", t): flags.append("NOTE")
    if re.search(r"Table:|\bSELECT\b|pandas|DataFrame", t): flags.append("SQL")
    m = re.match(r"#\s*(\d+)\.", t)
    if flags:
        print((m.group(1) if m else "?"), "|", name, "|", " ".join(flags))
