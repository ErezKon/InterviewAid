# 885. Spiral Matrix III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/spiral-matrix-iii](https://leetcode.com/problems/spiral-matrix-iii)
**Companies:** Amazon, Apple, Bloomberg, Dataminr, Google, Meta, Microsoft, Uber

---

```
FUNCTION spiralMatrixIII(rows, cols, rStart, cStart):
    result = [[rStart, cStart]]
    directions = [(0,1),(1,0),(0,-1),(-1,0)]    // right, down, left, up
    steps = 1
    d = 0
    r, c = rStart, cStart

    WHILE len(result) < rows * cols:
        FOR _ ← 0 TO 1:    // each step count used twice
            FOR _ ← 0 TO steps - 1:
                r += directions[d][0]
                c += directions[d][1]
                IF 0 <= r < rows AND 0 <= c < cols:
                    result.ADD([r, c])
            d = (d + 1) % 4
        steps += 1

    RETURN result
```

Spiral outward: go right 1, down 1, left 2, up 2, right 3, down 3... Steps increase by 1 every two direction changes.
