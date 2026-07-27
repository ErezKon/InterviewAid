# 894. All Possible Full Binary Trees

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/all-possible-full-binary-trees](https://leetcode.com/problems/all-possible-full-binary-trees)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Nvidia, Salesforce

---

```
FUNCTION allPossibleFBT(n):
    IF n % 2 == 0: RETURN []
    IF n == 1: RETURN [TreeNode(0)]

    result = []
    FOR leftCount ← 1 TO n - 2 STEP 2:
        leftTrees = allPossibleFBT(leftCount)
        rightTrees = allPossibleFBT(n - 1 - leftCount)
        FOR l IN leftTrees:
            FOR r IN rightTrees:
                root = TreeNode(0, l, r)
                result.ADD(root)

    RETURN result
```

Full binary tree: every node has 0 or 2 children. Only odd n is valid. Memoize for efficiency.
