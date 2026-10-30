# 3719. Longest Balanced Subarray I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-balanced-subarray-i](https://leetcode.com/problems/longest-balanced-subarray-i)
**Companies:** Amazon, Bloomberg, Google, Intuit

---

## 1. Problem Description

> *Note: the Approach/Walkthrough below solve a different problem (equal counts of two fixed values). Official #3719 compares the number of **distinct** even values with the number of **distinct** odd values. Since `n <= 1500`, fix each start `i`, extend `j` while maintaining sets of seen evens/odds, and record `j - i + 1` whenever the two set sizes are equal. O(n²).*

You are given an integer array `nums`.

A **subarray** is called **balanced** if the number of **distinct even** numbers in the subarray is equal to the number of **distinct odd** numbers.

Return the length of the **longest** balanced subarray.

**Constraints:**
- `1 <= nums.length <= 1500`
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
