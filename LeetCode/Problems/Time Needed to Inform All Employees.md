# 1376. Time Needed to Inform All Employees

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/time-needed-to-inform-all-employees](https://leetcode.com/problems/time-needed-to-inform-all-employees)
**Companies:** Amazon, Google, Infosys, Medianet, Microsoft

---

```
FUNCTION numOfMinutes(n, headID, manager, informTime):
    children = defaultdict(list)
    FOR i, m IN enumerate(manager):
        IF m != -1: children[m].ADD(i)

    FUNCTION dfs(node):
        RETURN informTime[node] + MAX((dfs(c) for c in children[node]), default=0)

    RETURN dfs(headID)
```
