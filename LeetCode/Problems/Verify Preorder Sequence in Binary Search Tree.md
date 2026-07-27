# 255. Verify Preorder Sequence in Binary Search Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/verify-preorder-sequence-in-binary-search-tree](https://leetcode.com/problems/verify-preorder-sequence-in-binary-search-tree)
**Companies:** Expedia, Salesforce, Tiktok, Zenefits

---

```
FUNCTION verifyPreorder(preorder):
    stack = []
    minVal = -infinity
    FOR val IN preorder:
        IF val < minVal: RETURN false
        WHILE stack AND val > stack[-1]:
            minVal = stack.POP()
        stack.PUSH(val)
    RETURN true
```

Monotonic decreasing stack. When we pop, we set a lower bound (left subtree done).
