# 3069. Distribute Elements Into Two Arrays I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/distribute-elements-into-two-arrays-i](https://leetcode.com/problems/distribute-elements-into-two-arrays-i)
**Companies:** Amazon, Autodesk

---

## Problem Description

Distribute elements of `nums` into `arr1` and `arr2`. Start with `arr1 = [nums[0]]`, `arr2 = [nums[1]]`. For each subsequent element, if the last element of `arr1` > last element of `arr2`, append to `arr1`; otherwise `arr2`. Return `arr1 + arr2`.

**Constraints:** `3 <= n <= 50`

---

## Approach: Simulation ✅

```
FUNCTION resultArray(nums):
    arr1 ← [nums[0]]
    arr2 ← [nums[1]]
    FOR i ← 2 TO length(nums) - 1 DO
        IF arr1[-1] > arr2[-1] THEN
            arr1.ADD(nums[i])
        ELSE
            arr2.ADD(nums[i])
    RETURN arr1 + arr2
END FUNCTION
```

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n) | Single pass |
| **Space** | O(n) | Two arrays |

---

## Key Takeaway

> **Direct simulation — compare last elements of both arrays and append accordingly. Small constraints make this trivial.**
