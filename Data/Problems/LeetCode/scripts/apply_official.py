"""Replace Problem Description / Constraints / Examples sections of a problem file with official text.

usage: apply_official.py [--dry] [--note "text"] "File.md" ...
Only sections whose '## ' header contains 'Problem Description', 'Examples'/'Example', or 'Constraints'
are touched. Everything else (Approach, Walkthrough, ...) is preserved byte-for-byte.
"""
import os, re, sys

import os as _os, sys as _sys
_sys.path.insert(0, _os.path.dirname(_os.path.abspath(__file__)))
from lc_paths import D, CACHE, BAK, FETCH

def clean_inline(s):
    return s.replace("\u202f", " ").replace("\u00a0", " ").replace("\u200b", "")

def parse_official(md):
    lines = md.split("\n")
    if lines and lines[0].startswith("ID:"): lines = lines[1:]
    if lines and lines[0].startswith("[doocs]"): lines = lines[1:]
    txt = clean_inline("\n".join(lines))
    m_ex = re.search(r"\*\*Example( 1)?:\*\*", txt)
    m_con = re.search(r"\*\*Constraints:\*\*", txt)
    stmt_end = min([x.start() for x in (m_ex, m_con) if x] or [len(txt)])
    statement = txt[:stmt_end]
    examples_txt = txt[m_ex.start(): m_con.start() if m_con and m_con.start() > m_ex.start() else len(txt)] if m_ex else ""
    rest = txt[m_con.end():] if m_con else ""
    m_fu = re.search(r"\*\*Follow[ -]?up[^*]*\*\*", rest, re.I)
    constraints = rest[:m_fu.start()] if m_fu else rest
    followup = rest[m_fu.start():] if m_fu else ""
    # statement / followup tidy
    def tidy(block):
        out = []
        for l in block.split("\n"):
            l = re.sub(r"^\t+- ", "- ", l).rstrip()
            l = re.sub(r"^\t+", "  ", l)
            if l.strip() in ("", "\u00a0"): l = ""
            out.append(l)
        res, inside = [], False
        for l in out:
            if l.strip().startswith("```"):
                if inside:
                    while res and res[-1] == "": res.pop()
                else:
                    if res and res[-1] != "": res.append("")
                inside = not inside
                res.append(l); continue
            if inside and l == "" and res and res[-1].startswith("```"): continue
            res.append(l)
        return re.sub(r"\n{3,}", "\n\n", "\n".join(res)).strip()
    statement, followup = tidy(statement), tidy(followup)
    cons = [re.sub(r"^\s*- ", "- ", l).rstrip() for l in constraints.split("\n") if l.strip().startswith("-")]
    exs = []
    for chunk in re.split(r"\*\*Example(?: \d+)?:\*\*", examples_txt)[1:]:
        body = []
        for l in chunk.split("\n"):
            if l.strip().startswith("```") or l.strip().startswith("![img]"): continue
            l = l.replace("**", "").replace("`", "")
            l = re.sub(r"^\t+- ", "- ", l)
            l = re.sub(r"^\t+", "  ", l).rstrip()
            body.append(l)
        b = re.sub(r"\n{2,}", "\n", "\n".join(body)).strip()
        b = re.sub(r"(Input|Output|Explanation):\s*\n(?=\S)", lambda m: m.group(1) + ": ", b) if not re.search(r"\n\+-", b) else b
        b = re.sub(r"^(Output|Explanation)\s*$", r"\1:", b, flags=re.M)
        exs.append(b)
    return statement, exs, cons, followup

def render_examples(exs):
    out = []
    for i, b in enumerate(exs, 1):
        out.append("**Example %d:**\n```\n%s\n```" % (i, b))
    return "\n\n".join(out)

def split_sections(t):
    idx = [0] + [m.start() for m in re.finditer(r"(?m)^## ", t) if m.start() > 0] + [len(t)]
    return [t[a:b] for a, b in zip(idx, idx[1:])]

def main():
    args = sys.argv[1:]
    dry = "--dry" in args
    if dry: args.remove("--dry")
    note = None
    if "--note" in args:
        i = args.index("--note"); note = args[i + 1]; del args[i:i + 2]
    for name in args:
        p = os.path.join(D, name)
        t = open(p, encoding="utf-8").read()
        slug = re.search(r"leetcode\.com/problems/([a-z0-9-]+)", t).group(1)
        off = open(_os.path.join(CACHE, "%s.md" % slug), encoding="utf-8").read()
        paid = "Paid: True" in off.split("\n")[0]
        statement, exs, cons, fu = parse_official(off)
        parts = split_sections(t)
        heads = [s.split("\n", 1)[0] for s in parts]
        has_con_sec = any(re.search(r"^## .*Constraints", h) for h in heads)
        has_ex_sec = any(re.search(r"^## .*Example", h) for h in heads)
        did = []
        for i, sec in enumerate(parts):
            head = heads[i]
            tail = "\n---\n\n" if re.search(r"\n---\s*$", sec) else "\n"
            if re.search(r"Problem Description", head):
                body = []
                if note: body.append("> *Note: %s*" % note)
                elif paid: body.append("> *Note: premium problem — statement verified via doocs/leetcode.*")
                body.append(statement)
                if fu: body.append(fu)
                if not has_con_sec and cons: body.append("**Constraints:**\n" + "\n".join(cons))
                if not has_ex_sec and exs: body.append("**Examples:**\n\n" + render_examples(exs))
                parts[i] = head + "\n\n" + "\n\n".join(body) + "\n" + tail
                did.append("desc")
            elif re.search(r"^## .*Constraints", head):
                parts[i] = head + "\n\n" + "\n".join(cons) + "\n" + tail
                did.append("cons")
            elif re.search(r"^## .*Example", head):
                parts[i] = head + "\n\n" + render_examples(exs) + "\n" + tail
                did.append("ex")
        if "desc" not in did:
            print("!! no Problem Description section:", name); continue
        new = "".join(parts)
        if dry:
            print(new[:new.find("## ", new.find("Problem Description") + 30) if False else 4000])
        else:
            open(p, "w", encoding="utf-8").write(new)
        print("OK", "+".join(did), "|", len(exs), "examples |", len(cons), "constraints |", name)

main()
