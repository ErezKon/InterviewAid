# 1441. Build an Array With Stack Operations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/build-an-array-with-stack-operations](https://leetcode.com/problems/build-an-array-with-stack-operations)
**Companies:** Bloomberg, Google, Microsoft

---

```
FUNCTION buildArray(target, n):
    ops = []; curr = 1
    FOR t IN target:
        WHILE curr < t:
            ops.ADD("Push"); ops.ADD("Pop"); curr += 1
        ops.ADD("Push"); curr += 1
    RETURN ops
```
