# 1769. Minimum Number of Operations to Move All Balls to Each Box

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-operations-to-move-all-balls-to-each-box](https://leetcode.com/problems/minimum-number-of-operations-to-move-all-balls-to-each-box)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tiktok

---

```
FUNCTION minOperations(boxes):
    n = len(boxes)
    result = [0] * n

    // Left to right pass
    balls = 0; ops = 0
    FOR i ← 0 TO n - 1:
        result[i] += ops
        balls += int(boxes[i])
        ops += balls

    // Right to left pass
    balls = 0; ops = 0
    FOR i ← n - 1 DOWN TO 0:
        result[i] += ops
        balls += int(boxes[i])
        ops += balls

    RETURN result
```

Two-pass: accumulate ball count and operations from each direction. O(n).
