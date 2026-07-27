# 749. Contain Virus

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/contain-virus](https://leetcode.com/problems/contain-virus)
**Companies:** Bloomberg, Flipkart, Google

---

```
// Simulation:
// 1. Find all infected regions via BFS/DFS
// 2. Find region that would spread to most new cells
// 3. Wall it off (count walls needed)
// 4. All other regions spread
// 5. Repeat until no more spreading
```
