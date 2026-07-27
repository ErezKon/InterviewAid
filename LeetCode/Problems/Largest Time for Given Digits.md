# 949. Largest Time for Given Digits

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-time-for-given-digits](https://leetcode.com/problems/largest-time-for-given-digits)
**Companies:** Liveramp, Microsoft, Zoho

---

## 1. Problem Description

Given 4 digits, return the largest 24-hour time (HH:MM) that can be formed. Return `""` if no valid time.

---

## 2. Approach: Enumerate Permutations — O(1) ✅

```
FUNCTION largestTimeFromDigits(arr):
    best = ""
    FOR perm IN permutations(arr):
        h = perm[0] * 10 + perm[1]
        m = perm[2] * 10 + perm[3]
        IF h < 24 AND m < 60:
            time = f"{h:02d}:{m:02d}"
            IF time > best: best = time
    RETURN best
```

| Time | Space |
|------|-------|
| O(4!) = O(24) = O(1) | O(1) |

---

## 3. Key Takeaway

> Only 24 permutations of 4 digits — brute force all, filter valid times, take the max. String comparison works for "HH:MM" format.
