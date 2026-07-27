# 1101. The Earliest Moment When Everyone Become Friends

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-earliest-moment-when-everyone-become-friends](https://leetcode.com/problems/the-earliest-moment-when-everyone-become-friends)
**Companies:** Expedia, Google, Uber

---

```
FUNCTION earliestAcq(logs, n):
    SORT logs by timestamp
    uf = UnionFind(n)
    FOR [t, a, b] IN logs:
        uf.union(a, b)
        IF uf.components == 1: RETURN t
    RETURN -1
```
