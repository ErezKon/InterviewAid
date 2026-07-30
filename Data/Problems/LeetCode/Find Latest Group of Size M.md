# 1562. Find Latest Group of Size M

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-latest-group-of-size-m](https://leetcode.com/problems/find-latest-group-of-size-m)
**Companies:** Google

---

## Problem Description

Binary string starts as all 0s. At step `i`, set position `arr[i]` to 1. Find the latest step where a group of consecutive 1s of length exactly `m` exists.

---

## Approach: Track Group Lengths — O(n) ✅

```text
FUNCTION findLatestStep(arr, m):
    n ← LENGTH(arr)
    IF m == n: RETURN n
    length ← ARRAY[0..n+1] INITIALIZED TO 0  // length of group at each boundary
    countOfM ← 0
    result ← -1
    FOR step, pos IN ENUMERATE(arr, 1):
        left ← length[pos - 1]
        right ← length[pos + 1]
        newLen ← left + right + 1
        // Update boundaries of the merged group
        length[pos - left] ← newLen
        length[pos + right] ← newLen
        // Adjust count of groups of size m
        IF left == m: countOfM ← countOfM - 1
        IF right == m: countOfM ← countOfM - 1
        IF newLen == m: countOfM ← countOfM + 1
        IF countOfM > 0: result ← step
    RETURN result
```

---

## Examples

| arr | m | Output |
|-----|---|--------|
| `[3,5,1,2,4]` | `1` | `4` |
| `[1,2,3]` | `2` | `-1` |

---

## Walkthrough

Consider `arr = [3,5,1,2,4]`, `m = 1`.

1. Step 1, set position 3 → groups: `[0001000]` → one group of size 1 → result = 1.
2. Step 2, set position 5 → groups: `[0001010]` → two groups of size 1 → result = 2.
3. Step 3, set position 1 → groups: `[1001010]` → three groups of size 1 → result = 3.
4. Step 4, set position 2 → groups merge to size 2 → no size‑1 groups → result stays = 3.
5. Step 5, set position 4 → groups merge to size 5 → still no size‑1 groups.

The latest step with a size‑1 group was step 3, so the algorithm returns `3`.

---

## Complexity Analysis

- **Time:** O(n) – single pass over the array.
- **Space:** O(n) – auxiliary array storing group lengths at boundaries.

---

## Follow‑Up Questions

1. How would you adapt the solution to return the earliest step instead of the latest?
2. Can you solve the problem using a Union‑Find data structure?
3. What changes are needed if the input positions are 0‑indexed?

---

## Key Takeaway

> **Track group lengths at boundaries. When a bit is set, merge with adjacent groups. Count groups of exactly size m using boundary updates.**