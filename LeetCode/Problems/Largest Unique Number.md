# 1133. Largest Unique Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/largest-unique-number](https://leetcode.com/problems/largest-unique-number)
**Companies:** Amazon

---

## 1. Problem Description

Return the largest integer that appears exactly once in `nums`. Return -1 if none.

---

## 2. Approach: Counter — O(n) ✅

```
FUNCTION largestUniqueNumber(nums):
    count = Counter(nums)
    result = -1
    FOR num, c IN count.items():
        IF c == 1: result = MAX(result, num)
    RETURN result
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> Count frequencies, then find the max element with count == 1.
