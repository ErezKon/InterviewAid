# 167. Two Sum II - Input Array Is Sorted

**Difficulty:** 🟡 Medium
**Acceptance:** 63.0%
**LeetCode:** [https://leetcode.com/problems/two-sum-ii-input-array-is-sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Epam Systems, Google, Infosys, Jpmorgan, Meta, Microsoft, Oracle, Tcs, Tiktok, Visa, Yandex, Zoho

---

## 1. Problem Description

Given a 1-indexed sorted array, find two numbers that add up to `target`. Return their indices.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| numbers = [2,7,11,15], target = 9 | [1,2] | 2 + 7 = 9, indices are 1‑based |
| numbers = [2,3,4], target = 6 | [1,3] | 2 + 4 = 6 |
| numbers = [-1,0], target = -1 | [1,2] | -1 + 0 = -1 |

---

## 3. Approach: Two Pointers — O(n) ✅

```text
FUNCTION twoSum(numbers, target):
    lo ← 0
    hi ← len(numbers) - 1
    WHILE lo < hi:
        sum ← numbers[lo] + numbers[hi]
        IF sum == target:
            RETURN [lo + 1, hi + 1]   // 1-indexed
        ELSE IF sum < target:
            lo ← lo + 1
        ELSE:
            hi ← hi - 1
```

---

## 4. Walkthrough

Consider `numbers = [2,7,11,15]`, `target = 9`.
1. lo=0 (2), hi=3 (15) → sum=17 > 9 → move hi left.
2. lo=0 (2), hi=2 (11) → sum=13 > 9 → move hi left.
3. lo=0 (2), hi=1 (7) → sum=9 == target → return [1,2].

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 6. Follow-Up Questions

* How would you modify the algorithm if the array were not sorted?
* Can you solve it using a hash map with O(n) time and O(n) space?

---

## Key Takeaway

> Sorted array + target sum = two pointers from both ends. If sum < target, move left pointer right; if sum > target, move right pointer left.
