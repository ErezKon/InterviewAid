# 756. Pyramid Transition Matrix

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/pyramid-transition-matrix](https://leetcode.com/problems/pyramid-transition-matrix)
**Companies:** Airbnb, Amazon, Google

---

```
FUNCTION pyramidTransition(bottom, allowed):
    mapping = defaultdict(list)
    FOR triple IN allowed: mapping[triple[:2]].ADD(triple[2])

    FUNCTION dfs(row, nextRow, idx):
        IF len(row) == 1: RETURN true
        IF idx == len(row) - 1: RETURN dfs(nextRow, "", 0)
        pair = row[idx:idx+2]
        FOR c IN mapping[pair]:
            IF dfs(row, nextRow + c, idx + 1): RETURN true
        RETURN false

    RETURN dfs(bottom, "", 0)
```
