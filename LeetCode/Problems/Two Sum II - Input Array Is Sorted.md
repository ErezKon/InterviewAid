# 167. Two Sum II - Input Array Is Sorted

**Difficulty:** 🟡 Medium
**Acceptance:** 63.0%
**LeetCode:** [https://leetcode.com/problems/two-sum-ii-input-array-is-sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Epam Systems, Google, Infosys, Jpmorgan, Meta, Microsoft, Oracle, Tcs, Tiktok, Visa, Yandex, Zoho

---

## 1. Problem Description

Given a 1-indexed sorted array, find two numbers that add up to `target`. Return their indices.

---

## 2. Approach: Two Pointers — O(n) ✅

```
FUNCTION twoSum(numbers, target):
    lo, hi = 0, len(numbers) - 1

    WHILE lo < hi:
        sum = numbers[lo] + numbers[hi]
        IF sum == target:
            RETURN [lo + 1, hi + 1]     // 1-indexed
        ELSE IF sum < target:
            lo += 1
        ELSE:
            hi -= 1
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Sorted array + target sum = two pointers from both ends. If sum < target, move left pointer right; if sum > target, move right pointer left.
