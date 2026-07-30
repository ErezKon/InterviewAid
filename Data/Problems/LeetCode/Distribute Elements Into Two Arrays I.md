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

```text
FUNCTION resultArray(nums):
    // Initialize the two result arrays
    SET arr1 ← [nums[0]]
    SET arr2 ← [nums[1]]
    // Process remaining elements
    FOR i ← 2 TO len(nums) - 1:
        IF arr1[-1] > arr2[-1] THEN
            APPEND nums[i] TO arr1
        ELSE
            APPEND nums[i] TO arr2
    // Concatenate the two arrays
    RETURN arr1 + arr2
```

---

## Examples

| nums | Expected Output |
|------|-----------------|
| `[2,1,3,4,5]` | `[2,3,4,5,1]` |
| `[1,2,3]` | `[1,2,3]` |

---

## Walkthrough

**Example 1:** `nums = [2,1,3,4,5]`

| Step | arr1 | arr2 | Action |
|------|------|------|--------|
| Init | `[2]` | `[1]` | – |
| i=2 (3) | `2 > 1` → append to arr1 | `[2,3]` | `[1]` |
| i=3 (4) | `3 > 1` → append to arr1 | `[2,3,4]` | `[1]` |
| i=4 (5) | `4 > 1` → append to arr1 | `[2,3,4,5]` | `[1]` |

Result = `[2,3,4,5,1]`.

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n) | Single pass through `nums` |
| **Space** | O(n) | Output arrays store all elements |

---

## Follow-Up Questions

1. How would the algorithm change if the comparison rule were reversed?
2. Can you solve it in-place without extra arrays?
3. What if the input size were much larger – would a streaming approach work?

---

## Key Takeaway

> **Direct simulation — compare last elements of both arrays and append accordingly. Small constraints make this trivial.**