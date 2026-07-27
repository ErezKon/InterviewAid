# 3254. Find the Power of K-Size Subarrays I

**Difficulty:** 🟡 Medium

**Companies:** Bloomberg, Google, Meta
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sliding Window — O(n) ✅](#3-approach-sliding-window--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

For each window of size `k`, return the maximum element if the window contains consecutive integers (sorted ascending), else -1.

**Constraints:**
- `1 <= k <= n <= 10⁵`

---

## 2. Key Insight

> Track a running count of consecutive positions where `nums[i] == nums[i-1] + 1`. If the count ≥ k-1, the window is consecutive. The maximum in a consecutive ascending window is the last element.

---

## 3. Approach: Sliding Window — O(n) ✅

```
FUNCTION resultsArray(nums, k):
    result ← []
    consec ← 0

    FOR i ← 0 TO n - 1 DO
        IF i > 0 AND nums[i] == nums[i-1] + 1 THEN
            consec += 1
        ELSE
            consec ← 0

        IF i >= k - 1 THEN
            IF consec >= k - 1 THEN
                result.ADD(nums[i])
            ELSE
                result.ADD(-1)

    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) (excluding output) |

---

## 5. Key Takeaway

> Track consecutive-ascending streak length. A window is valid iff the streak at its end ≥ k-1. O(n) single pass.
