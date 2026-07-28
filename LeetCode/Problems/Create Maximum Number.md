# 321. Create Maximum Number

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/create-maximum-number](https://leetcode.com/problems/create-maximum-number)
**Companies:** Accolite, Amazon, Bloomberg, Flipkart, Google, Microsoft, Oracle

---

## Problem Description

Given two arrays of digits, create the maximum number of length `k` by selecting digits from both arrays while preserving relative order within each array.

---

## Examples

| nums1 | nums2 | k | Output |
|-------|-------|---|--------|
| [3,4,6,5] | [9,1,2,5,8,3] | 5 | [9,8,6,5,3] |
| [6,7] | [6,0,4] | 5 | [6,7,6,0,4] |
| [3,9] | [8,9] | 3 | [9,8,9] |

*Explanation*: For each example, the algorithm selects digits to form the largest possible number while maintaining the original order within each input array.

---

## Approach

```text
FUNCTION maxNumber(nums1, nums2, k):
    result ← [0] * k
    FOR i ← MAX(0, k - LEN(nums2)) TO MIN(k, LEN(nums1)):
        sub1 ← maxSubsequence(nums1, i)
        sub2 ← maxSubsequence(nums2, k - i)
        merged ← merge(sub1, sub2)
        result ← MAX(result, merged)
    RETURN result

FUNCTION maxSubsequence(nums, k):
    stack ← []
    drop ← LEN(nums) - k
    FOR num IN nums:
        WHILE drop > 0 AND stack NOT EMPTY AND stack[-1] < num:
            POP(stack)
            drop ← drop - 1
        PUSH(stack, num)
    RETURN FIRST k ELEMENTS OF stack

FUNCTION merge(a, b):
    merged ← []
    WHILE a NOT EMPTY OR b NOT EMPTY:
        IF a > b: // lexicographically compare remaining suffixes
            APPEND merged WITH POP_FRONT(a)
        ELSE:
            APPEND merged WITH POP_FRONT(b)
    RETURN merged
```

---

## Walkthrough

Consider `nums1 = [3,4,6,5]`, `nums2 = [9,1,2,5,8,3]`, `k = 5`.

1. **Enumerate splits** `i` (digits taken from `nums1`):
   - `i = 0`: take 0 from `nums1`, 5 from `nums2` → subsequence `[9,8,5,3]` (invalid length, skip).
   - `i = 1`: subsequence from `nums1` → `[6]`; from `nums2` → `[9,8,3]`; merge → `[9,6,8,3]` (length 4, skip).
   - `i = 2`: `sub1 = [6,5]`, `sub2 = [9,8,3]`; merge → `[9,8,6,5,3]` (valid).
   - `i = 3` and `i = 4` produce smaller results.
2. The best merged array among all splits is `[9,8,6,5,3]`.

Thus the algorithm returns `[9,8,6,5,3]`.

---

## Complexity Analysis

- **Time Complexity:** O(k × (m + n)) – we try O(k) splits and each merge/selection is linear in the total length.
- **Space Complexity:** O(m + n) – auxiliary stacks for subsequences and the merged result.

---

## Follow-Up Questions

- How would you adapt the solution if the input arrays could contain negative numbers?
- Can you design an O(k log k) algorithm using a priority queue?
- How would you extend this to more than two arrays?

---

## Key Takeaway

> **Maximum number from two arrays:** enumerate possible splits, extract the best subsequence from each array using a monotonic stack, then merge greedily by comparing remaining suffixes. This combines three classic sub‑routines into a powerful solution.