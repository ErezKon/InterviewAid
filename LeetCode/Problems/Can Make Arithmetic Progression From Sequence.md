# 1502. Can Make Arithmetic Progression From Sequence

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/can-make-arithmetic-progression-from-sequence](https://leetcode.com/problems/can-make-arithmetic-progression-from-sequence)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION canMakeArithmeticProgression(arr):
    SORT arr
    diff = arr[1] - arr[0]
    FOR i ← 2 TO len(arr) - 1:
        IF arr[i] - arr[i-1] != diff: RETURN false
    RETURN true
```
