# 2788. Split Strings by Separator

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Apple, Coupang
---

```
FUNCTION splitWordsBySeparator(words, separator):
    RETURN [part for w in words for part in w.split(separator) if part]
```
