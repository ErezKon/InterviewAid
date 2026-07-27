# 1552. Magnetic Force Between Two Balls

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/magnetic-force-between-two-balls](https://leetcode.com/problems/magnetic-force-between-two-balls)
**Companies:** Amazon, Apple, Flipkart, Goldman Sachs, Google, Meta, Microsoft, Roblox, Salesforce, Uber

---

## 1. Problem Description

Place `m` balls in baskets at given positions to maximize the minimum distance between any two balls.

---

## 2. Approach: Binary Search on Answer — O(n log D) ✅

Binary search on the minimum distance. Same pattern as aggressive cows.

```
FUNCTION maxDistance(position, m):
    SORT position
    lo, hi = 1, position[-1] - position[0]

    WHILE lo <= hi:
        mid = (lo + hi) / 2
        IF canPlace(position, m, mid):
            lo = mid + 1
        ELSE:
            hi = mid - 1

    RETURN hi

FUNCTION canPlace(position, m, minDist):
    count = 1
    lastPos = position[0]
    FOR pos IN position[1:]:
        IF pos - lastPos >= minDist:
            count += 1
            lastPos = pos
    RETURN count >= m
```

| Time | Space |
|------|-------|
| O(n log D) | O(1) extra |

---

## 3. Key Takeaway

> "Maximize the minimum" → binary search on the answer. Greedy check: place balls left to right, skipping positions too close. Classic binary search on answer pattern.
