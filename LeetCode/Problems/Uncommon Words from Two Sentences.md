# 884. Uncommon Words from Two Sentences

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Google
---

```
FUNCTION uncommonFromSentences(s1, s2):
    count = Counter((s1 + ' ' + s2).split())
    RETURN [w for w, c in count.items() if c == 1]
```
