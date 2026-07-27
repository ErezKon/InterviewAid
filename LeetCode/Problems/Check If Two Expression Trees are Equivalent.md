# 1612. Check If Two Expression Trees are Equivalent

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-two-expression-trees-are-equivalent](https://leetcode.com/problems/check-if-two-expression-trees-are-equivalent)
**Companies:** Google

---

## 1. Problem Description

Given two expression trees (with `+` operators and lowercase variable leaves), check if they represent the same expression (regardless of order due to commutativity of addition).

---

## 2. Approach: Count Variables — O(n) ✅

```
FUNCTION checkEquivalence(root1, root2):
    count1 = countVars(root1)    // frequency map of variables
    count2 = countVars(root2)
    RETURN count1 == count2

FUNCTION countVars(node):
    IF node is leaf: RETURN {node.val: 1}
    left = countVars(node.left)
    right = countVars(node.right)
    RETURN merge(left, right)    // combine frequency maps
```

Since only `+` is used, the expression is just a multiset of variables. Two expressions are equivalent iff they contain the same variables with the same frequencies.

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> With only addition (commutative, associative), expression equivalence reduces to comparing variable frequency multisets. Traverse both trees, count variables, compare.
