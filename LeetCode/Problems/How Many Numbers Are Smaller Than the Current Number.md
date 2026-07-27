# 1365. How Many Numbers Are Smaller Than the Current Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number](https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs

---

## 1. Problem Description

For each element, count how many other elements in the array are smaller.

## 2. Approach: Sort + Rank Map — O(n log n) ✅

```
FUNCTION smallerNumbersThanCurrent(nums):
    sorted_nums = sorted(nums)
    rank = {}
    FOR i, num IN enumerate(sorted_nums):
        IF num NOT IN rank: rank[num] = i
    RETURN [rank[num] for num in nums]
```

## Key Takeaway

> Sort to determine rank (first occurrence index = count of smaller elements). Map back to original order.
