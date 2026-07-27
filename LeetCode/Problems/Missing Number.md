# 268. Missing Number

**Difficulty:** 🟢 Easy
**Acceptance:** 67.0%
**LeetCode:** [https://leetcode.com/problems/missing-number](https://leetcode.com/problems/missing-number)
**Companies:** Adobe, Amazon, Apple, Aqr Capital Management, Arista Networks, Blackrock, Bloomberg, Goldman Sachs, Google, Hcl, Ibm, Meta, Microsoft, Nvidia, Oracle, Revolut, Salesforce, Tcs, Zoho

---

## 1. Problem Description

Given an array `nums` containing `n` distinct numbers in `[0, n]`, return the one number that is missing.

---

## 2. Approach 1: XOR — O(n), O(1) ✅

```
FUNCTION missingNumber(nums):
    result = len(nums)
    FOR i ← 0 TO len(nums) - 1:
        result = result XOR i XOR nums[i]
    RETURN result
```

### Approach 2: Sum Formula

```
FUNCTION missingNumber(nums):
    n = len(nums)
    expected = n * (n + 1) / 2
    RETURN expected - SUM(nums)
```

| Approach | Time | Space |
|----------|------|-------|
| XOR | O(n) | O(1) |
| Sum | O(n) | O(1) |

XOR avoids potential integer overflow with large n.

---

## Key Takeaway

> XOR with all indices and values — the missing number won't cancel out. Sum formula is simpler but watch for overflow.
