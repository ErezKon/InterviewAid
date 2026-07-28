# 3719. Longest Balanced Subarray I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-balanced-subarray-i](https://leetcode.com/problems/longest-balanced-subarray-i)
**Companies:** Amazon, Bloomberg, Google, Intuit

---

## 1. Problem Description

Find the longest subarray with equal count of two distinct elements.

---

## 2. Examples

**Example 1:**
```
Input: nums = [1,2,1,2,1,2]
Output: 6
Explanation: The whole array has three 1's and three 2's.
```

**Example 2:**
```
Input: nums = [1,1,2,2,2,1]
Output: 4
Explanation: The subarray from index 2 to 5 (0‑based) is [2,2,2,1] which has two 1's and two 2's after removing the leading 1.
```

---

## 3. Approach: Balance Hash Map — O(n) ✅

```text
FUNCTION longestBalanced(nums):
    // Choose the two distinct values that appear in the array
    SET val1, val2 ← the two distinct elements
    SET balance ← 0
    SET first ← MAP with 0 → -1   // balance → earliest index
    SET maxLen ← 0
    FOR i ← 0 TO LENGTH(nums) - 1:
        IF nums[i] == val1:
            SET balance ← balance + 1
        ELSE:
            SET balance ← balance - 1
        IF balance IN first:
            SET maxLen ← MAX(maxLen, i - first[balance])
        ELSE:
            SET first[balance] ← i
    RETURN maxLen
```

---

## 4. Walkthrough

| Index | Num | Balance | First[Balance] | MaxLen |
|-------|-----|---------|----------------|--------|
| -1    | -   | 0       | -1             | 0 |
| 0     | 1   | 1       | 0 (store)      | 0 |
| 1     | 2   | 0       | -1 (exists)    | 2 (1-(-1)) |
| 2     | 1   | 1       | 0 (exists)     | 2 (2-0) |
| 3     | 2   | 0       | -1 (exists)    | 4 (3-(-1)) |
| 4     | 1   | 1       | 0 (exists)     | 4 (4-0) |
| 5     | 2   | 0       | -1 (exists)    | 6 (5-(-1)) |

The final `maxLen` is 6, the length of the whole array.

---

## 5. Complexity Analysis

- **Time:** O(n) – single pass through the array.
- **Space:** O(n) – hashmap stores at most one entry per distinct balance value.

---

## 6. Follow-Up Questions

1. How would you handle more than two distinct elements and require equal counts of all of them?
2. Can the solution be adapted to return the actual subarray indices?
3. What changes are needed if the array is a stream of numbers?

---

## 7. Key Takeaway

> Map one value to +1 and another to -1. Track running balance. Same balance at two indices → equal counts between them. Store first occurrence of each balance.
