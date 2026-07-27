# 907. Sum of Subarray Minimums

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-subarray-minimums](https://leetcode.com/problems/sum-of-subarray-minimums)
**Companies:** Accenture, Amazon, Apple, Avito, Bloomberg, Flipkart, Google, Meta, Microsoft, Morgan Stanley, Sprinklr, Tiktok, Zs Associates

---

## Approach: Monotonic Stack — O(n) ✅

For each element, find how many subarrays it's the minimum of.

```
FUNCTION sumSubarrayMins(arr):
    n = len(arr)
    MOD = 10^9 + 7
    left = [0] * n     // distance to previous smaller
    right = [0] * n    // distance to next smaller or equal
    stack = []

    // Previous Less Element
    FOR i ← 0 TO n - 1:
        WHILE stack AND arr[stack.TOP()] >= arr[i]:
            stack.POP()
        left[i] = i - stack.TOP() IF stack ELSE i + 1
        stack.PUSH(i)

    stack = []
    // Next Less or Equal Element
    FOR i ← n - 1 DOWN TO 0:
        WHILE stack AND arr[stack.TOP()] > arr[i]:
            stack.POP()
        right[i] = stack.TOP() - i IF stack ELSE n - i
        stack.PUSH(i)

    result = 0
    FOR i ← 0 TO n - 1:
        result = (result + arr[i] * left[i] * right[i]) % MOD

    RETURN result
```

Each element contributes `arr[i] * left[i] * right[i]` to the total sum.
