# 1550. Three Consecutive Odds

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/three-consecutive-odds](https://leetcode.com/problems/three-consecutive-odds)
**Companies:** Amazon, Bloomberg, Dji, Google, Meta

---

```
FUNCTION threeConsecutiveOdds(arr):
    count = 0
    FOR num IN arr:
        IF num % 2 == 1: count += 1
        ELSE: count = 0
        IF count == 3: RETURN true
    RETURN false
```
