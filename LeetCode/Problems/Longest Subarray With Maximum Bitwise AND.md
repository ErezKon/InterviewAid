# 2419. Longest Subarray With Maximum Bitwise AND

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-subarray-with-maximum-bitwise-and](https://leetcode.com/problems/longest-subarray-with-maximum-bitwise-and)
**Companies:** Amazon, Bloomberg, Fourkites, Google, Meta, Microsoft

---

## 1. Problem Description

Find the longest subarray whose bitwise AND equals the maximum possible AND of any subarray.

---

## 2. Examples

**Example 1:**
```
Input: nums = [1,2,3,4]
Output: 1
Explanation: The maximum AND value is 4 (subarray [4]), and its longest run length is 1.
```

**Example 2:**
```
Input: nums = [7,7,7,5]
Output: 3
Explanation: The maximum AND is 7. The longest consecutive run of 7s has length 3.
```

---

## 3. Approach: Find Max + Longest Run — O(n) ✅

```text
FUNCTION longestSubarray(nums):
    maxVal ← MAXIMUM(nums)
    maxLen ← 0
    currLen ← 0
    FOR num IN nums:
        IF num == maxVal:
            currLen ← currLen + 1
            maxLen ← MAX(maxLen, currLen)
        ELSE:
            currLen ← 0
    RETURN maxLen
```

---

## 4. Walkthrough

Consider `nums = [7,7,7,5]`:
| Index | Value | currLen | maxLen |
|-------|-------|---------|--------|
| 0 | 7 | 1 | 1 |
| 1 | 7 | 2 | 2 |
| 2 | 7 | 3 | 3 |
| 3 | 5 | 0 | 3 |
The algorithm tracks the length of the current run of the maximum value, yielding a final answer of 3.

---

## 5. Complexity Analysis

- **Time Complexity:** O(n) – single pass through the array.
- **Space Complexity:** O(1) – only a few integer variables are used.

---

## 6. Follow-Up Questions

- How would the solution change if you needed the subarray with the second‑largest possible AND?
- Can you extend the approach to handle queries for the longest subarray achieving a given AND value?

---

## 7. Key Takeaway

> The maximum AND of any subarray is simply the maximum element; the problem reduces to finding the longest consecutive run of that element.
