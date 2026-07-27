# 953. Verifying an Alien Dictionary

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Anduril, Apple, Bloomberg, Google, Meta, Uber, Wix
---

```
FUNCTION isAlienSorted(words, order):
    rank = {c: i for i, c in enumerate(order)}
    FOR i ← 0 TO len(words) - 2:
        IF NOT isOrdered(words[i], words[i+1], rank): RETURN false
    RETURN true
```
