# 593. Valid Square

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/valid-square](https://leetcode.com/problems/valid-square)
**Companies:** Bloomberg, Google, Pure Storage, Tiktok

---

```
FUNCTION validSquare(p1, p2, p3, p4):
    FUNCTION dist(a, b): RETURN (a[0]-b[0])^2 + (a[1]-b[1])^2

    dists = sorted([dist(a, b) for a, b in combinations([p1,p2,p3,p4], 2)])
    // Valid square: 4 equal sides + 2 equal diagonals, all > 0
    RETURN dists[0] > 0 AND dists[0] == dists[3] AND dists[4] == dists[5]
```
