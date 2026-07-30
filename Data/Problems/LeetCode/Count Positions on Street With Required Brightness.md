# 2237. Count Positions on Street With Required Brightness

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-positions-on-street-with-required-brightness](https://leetcode.com/problems/count-positions-on-street-with-required-brightness)
**Companies:** Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given `n` positions on a street (0 to n-1), a list of lights (each at position `p` with range `r`, illuminating `[p-r, p+r]`), and a `requirement` array where `requirement[i]` is the minimum brightness needed at position `i`, count how many positions meet their brightness requirement.

Each light contributes 1 brightness unit to every position in its range.

**Constraints:**
- `1 <= n <= 10^5`
- `0 <= lights.length <= 10^5`

---

## Examples

**Example 1:**
- **Input:** `n = 5, lights = [[0,1],[2,1],[3,2]], requirement = [0,2,1,4,1]`
- **Output:** `4`

---

## Key Insight

Use a **difference array** (sweep line) to compute the brightness at each position in O(n + m) instead of O(n × m).

---

## Approach

```
FUNCTION countBrightPositions(n, lights, requirement):
    diff = [0] * (n + 1)

    FOR (pos, range) IN lights DO
        left = MAX(0, pos - range)
        right = MIN(n - 1, pos + range)
        diff[left] += 1
        IF right + 1 < n: diff[right + 1] -= 1

    // Build prefix sum for actual brightness
    brightness = 0
    count = 0
    FOR i ← 0 TO n - 1 DO
        brightness += diff[i]
        IF brightness >= requirement[i]: count += 1

    RETURN count
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n + m) where m = number of lights |
| **Space** | O(n) for difference array |

---

## Key Takeaway

> **Range increment operations followed by point queries are the classic use case for a difference array. Increment at `left`, decrement at `right+1`, then prefix-sum to get actual values in O(n).**
