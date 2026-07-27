# 1893. Check if All the Integers in a Range Are Covered

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-all-the-integers-in-a-range-are-covered](https://leetcode.com/problems/check-if-all-the-integers-in-a-range-are-covered)
**Companies:** Amazon, Bloomberg, Squarespace

---

```
FUNCTION isCovered(ranges, left, right):
    FOR i ← left TO right:
        IF NOT any(l <= i <= r for l, r in ranges): RETURN false
    RETURN true
```
