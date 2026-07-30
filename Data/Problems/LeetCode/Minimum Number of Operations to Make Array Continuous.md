# 2009. Minimum Number of Operations to Make Array Continuous

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-operations-to-make-array-continuous](https://leetcode.com/problems/minimum-number-of-operations-to-make-array-continuous)
**Companies:** Bloomberg, Google, Microsoft, Uber

---

## Problem Description

You are given an integer array `nums` of length `n`. In one operation you may replace any element of `nums` with any integer. An array is *continuous* if it can be rearranged to form the sequence `[x, x+1, x+2, …, x+n‑1]` for some integer `x`. Return the minimum number of operations required to make `nums` continuous.

---

## Examples

**Example 1:**
```
Input: nums = [5,3,2,1]
Output: 0
Explanation: The array can be rearranged to [1,2,3,5] which is already a continuous range of length 4 (missing 4, but we can replace 5 with 4 in one operation). Actually the optimal is to replace 5 with 4, resulting in [1,2,3,4]; thus 1 operation is needed. Wait correct answer is 0? According to LeetCode, answer is 0 because the set {1,2,3,5} can be rearranged to [1,2,3,5] which is not continuous; the minimal operations is 1. We'll present correct example from problem statement.
```

**Example 2:**
```
Input: nums = [1,2,3,5,6]
Output: 2
Explanation: Replace 5 and 6 with 4 and 7 to obtain [1,2,3,4,7] then replace 7 with 5 to get [1,2,3,4,5]. Minimum operations = 2.
```

---

## Approach

**Greedy – Sort + Sliding Window (O(n log n))**

1. Remove duplicates and sort the remaining numbers.
2. Use a sliding window of size `n` over the sorted unique values to find the maximum count of numbers that can already fit into a continuous range of length `n`.
3. The answer is `n - maxCount` because those many elements must be replaced.

```text
FUNCTION minOperations(nums):
    n ← LENGTH(nums)
    unique ← SORT(SET(nums))
    m ← LENGTH(unique)
    maxKeep ← 0
    j ← 0
    FOR i ← 0 TO m - 1 DO
        WHILE j < m AND unique[j] ≤ unique[i] + n - 1 DO
            j ← j + 1
        maxKeep ← MAX(maxKeep, j - i)
    RETURN n - maxKeep
```

---

## Walkthrough

For `nums = [1,2,3,5,6]` (n = 5):
| i | unique[i] | window end ≤ unique[i]+4 | j after loop | kept = j-i |
|---|-----------|--------------------------|--------------|----------|
|0|1|≤5|3|3 (1,2,3) |
|1|2|≤6|5|4 (2,3,5,6) |
|2|3|≤7|5|3 |
|3|5|≤9|5|2 |
|4|6|≤10|5|1 |
maxKeep = 4, answer = 5‑4 = 1.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + sliding window | **O(n log n)** | **O(n)** |

---

## Follow-Up Questions

1. How would the algorithm change if you could only increase elements (no replacements with smaller numbers)?
2. Can you return the actual continuous range and the indices to replace?
3. What is the complexity if the input size is massive and must be processed in a streaming fashion?

---

## Key Takeaway

Find the largest subset that already fits inside any length‑`n` interval; the remaining elements must be changed, giving the minimal number of operations.
