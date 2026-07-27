# 838. Push Dominoes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/push-dominoes](https://leetcode.com/problems/push-dominoes)
**Companies:** Amazon, Anduril, Bloomberg, Google, Meta, Microsoft

---

## Approach: Two Pointer / Force Simulation — O(n) ✅

```
FUNCTION pushDominoes(dominoes):
    s = 'L' + dominoes + 'R'
    result = list(s)
    i = 0

    FOR j ← 1 TO len(s) - 1:
        IF s[j] == '.': CONTINUE
        IF s[i] == s[j]:
            // Same direction: fill between
            FOR k ← i + 1 TO j - 1: result[k] = s[i]
        ELSE IF s[i] == 'R' AND s[j] == 'L':
            // Collide: fill from both sides
            lo, hi = i + 1, j - 1
            WHILE lo < hi:
                result[lo] = 'R'; result[hi] = 'L'
                lo += 1; hi -= 1
        // L...R: nothing happens
        i = j

    RETURN JOIN(result[1:-1])
```
