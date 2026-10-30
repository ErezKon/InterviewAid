import glob, os, re, subprocess, sys, time
import os as _os, sys as _sys
_sys.path.insert(0, _os.path.dirname(_os.path.abspath(__file__)))
from lc_paths import D, CACHE, BAK, FETCH
files = sorted({f for p in sys.argv[1:] for f in glob.glob(os.path.join(D, p))})

SUP = str.maketrans("⁰¹²³⁴⁵⁶⁷⁸⁹", "0123456789")
def norm(s):
    s = re.sub(r"[\u200b\u200c\u200d\ufeff\u202f\u00a0]", "", s)
    s = re.sub(r"([⁰¹²³⁴⁵⁶⁷⁸⁹]+)", lambda m: "^" + m.group(1).translate(SUP), s)
    s = s.replace("≤", "<=").replace("≥", ">=").replace("×", "*").replace("−", "-").replace("‑", "-")
    s = re.sub(r"[`*_\\$]", "", s)
    s = s.replace("^", "")
    return re.sub(r"\s+", "", s).lower()

for f in files:
    t = open(f, encoding="utf-8").read()
    m = re.search(r"leetcode\.com/problems/([a-z0-9-]+)", t)
    if not m:
        print("NOURL |", os.path.basename(f)); continue
    slug = m.group(1)
    cache = _os.path.join(CACHE, "%s.md" % slug)
    if not os.path.exists(cache) or os.path.getsize(cache) < 200:
        r = subprocess.run(["python3", FETCH, slug], stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        open(cache, "wb").write(r.stdout); time.sleep(0.7)
    off = open(cache, encoding="utf-8", errors="ignore").read()
    if "Traceback" in off or len(off) < 200:
        print("FETCHFAIL |", os.path.basename(f)); continue
    nt = norm(t)
    ins = re.findall(r"\*\*Input:?\*\*:?\s*(.+)", off)
    outs = re.findall(r"\*\*Output:?\s*\*\*:?\s*(.+)", off)
    miss = []
    for i, s in enumerate(ins):
        if norm(s) and norm(s) not in nt: miss.append("in%d" % (i + 1))
    for i, s in enumerate(outs):
        if norm(s) and len(norm(s)) > 0 and norm(s) not in nt: miss.append("out%d" % (i + 1))
    cons = off.split("**Constraints:**")[-1] if "**Constraints:**" in off else ""
    cl = [l.strip("\t -") for l in cons.split("\n") if l.strip().startswith("-")]
    cmiss = sum(1 for l in cl if norm(l) not in nt)
    rows = [l.strip() for l in off.split("\n") if l.strip().startswith("|") and l.strip().endswith("|")]
    rmiss = sum(1 for l in rows if norm(l) not in nt)
    if rmiss: miss.append("tablerows %d/%d" % (rmiss, len(rows)))
    body = off.split("\n", 1)[1] if off.startswith("ID:") else off
    stmt = re.split(r"\*\*Example", body)[0]
    sents = [s for s in re.split(r"(?<=[.!?])\s+|\n", stmt) if len(norm(s)) > 30 and "|" not in s and "+-" not in s]
    smiss = sum(1 for s in sents if norm(s) not in nt)
    if sents and smiss / len(sents) > 0.3: miss.append("statement %d/%d" % (smiss, len(sents)))
    if miss or cmiss:
        print("DIFF |", os.path.basename(f), "|", " ".join(miss), "| constraints missing %d/%d" % (cmiss, len(cl)))
print("DONE", len(files))
