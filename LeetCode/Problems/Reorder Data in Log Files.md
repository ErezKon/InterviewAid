# 937. Reorder Data in Log Files

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Google, Meta, Microsoft
---

```
FUNCTION reorderLogFiles(logs):
    // Letter logs sorted by content then identifier
    // Digit logs maintain relative order, come after letter logs
    letters = [l for l in logs if l.split()[1].isalpha()]
    digits = [l for l in logs if l.split()[1].isdigit()]
    letters.sort(key=lambda x: (x.split(None, 1)[1], x.split()[0]))
    RETURN letters + digits
```
