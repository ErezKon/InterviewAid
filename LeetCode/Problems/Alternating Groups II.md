# 3208. Alternating Groups II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/alternating-groups-ii](https://leetcode.com/problems/alternating-groups-ii)
**Companies:** Bloomberg, Google, Microsoft, Samsara

---

```
FUNCTION numberOfAlternatingGroups(colors, k):
    n = len(colors); count = 0; run = 1
    FOR i ← 1 TO n + k - 2:
        IF colors[i % n] != colors[(i-1) % n]: run += 1
        ELSE: run = 1
        IF run >= k: count += 1
    RETURN count
```
