# 881. Boats to Save People

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/boats-to-save-people](https://leetcode.com/problems/boats-to-save-people)
**Companies:** Amazon, Atlassian, Bloomberg, Flipkart, Google, Ibm, Meta, Microsoft, Sigmoid, Snowflake, Uipath

---

## Problem Description

You are given an array `people` where `people[i]` is the weight of the `i^th` person, and an **infinite number of boats** where each boat can carry a maximum weight of `limit`. Each boat carries at most two people at the same time, provided the sum of the weight of those people is at most `limit`.

Return *the minimum number of boats to carry every given person*.

**Constraints:**
- `1 <= people.length <= 5 * 10^4`
- `1 <= people[i] <= limit <= 3 * 10^4`

## Examples

**Example 1:**
```
Input: people = [1,2], limit = 3
Output: 1
Explanation: 1 boat (1, 2)
```

**Example 2:**
```
Input: people = [3,2,2,1], limit = 3
Output: 3
Explanation: 3 boats (1, 2), (2) and (3)
```

**Example 3:**
```
Input: people = [3,5,3,4], limit = 5
Output: 4
Explanation: 4 boats (3), (3), (4), (5)
```

## Approach
**Sort + Two Pointers** – Sort the weights, then use a light pointer (`lo`) at the start and a heavy pointer (`hi`) at the end. If the lightest and heaviest can share a boat, move `lo` forward; always move `hi` backward because the heaviest person is placed. Increment the boat count each iteration.

```text
FUNCTION numRescueBoats(people, limit):
    SORT people
    SET lo ← 0
    SET hi ← LENGTH OF people - 1
    SET boats ← 0
    WHILE lo ≤ hi:
        IF people[lo] + people[hi] ≤ limit:
            SET lo ← lo + 1
        SET hi ← hi - 1
        SET boats ← boats + 1
    RETURN boats
```

## Walkthrough
| Step | lo (weight) | hi (weight) | Action | boats |
|------|-------------|-------------|--------|-------|
| 1 | 1 | 3 | 1+3 > 3 → boat for 3 alone | 1 |
| 2 | 1 | 2 | 1+2 ≤ 3 → pair, move lo | 2 |
| 3 | – | 2 | remaining 2 → boat | 3 |

## Complexity Analysis
- **Time:** O(n log n) for sorting, then O(n) for the two-pointer scan.
- **Space:** O(1) extra beyond the input array (in-place sort).

## Follow-Up Questions
1. How would you modify the algorithm if a boat could carry up to three people?
2. Can you solve the problem without sorting, using a counting sort for bounded weight ranges?
3. What if each boat had a different weight limit?

## Key Takeaway
Sorting the weights and greedily pairing the lightest with the heaviest yields an optimal O(n log n) solution for minimizing boats.
