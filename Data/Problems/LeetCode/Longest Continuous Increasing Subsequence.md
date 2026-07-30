# 674. Longest Continuous Increasing Subsequence

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/longest-continuous-increasing-subsequence](https://leetcode.com/problems/longest-continuous-increasing-subsequence)
**Companies:** Amazon, Bloomberg, Google, Meta, Yandex

---

## 1. Problem Description

Find the length of the longest strictly increasing contiguous subarray.

## 2. Examples

| nums | Output |
|------|--------|
| [1,3,5,4,7] | 3 |
| [2,2,2,2,2] | 1 |
| [1,2,3,4,5] | 5 |

*Explanation*: The longest increasing contiguous segment in the first example is `[1,3,5]`.

## 3. Approach: Linear Scan — O(n) ✅

```
FUNCTION findLengthOfLCIS(nums):
    IF nums IS EMPTY: RETURN 0
    maxLen ← 1
    curr ← 1
    FOR i ← 1 TO LENGTH(nums) - 1:
        IF nums[i] > nums[i-1]:
            curr ← curr + 1
        ELSE:
            curr ← 1
        maxLen ← MAX(maxLen, curr)
    RETURN maxLen
```

## 4. Walkthrough

Consider `nums = [1,3,5,4,7]`.
1. Start with `maxLen = 1`, `curr = 1`.
2. i=1: 3 > 1 → `curr = 2`, `maxLen = 2`.
3. i=2: 5 > 3 → `curr = 3`, `maxLen = 3`.
4. i=3: 4 ≤ 5 → reset `curr = 1`.
5. i=4: 7 > 4 → `curr = 2`, `maxLen` stays 3.
Result is 3.

## 5. Complexity Analysis

- **Time**: O(n) – single pass through the array.
- **Space**: O(1) – only a few integer variables.

## 6. Follow-Up Questions

- How would you modify the algorithm to return the actual subarray, not just its length?
- Can you solve the problem in a streaming setting where numbers arrive one by one?
- What if the subarray must be of length at least k?

## 7. Key Takeaway

> Track the current increasing streak and reset when the order breaks. A single linear scan yields the answer with O(1) extra space.