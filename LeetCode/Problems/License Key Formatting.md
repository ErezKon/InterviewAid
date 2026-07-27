# 482. License Key Formatting

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/license-key-formatting](https://leetcode.com/problems/license-key-formatting)
**Companies:** Google

---

## 1. Problem Description

Reformat a license key string: remove dashes, uppercase, then group from right with groups of size `k`, separated by dashes.

---

## 2. Approach: Reverse Build — O(n) ✅

```
FUNCTION licenseKeyFormatting(s, k):
    s = s.replace('-', '').upper()
    groups = []
    FOR i ← len(s) DOWN TO 0 step k:
        groups.ADD(s[MAX(0, i-k):i])
    RETURN '-'.JOIN(reversed(groups))
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> Strip dashes, uppercase, then chunk from the right in groups of `k`. The first group may be shorter.
