# 1365. How Many Numbers Are Smaller Than the Current Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number](https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs

---

## 1. Problem Description

For each element, count how many other elements in the array are smaller.

## 2. Examples

**Example 1:**
```
Input: nums = [8,1,2,2,3]
Output: [4,0,1,1,3]
Explanation: There are 4 numbers smaller than 8, 0 numbers smaller than 1, and 1 number smaller than each 2 and 3.
```

**Example 2:**
```
Input: nums = [6,5,4,8]
Output: [2,1,0,3]
Explanation: For 6 there are two smaller numbers (5 and 4), for 5 there is one (4), for 4 none, and for 8 three (6,5,4).
```

## 3. Approach: Sort + Rank Map — O(n log n) ✅

```text
FUNCTION smallerNumbersThanCurrent(nums):
    // Sort a copy of the array
    sorted_nums ← SORT(nums)
    // Map each unique number to its first index (count of smaller numbers)
    rank ← {}
    FOR i ← 0 TO LENGTH(sorted_nums) - 1:
        num ← sorted_nums[i]
        IF num NOT IN rank:
            SET rank[num] ← i
    // Build result using the rank map
    result ← []
    FOR num IN nums:
        APPEND rank[num] TO result
    RETURN result
```

## 4. Walkthrough

Consider the first example `[8,1,2,2,3]`.

| Step | sorted_nums | rank map | result building |
|------|-------------|----------|-----------------|
| 1    | [1,2,2,3,8] | {1:0, 2:1, 3:3, 8:4} | – |
| 2    | – | – | Append rank[8] → 4 |
| 3    | – | – | Append rank[1] → 0 |
| 4    | – | – | Append rank[2] → 1 |
| 5    | – | – | Append rank[2] → 1 |
| 6    | – | – | Append rank[3] → 3 |
| Final| – | – | `[4,0,1,1,3]` |

## 5. Complexity Analysis

- **Time:** Sorting takes O(n log n); building the rank map and result are O(n). Overall O(n log n).
- **Space:** Additional arrays for the sorted copy and rank map use O(n) space.

## 6. Follow-Up Questions

- How would you solve the problem in O(n) time using counting sort when the value range is limited?
- Can you modify the approach to handle streaming inputs where the array is not known upfront?
- How would you extend this to return the list of indices of smaller elements instead of just the count?

## Key Takeaway

> Sorting the array and recording the first occurrence index of each unique value gives the count of smaller numbers for every element.
