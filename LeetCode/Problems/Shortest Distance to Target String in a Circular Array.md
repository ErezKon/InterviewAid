# 2515. Shortest Distance to Target String in a Circular Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/shortest-distance-to-target-string-in-a-circular-array](https://leetcode.com/problems/shortest-distance-to-target-string-in-a-circular-array)
**Companies:** Amazon, Bloomberg, Microsoft, Salesforce

---

## Problem Description

Given an array `words` of strings that forms a circle (the element after the last is the first), a `target` string, and a starting index `startIndex`, return the minimum number of steps required to reach any occurrence of `target` from `startIndex`. Steps can move forward or backward, wrapping around the circle.

---

## Approach

```text
FUNCTION shortestDistanceCircular(words, target, startIndex):
    n ← len(words)
    minDist ← n
    FOR i ← 0 TO n-1:
        IF words[i] == target:
            // distance forward or backward around the circle
            dist ← MIN(ABS(i - startIndex), n - ABS(i - startIndex))
            minDist ← MIN(minDist, dist)
    RETURN minDist IF minDist < n ELSE -1
```

---

## Examples

| words | target | startIndex | output |
|-------|--------|------------|--------|
| ["a","b","c","d"] | "c" | 1 | 2 |
| ["hello","world","hello"] | "world" | 2 | 1 |
| ["x","y","z"] | "a" | 0 | -1 |

---

## Walkthrough

1. Iterate over every position `i` in `words`.
2. When `words[i]` matches `target`, compute the circular distance: the smaller of moving forward (`ABS(i‑startIndex)`) or backward (`n‑ABS(i‑startIndex)`).
3. Keep the smallest distance seen.
4. If no occurrence is found, return `-1`.

---

## Complexity Analysis

- **Time:** O(n) – a single pass over the array.
- **Space:** O(1) – only a few scalar variables.

---

## Key Takeaway

> A linear scan combined with circular distance calculation yields the shortest steps to the target in a circular array.
