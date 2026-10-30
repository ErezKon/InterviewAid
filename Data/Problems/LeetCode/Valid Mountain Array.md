# 941. Valid Mountain Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/valid-mountain-array](https://leetcode.com/problems/valid-mountain-array)
**Companies:** Amazon, Bloomberg, Checkpoint, Google, Ibm, Meta, Microsoft, Tiktok

---

## Problem Description

Given an array of integers `arr`, return *`true` if and only if it is a valid mountain array*.

Recall that arr is a mountain array if and only if:

- `arr.length >= 3`
- There exists some `i` with `0 < i < arr.length - 1` such that:
  - `arr[0] < arr[1] < ... < arr[i - 1] < arr[i]`
  - `arr[i] > arr[i + 1] > ... > arr[arr.length - 1]`

**Constraints:**
- `1 <= arr.length <= 10^4`
- `0 <= arr[i] <= 10^4`

## Examples

**Example 1:**
```
Input: arr = [2,1]
Output: false
```

**Example 2:**
```
Input: arr = [3,5,5]
Output: false
```

**Example 3:**
```
Input: arr = [0,3,2,1]
Output: true
```

## Approach
Perform a single linear scan:
- Walk uphill while the next element is larger.
- Verify that we actually climbed (peak not at start).
- Walk downhill while the next element is smaller.
- Ensure we reached the last element.

```text
FUNCTION IsMountainArray(arr):
    SET n ← LENGTH(arr)
    IF n < 3: RETURN false
    SET i ← 0
    // climb up
    WHILE i + 1 < n AND arr[i] < arr[i + 1]:
        SET i ← i + 1
    // peak can't be first or last
    IF i == 0 OR i == n - 1: RETURN false
    // climb down
    WHILE i + 1 < n AND arr[i] > arr[i + 1]:
        SET i ← i + 1
    RETURN i == n - 1
```

## Walkthrough
| Step | Action |
|------|--------|
| 1 | Check length ≥ 3. |
| 2 | Increment `i` while `arr[i] < arr[i+1]` (uphill). |
| 3 | If `i` is still 0 or reached the end, return false. |
| 4 | Continue incrementing `i` while `arr[i] > arr[i+1]` (downhill). |
| 5 | Return true only if `i` ends at the last index. |

## Complexity Analysis
- **Time:** O(n) – each element visited at most twice.
- **Space:** O(1) – only a few integer variables.

## Follow-Up Questions
1. How would you modify the algorithm to return the index of the peak, or `-1` if not a mountain? |
2. Can you extend the solution to handle multiple mountains in one array and count them? |
3. What changes are needed if equal adjacent values are allowed in the increasing or decreasing phases?

## Key Takeaway
A single pass with two monotonic phases (uphill then downhill) efficiently determines whether an array forms a mountain.
