# 288. Unique Word Abbreviation

**Difficulty:** 🟡 Medium

**Companies:** Google, Meta
---

```
CLASS ValidWordAbbr:
    CONSTRUCTOR(dictionary):
        self.abbr = defaultdict(set)
        FOR w IN dictionary: abbr[getAbbr(w)].ADD(w)
    FUNCTION isUnique(word):
        a = getAbbr(word)
        RETURN a NOT IN abbr OR abbr[a] == {word}
```
