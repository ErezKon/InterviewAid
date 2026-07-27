# 3167. Better Compression of String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/better-compression-of-string](https://leetcode.com/problems/better-compression-of-string)
**Companies:** Goldman Sachs, Riot Games

---

## 1. Problem Description

Given a compressed string like `"a3b2c1a2"`, return the **sorted** compressed form by combining counts of repeated characters: `"a5b2c1"`.

---

## 2. Approach: Parse + Aggregate + Sort — O(n) ✅

```
FUNCTION betterCompression(compressed):
    count = {}
    i = 0
    WHILE i < len(compressed):
        ch = compressed[i]; i += 1
        num = 0
        WHILE i < len(compressed) AND compressed[i].isdigit():
            num = num * 10 + int(compressed[i]); i += 1
        count[ch] = count.get(ch, 0) + num
    
    RETURN ''.join(ch + str(count[ch]) for ch in sorted(count))
```

| Time | Space |
|------|-------|
| O(n + 26 log 26) = O(n) | O(26) = O(1) |

---

## Key Takeaway

> Parse character-count pairs, aggregate in a map, sort by character, reconstruct. Standard string parsing pattern.
