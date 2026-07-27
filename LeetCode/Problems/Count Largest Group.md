# 1399. Count Largest Group

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-largest-group](https://leetcode.com/problems/count-largest-group)
**Companies:** Amazon, Bloomberg, Google, Mercari, Meta

---

```
FUNCTION countLargestGroup(n):
    groups = Counter()
    FOR i ← 1 TO n:
        groups[SUM(int(d) for d in str(i))] += 1
    maxSize = MAX(groups.values())
    RETURN SUM(1 for v in groups.values() if v == maxSize)
```
