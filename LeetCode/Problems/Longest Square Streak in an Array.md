# 2501. Longest Square Streak in an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-square-streak-in-an-array](https://leetcode.com/problems/longest-square-streak-in-an-array)
**Companies:** Amazon, Google, Meta, Microsoft

---

## 1. Problem Description

Find the longest subsequence where each element is the square of the previous one.

---

## 2. Approach: Hash Set + Chain Following — O(n log log M) ✅

```
FUNCTION longestSquareStreak(nums):
    s ← SET(nums)
    maxLen ← -1
    FOR num IN SORTED(nums):
        curr ← num
        length ← 0
        WHILE curr IN s:
            length ← length + 1
            curr ← curr * curr
        IF length ≥ 2:
            maxLen ← MAX(maxLen, length)
    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n log log M) | O(n) |

---

## 3. Examples

**Example 1:**
```
Input: nums = [2,4,16,256]
Output: 4
Explanation: The chain 2 → 4 → 16 → 256 uses each number as the square of the previous.
```

**Example 2:**
```
Input: nums = [3,9,81,5]
Output: 3
Explanation: The longest square streak is 3 → 9 → 81.
```

---

## 4. Walkthrough

| Step | Start | Current | Length |
|------|-------|---------|--------|
| 1 | 2 | 2 | 1 |
| 2 | 2 | 4 | 2 |
| 3 | 2 | 16 | 3 |
| 4 | 2 | 256 | 4 |

The algorithm iterates sorted numbers, builds a chain by repeatedly squaring while the result exists in the set, and tracks the maximum length.

---

## 5. Complexity Analysis

**Time:** `O(n log log M)` – each number is processed, and the squaring chain length is bounded by log log M.
**Space:** `O(n)` – the hash set stores all numbers.

---

## 6. Follow‑Up Questions

* How would you handle negative numbers or zero?
* Can the solution be adapted to find the longest geometric progression with ratio r?
* What changes are needed if the array is extremely large and cannot fit in memory?

---

## Key Takeaway

> Use a hash set to quickly test membership and follow square chains from each number, leveraging the fact that chain lengths are very short (log log M).
