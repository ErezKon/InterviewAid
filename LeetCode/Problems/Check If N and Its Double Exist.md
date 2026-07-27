# 1346. Check If N and Its Double Exist

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-n-and-its-double-exist](https://leetcode.com/problems/check-if-n-and-its-double-exist)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION checkIfExist(arr):
    seen = set()
    FOR num IN arr:
        IF 2 * num IN seen OR (num % 2 == 0 AND num / 2 IN seen):
            RETURN true
        seen.ADD(num)
    RETURN false
```
