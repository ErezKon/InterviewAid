# 1144. Decrease Elements To Make Array Zigzag

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/decrease-elements-to-make-array-zigzag](https://leetcode.com/problems/decrease-elements-to-make-array-zigzag)
**Companies:** Google

---

## Problem Description

Find minimum decrements to make the array zigzag: either even-indexed elements are greater than neighbors, or odd-indexed elements are greater.

---

## Examples

**Example 1:**
```
Input: nums = [1,2,3]
Output: 2
Explanation: Decrease nums[1] to 0 and nums[2] to 1 to get [1,0,1] which is a zigzag array.
```

**Example 2:**
```
Input: nums = [9,6,1,6,2]
Output: 4
Explanation: Decrease nums[0] to 5, nums[3] to 0 and nums[4] to 1 to obtain [5,6,1,0,1].
```

---

## Approach

```
FUNCTION movesToMakeZigzag(nums):
    FUNCTION cost(parity):
        total ← 0
        FOR i ← parity TO len(nums)-1 STEP 2:
            left ← IF i-1 ≥ 0 THEN nums[i-1] ELSE INF
            right ← IF i+1 < len(nums) THEN nums[i+1] ELSE INF
            target ← MIN(left, right) - 1
            IF nums[i] > target:
                total ← total + (nums[i] - target)
        RETURN total
    RETURN MIN(cost(0), cost(1))
```

---

## Walkthrough

**Example 1:** `nums = [1,2,3]`

| Index | Value | Left Neighbor | Right Neighbor | Target (min‑1) | Decrease Needed |
|-------|-------|---------------|----------------|---------------|-----------------|
| 0 (even) | 1 | INF | 2 | 1 (2‑1) | 0 |
| 2 (even) | 3 | 2 | INF | 1 (2‑1) | 2 |

Total decrease for even‑index pattern = 2.

For odd‑index pattern (index 1):
- Left = 1, Right = 3, target = 0, decrease = 2.
Total = 2.
Minimum = 2, matching the expected output.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Follow-Up Questions

- How would the solution change if you were allowed to increase elements instead of only decreasing?
- Can you solve the problem in a single pass without separate cost functions?
- How would you adapt the algorithm for a circular array where the first and last elements are also neighbors?

---

## Key Takeaway

> **Zigzag by decreasing only: try both parities (decrease even-indexed or odd-indexed elements). Each element must be decreased to `min(neighbors) - 1` if it's too large. Take the cheaper option.**