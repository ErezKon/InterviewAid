# 1550. Three Consecutive Odds

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/three-consecutive-odds](https://leetcode.com/problems/three-consecutive-odds)
**Companies:** Amazon, Bloomberg, Dji, Google, Meta

---

## Problem Description
Given an integer array `arr`, return `true` if there exist three **consecutive** elements that are all odd numbers. Otherwise, return `false`. The array length is between 1 and 1000, and each element fits in a 32‑bit signed integer.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `[1,2,3,5,7]` | `true` | The sub‑array `[3,5,7]` consists of three consecutive odd numbers. |
| `[2,4,6,8]` | `false` | No odd numbers at all. |
| `[1,3,5,7]` | `true` | The first three elements are odd.

## Approach
**Sliding Window (size = 3)** – Scan the array while maintaining a count of consecutive odd numbers. When the count reaches three, the condition is satisfied.

```text
FUNCTION threeConsecutiveOdds(arr):
    SET count ← 0
    FOR num IN arr:
        IF num MOD 2 = 1:
            SET count ← count + 1
        ELSE:
            SET count ← 0
        IF count = 3:
            RETURN true
    RETURN false
```

## Walkthrough
Consider `arr = [2, 1, 3, 5, 4]`:
| Index | num | count after step |
|-------|-----|-------------------|
| 0 | 2 (even) | 0 |
| 1 | 1 (odd) | 1 |
| 2 | 3 (odd) | 2 |
| 3 | 5 (odd) | 3 → return `true` |

The algorithm stops as soon as three odds appear consecutively.

## Complexity Analysis
- **Time:** O(n) – each element is examined once.
- **Space:** O(1) – only a constant‑size counter is used.

## Follow‑Up Questions
1. How would you modify the solution to return the starting index of the first qualifying sub‑array?
2. What if the required length of consecutive odds is a variable `k`?
3. Can this be extended to handle streams of numbers with limited memory?

## Key Takeaway
A simple sliding‑window counter efficiently detects three consecutive odd numbers in linear time with O(1) extra space.