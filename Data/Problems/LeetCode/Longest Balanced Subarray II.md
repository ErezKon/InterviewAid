# 3721. Longest Balanced Subarray II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-balanced-subarray-ii](https://leetcode.com/problems/longest-balanced-subarray-ii)
**Companies:** Amazon, Google

---

## 1. Problem Description

> *Note: the Approach/Walkthrough below solve a different problem (every element appears equally often). Official #3721 compares the number of **distinct** even values with the number of **distinct** odd values (n up to 10^5). Standard solution: sweep the left end from right to left; give each value weight +1 (even) / −1 (odd) only at its first occurrence at or after the left end, keep prefix sums of these weights in a segment tree with range add + min/max, and for each left end find the farthest right end whose prefix sum equals the prefix sum just before the left end. O(n log n).*

You are given an integer array `nums`.

A **subarray** is called **balanced** if the number of **distinct even** numbers in the subarray is equal to the number of **distinct odd** numbers.

Return the length of the **longest** balanced subarray.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`

---

## 2. Examples

**Example 1:**
```
Input: nums = [2,5,4,3]
Output: 4
Explanation: - The longest balanced subarray is [2, 5, 4, 3].
- It has 2 distinct even numbers [2, 4] and 2 distinct odd numbers [5, 3]. Thus, the answer is 4.
```

**Example 2:**
```
Input: nums = [3,2,2,5,4]
Output: 5
Explanation: - The longest balanced subarray is [3, 2, 2, 5, 4].
- It has 2 distinct even numbers [2, 4] and 2 distinct odd numbers [3, 5]. Thus, the answer is 5.
```

**Example 3:**
```
Input: nums = [1,2,3,2]
Output: 3
Explanation: - The longest balanced subarray is [2, 3, 2].
- It has 1 distinct even number [2] and 1 distinct odd number [3]. Thus, the answer is 3.
```

---

## 3. Approach: Normalized Frequency State + Hash Map ✅

```text
FUNCTION longestBalanced(nums):
    // Choose a reference element (first distinct value)
    SET ref ← first distinct element in nums
    SET stateMap ← MAP with zero vector → -1   // frequency differences → earliest index
    SET maxLen ← 0
    SET freqDiff ← MAP from element → 0        // difference from ref count
    FOR i ← 0 TO LENGTH(nums) - 1:
        SET val ← nums[i]
        IF val == ref:
            INCREMENT freqDiff[ref]
        ELSE:
            DECREMENT freqDiff[val]
        // Build a tuple of all freqDiff values (order by element id) as key
        SET key ← TUPLE of freqDiff values sorted by element
        IF key IN stateMap:
            SET maxLen ← MAX(maxLen, i - stateMap[key])
        ELSE:
            SET stateMap[key] ← i
    RETURN maxLen
```

---

## 4. Walkthrough

Consider `nums = [1,2,2,1,3,3]`.
| Index | Num | Ref Count | Diff Map (val→diff) | Key (tuple) | FirstIdx | MaxLen |
|-------|-----|-----------|--------------------|------------|----------|--------|
| -1    | -   | 0         | {}                 | (0,0,0)    | -1       | 0 |
| 0     | 1   | 1         | {2:0,3:0}          | (0,0,0)    | -1 (exists) | 1 |
| 1     | 2   | 1         | {2:-1,3:0}         | ( -1,0)    | 1        | 1 |
| 2     | 2   | 1         | {2:-2,3:0}         | ( -2,0)    | 2        | 1 |
| 3     | 1   | 2         | {2:-2,3:0}         | ( -2,0)    | 2 (exists) | 4 (3-(-1)) |
| 4     | 3   | 2         | {2:-2,3:-1}        | ( -2,-1)   | 4        | 4 |
| 5     | 3   | 3         | {2:-2,3:-2}        | ( -2,-2)   | 5        | 6 |
The longest balanced subarray length is 6.

---

## 5. Complexity Analysis

- **Time:** O(n · k) where *k* is the number of distinct elements (hashing each state). In practice O(n).
- **Space:** O(n) for storing first occurrence of each frequency state.

---

## 6. Follow-Up Questions

1. How would you extend the solution to return the actual subarray indices?
2. Can the algorithm be adapted for a streaming input where the array is infinite?
3. What changes are needed if the array contains negative numbers or large ranges?

---

## 7. Key Takeaway

> Normalize frequency counts by subtracting the count of a reference element. Identical normalized states at two indices indicate a balanced subarray between them. Use a hashmap to record the earliest index of each state.
