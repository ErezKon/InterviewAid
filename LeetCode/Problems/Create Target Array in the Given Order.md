# 1389. Create Target Array in the Given Order

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/create-target-array-in-the-given-order](https://leetcode.com/problems/create-target-array-in-the-given-order)
**Companies:** Amazon, Bloomberg, Google, Visa

---

## Problem Description

Insert `nums[i]` at position `index[i]` in a target array (shifting existing elements right). Return the final target array.

---

## Approach

```
FUNCTION createTargetArray(nums, index):
    target = []
    FOR n, i IN zip(nums, index):
        target.INSERT(i, n)
    RETURN target
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n²) due to list insertions |
| **Space** | O(n) |

---

## Key Takeaway

> **Simulate insertions directly using list.insert(). For small n, this O(n²) approach is sufficient.**
