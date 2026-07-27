# 2515. Shortest Distance to Target String in a Circular Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/shortest-distance-to-target-string-in-a-circular-array](https://leetcode.com/problems/shortest-distance-to-target-string-in-a-circular-array)
**Companies:** Amazon, Bloomberg, Microsoft, Salesforce

---

## Problem Description

Given a circular array of words, find the shortest distance from `startIndex` to any occurrence of `target`.

---

## Approach

```
FUNCTION closetTarget(words, target, startIndex):
    n = len(words)
    minDist = n
    FOR i ← 0 TO n - 1:
        IF words[i] == target:
            minDist = MIN(minDist, MIN(ABS(i - startIndex), n - ABS(i - startIndex)))
    RETURN minDist IF minDist < n ELSE -1
```
