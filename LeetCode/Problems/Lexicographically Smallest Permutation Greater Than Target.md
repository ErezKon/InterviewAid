# 3720. Lexicographically Smallest Permutation Greater Than Target

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-permutation-greater-than-target](https://leetcode.com/problems/lexicographically-smallest-permutation-greater-than-target)
**Companies:** Amazon, Google

---

## 1. Problem Description

Find the next permutation of the given array — the lexicographically smallest permutation greater than the target.

---

## 2. Approach: Next Permutation Algorithm — O(n) ✅

```
FUNCTION nextPermutation(nums):
    // 1. Find rightmost i where nums[i] < nums[i+1]
    // 2. Find rightmost j > i where nums[j] > nums[i]
    // 3. Swap nums[i] and nums[j]
    // 4. Reverse nums[i+1:]
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Key Takeaway

> Classic next permutation: find the rightmost ascent, swap with the smallest larger element to its right, then reverse the suffix to make it smallest.
