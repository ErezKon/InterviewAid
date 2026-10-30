import sys
# usage: replace_section.py FILE START_PREFIX END_PREFIX NEWTEXT_FILE
# Replaces lines from the first line starting with START_PREFIX up to (not including) the first later line starting with END_PREFIX.
path, start_p, end_p, new_path = sys.argv[1:5]
lines = open(path, encoding="utf-8").read().split("\n")
s = next(i for i, l in enumerate(lines) if l.startswith(start_p))
e = next(i for i in range(s + 1, len(lines)) if lines[i].startswith(end_p))
new = open(new_path, encoding="utf-8").read().rstrip("\n").split("\n") + [""]
lines[s:e] = new
open(path, "w", encoding="utf-8").write("\n".join(lines))
print("replaced lines %d-%d" % (s + 1, e))
