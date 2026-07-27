# 3761. Minimum Absolute Distance Between Mirror Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-absolute-distance-between-mirror-pairs](https://leetcode.com/problems/minimum-absolute-distance-between-mirror-pairs)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Key Insight

> Identify mirror pairs — indices where `s[i]` and `s[j]` form mirror characters (e.g., same character in reversed positions). Find the minimum `|i - j|` among all such pairs.

---

## Approach

```
FUNCTION minMirrorDist(s):
    // Track last occurrence of each character
    // Mirror pair: positions where characters match their mirror
    lastSeen ← MAP()
    minDist ← INFINITY
    
    FOR i ← 0 TO LEN(s) - 1 DO
        mirrorChar ← getMirror(s[i])
        IF mirrorChar IN lastSeen THEN
            minDist ← MIN(minDist, i - lastSeen[mirrorChar])
        lastSeen[s[i]] ← i
    
    RETURN minDist IF minDist ≠ INFINITY ELSE -1
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Single pass + hash map | **O(n)** | **O(26)** |

---

## Key Takeaway

> **Track last occurrence** of mirror characters and compute minimum distance on the fly.

---
