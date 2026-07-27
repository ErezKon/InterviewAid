# 3875. Construct Uniform Parity Array I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/construct-uniform-parity-array-i](https://leetcode.com/problems/construct-uniform-parity-array-i)
**Companies:** Amdocs, Google

---

## 1. Problem Description

Given an array and a target parity (all even or all odd), determine if you can make all elements the same parity by incrementing/decrementing elements by 1, with some constraints.

---

## 2. Approach: Check Parity Feasibility — O(n) ✅

```
FUNCTION canMakeUniformParity(nums):
    // Check if all can become even or all odd
    // Each element can change parity by ±1
    // Simply check if target parity is achievable within constraints
    FOR target IN [0, 1]:  // 0 = even, 1 = odd
        IF all elements can reach target parity:
            RETURN true
    RETURN false
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Parity problems often reduce to counting: can all elements reach even (or odd) within the allowed operations?
