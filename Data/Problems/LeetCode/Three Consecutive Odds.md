# 1550. Three Consecutive Odds

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/three-consecutive-odds](https://leetcode.com/problems/three-consecutive-odds)
**Companies:** Amazon, Bloomberg, Dji, Google, Meta

---

## Problem Description
Given an integer array `arr`, return `true` if there are three consecutive odd numbers in the array. Otherwise, return `false`.

**Constraints:**
- `1 <= arr.length <= 1000`
- `1 <= arr[i] <= 1000`

## Examples
```
Example 1:
  Input: arr = [2,6,4,1]
  Output: false
  Explanation: There are no three consecutive odds.
```
```
Example 2:
  Input: arr = [1,2,34,3,4,5,7,23,12]
  Output: true
  Explanation: [5,7,23] are three consecutive odds.
```

## Approach
**Sliding Window (size = 3)** – Scan the array while maintaining a count of consecutive odd numbers. When the count reaches three, the condition is satisfied.

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
Example 2: `arr = [1,2,34,3,4,5,7,23,12]`:

| Index | num | count after step |
|-------|-----|-------------------|
| 0 | 1 (odd) | 1 |
| 1 | 2 (even) | 0 |
| 2 | 34 (even) | 0 |
| 3 | 3 (odd) | 1 |
| 4 | 4 (even) | 0 |
| 5 | 5 (odd) | 1 |
| 6 | 7 (odd) | 2 |
| 7 | 23 (odd) | 3 → return `true` |

**Output: true** (the window `[5,7,23]`). In Example 1 (`[2,6,4,1]`) the count never exceeds 1, so the result is `false`.

## Complexity Analysis
- **Time:** O(n) – each element is examined once.
- **Space:** O(1) – only a constant-size counter is used.

## Follow-Up Questions
1. How would you modify the solution to return the starting index of the first qualifying sub-array?
2. What if the required length of consecutive odds is a variable `k`?
3. Can this be extended to handle streams of numbers with limited memory?

## Key Takeaway
A simple sliding-window counter efficiently detects three consecutive odd numbers in linear time with O(1) extra space.