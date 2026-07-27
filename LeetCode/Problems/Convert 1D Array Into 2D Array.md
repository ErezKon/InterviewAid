# 2022. Convert 1D Array Into 2D Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/convert-1d-array-into-2d-array](https://leetcode.com/problems/convert-1d-array-into-2d-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION construct2DArray(original, m, n):
    IF m * n != len(original): RETURN []
    RETURN [original[i*n:(i+1)*n] for i in range(m)]
```
