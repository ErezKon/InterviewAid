# 2078. Two Furthest Houses With Different Colors

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/two-furthest-houses-with-different-colors](https://leetcode.com/problems/two-furthest-houses-with-different-colors)
**Companies:** Amazon, Bloomberg, Google, Meta, Visa

---

```
FUNCTION maxDistance(colors):
    n = len(colors)
    d1 = n - 1
    WHILE colors[0] == colors[d1]: d1 -= 1
    d2 = n - 1
    WHILE colors[n-1] == colors[n-1-d2+n-1]: d2 -= 1
    // Simpler: check from both ends
    result = 0
    FOR i ← 0 TO n - 1:
        IF colors[i] != colors[0]: result = MAX(result, i)
        IF colors[i] != colors[-1]: result = MAX(result, n - 1 - i)
    RETURN result
```
