# 1144. Decrease Elements To Make Array Zigzag

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/decrease-elements-to-make-array-zigzag](https://leetcode.com/problems/decrease-elements-to-make-array-zigzag)
**Companies:** Google

---

## Problem Description

Find minimum decrements to make the array zigzag: either even-indexed elements are greater than neighbors, or odd-indexed elements are greater.

---

## Key Insight

Try both patterns: (1) decrease even-index elements to be < both neighbors, (2) decrease odd-index elements to be < both neighbors. For each, greedily compute the required decrease at each position. Return the minimum total.

---

## Approach

```
FUNCTION movesToMakeZigzag(nums):
    FUNCTION cost(parity):
        total = 0
        FOR i ← parity TO len(nums)-1 STEP 2:
            target = MIN(neighbor values of i) - 1
            IF nums[i] > target: total += nums[i] - target
        RETURN total
    RETURN MIN(cost(0), cost(1))
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Key Takeaway

> **Zigzag by decreasing only: try both parities (decrease even-indexed or odd-indexed elements). Each element must be decreased to `min(neighbors) - 1` if it's too large. Take the cheaper option.**
