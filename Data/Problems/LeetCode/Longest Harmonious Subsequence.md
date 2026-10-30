# 594. Longest Harmonious Subsequence

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/longest-harmonious-subsequence](https://leetcode.com/problems/longest-harmonious-subsequence)
**Companies:** Amazon, Bloomberg, Google, Liveramp, Meta, Microsoft, Zs Associates

---

## 1. Problem Description

We define a harmonious array as an array where the difference between its maximum value and its minimum value is **exactly** `1`.

Given an integer array `nums`, return the length of its longest harmonious subsequence among all its possible subsequences.

**Constraints:**
- `1 <= nums.length <= 2 * 10^4`
- `-10^9 <= nums[i] <= 10^9`

---

## 2. Approach: Counter — O(n) ✅

```text
FUNCTION findLHS(nums):
    count ← Counter(nums)
    maxLen ← 0
    FOR num IN count:
        IF (num + 1) IN count:
            maxLen ← MAX(maxLen, count[num] + count[num + 1])
    RETURN maxLen
```

---

## 3. Examples

**Example 1:**
```
Input: nums = [1,3,2,2,5,2,3,7]
Output: 5
Explanation: The longest harmonious subsequence is [3,2,2,2,3].
```

**Example 2:**
```
Input: nums = [1,2,3,4]
Output: 2
Explanation: The longest harmonious subsequences are [1,2], [2,3], and [3,4], all of which have a length of 2.
```

**Example 3:**
```
Input: nums = [1,1,1,1]
Output: 0
Explanation: No harmonic subsequence exists.
```

---

## 4. Walkthrough

Consider `nums = [1,3,2,2,5,2,3,7]`.

1. Build frequency map: `{1:1, 2:3, 3:2, 5:1, 7:1}`.
2. Iterate keys:
   - For `1`, check `2` exists → length `1+3 = 4`.
   - For `2`, check `3` exists → length `3+2 = 5` (max).
   - For `3`, check `4` missing.
   - Others have no consecutive partner.
3. Return max length `5`.

---

## 5. Complexity Analysis

- **Time:** O(n) to count and O(m) to iterate distinct values (m ≤ n).
- **Space:** O(m) for the hash map.

---

## 6. Follow-Up Questions

1. How would you modify the solution to return the actual subsequence, not just its length?
2. What if the allowed difference could be any `k` instead of `1`?
3. Can you solve it in O(1) extra space if the input array is sorted?

---

## Key Takeaway

> Use a frequency map to pair each value with its consecutive neighbor and compute combined counts.
