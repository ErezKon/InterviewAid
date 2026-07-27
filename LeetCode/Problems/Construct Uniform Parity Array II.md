# 3876. Construct Uniform Parity Array II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-uniform-parity-array-ii](https://leetcode.com/problems/construct-uniform-parity-array-ii)
**Companies:** Amdocs

---

## 1. Problem Description

Extended version of Uniform Parity Array I with additional constraints or larger input. Determine the minimum operations to make all elements the same parity.

---

## 2. Approach: Greedy / DP — O(n) ✅

```
FUNCTION minOperations(nums):
    // Try both target parities (all even, all odd)
    // For each, compute min total operations
    costEven = SUM(num % 2 for num in nums)       // cost to make all even
    costOdd = SUM((num + 1) % 2 for num in nums)  // cost to make all odd
    RETURN MIN(costEven, costOdd)
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Changing parity costs 1 per element. Total cost = count of elements with wrong parity. Try both targets and take the minimum.
