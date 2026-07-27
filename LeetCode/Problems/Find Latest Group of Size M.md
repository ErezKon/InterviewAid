# 1562. Find Latest Group of Size M

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-latest-group-of-size-m](https://leetcode.com/problems/find-latest-group-of-size-m)
**Companies:** Google

---

## Problem Description

Binary string starts as all 0s. At step `i`, set position `arr[i]` to 1. Find the latest step where a group of consecutive 1s of length exactly `m` exists.

---

## Approach: Track Group Lengths — O(n) ✅

```
FUNCTION findLatestStep(arr, m):
    n = len(arr)
    IF m == n: RETURN n
    length = [0] * (n + 2)  // length of group at each boundary
    countOfM = 0; result = -1

    FOR step, pos IN enumerate(arr, 1):
        left = length[pos - 1]; right = length[pos + 1]
        newLen = left + right + 1

        // Update boundaries
        length[pos - left] = newLen
        length[pos + right] = newLen

        // Track groups of size m
        IF left == m: countOfM -= 1
        IF right == m: countOfM -= 1
        IF newLen == m: countOfM += 1

        IF countOfM > 0: result = step

    RETURN result
```

---

## Key Takeaway

> **Track group lengths at boundaries. When a bit is set, merge with adjacent groups. Count groups of exactly size m using boundary updates.**
