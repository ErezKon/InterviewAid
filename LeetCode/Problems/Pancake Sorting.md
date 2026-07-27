# 969. Pancake Sorting

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/pancake-sorting](https://leetcode.com/problems/pancake-sorting)
**Companies:** Darwinbox, Microsoft, Oracle, Square

---

```
FUNCTION pancakeSort(arr):
    result = []
    FOR size ← len(arr) DOWN TO 1:
        idx = arr.index(size)
        IF idx == size - 1: CONTINUE
        IF idx != 0:
            result.ADD(idx + 1)
            arr[:idx+1] = reversed(arr[:idx+1])
        result.ADD(size)
        arr[:size] = reversed(arr[:size])
    RETURN result
```

Find max, flip to front, then flip to correct position.
