# 1612. Check If Two Expression Trees are Equivalent

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-two-expression-trees-are-equivalent](https://leetcode.com/problems/check-if-two-expression-trees-are-equivalent)
**Companies:** Google

---

## 1. Problem Description

Given two expression trees (with `+` operators and lowercase variable leaves), check if they represent the same expression (regardless of order due to commutativity of addition).

---

## 2. Examples

**Example 1:**
```
Input: root1 = [+, a, b], root2 = [+, b, a]
Output: true
Explanation: Both trees represent the expression a + b.
```

**Example 2:**
```
Input: root1 = [+, a, [+, b, c]], root2 = [+, a, b, c]
Output: true
Explanation: Addition is associative, so a + (b + c) equals a + b + c.
```

---

## 3. Approach: Count Variables — O(n) ✅

```text
FUNCTION checkEquivalence(root1, root2):
    // Build frequency maps for both trees
    count1 = countVars(root1)
    count2 = countVars(root2)
    RETURN count1 == count2

FUNCTION countVars(node):
    IF node is leaf:
        RETURN {node.val: 1}
    leftMap = countVars(node.left)
    rightMap = countVars(node.right)
    RETURN merge(leftMap, rightMap)  // combine frequency maps
```

Since only `+` is used, the expression is just a multiset of variables. Two expressions are equivalent iff they contain the same variables with the same frequencies.

---

## 4. Walkthrough

Consider the trees from Example 2:

1. **Traverse root1** (`[+, a, [+, b, c]]`):
   - Visit leaf `a` → `{a:1}`
   - Recurse into right subtree `[+, b, c]` → `{b:1, c:1}`
   - Merge → `{a:1, b:1, c:1}`
2. **Traverse root2** (`[+, a, b, c]`):
   - Leaves `a`, `b`, `c` → `{a:1, b:1, c:1}`
3. Compare the two maps – they are identical, so return `true`.

---

## 5. Complexity Analysis

| Metric | Complexity |
|--------|------------|
| Time   | O(n) – each node visited once |
| Space  | O(k) – map of distinct variables (k ≤ n) |

---

## 6. Follow-Up Questions

* How would you handle other operators (e.g., `*`, `-`) that are not commutative?
* Can you extend the solution to support parentheses and operator precedence?
* What if the trees are very large – can you reduce space usage?

---

## Key Takeaway

> With only addition (commutative, associative), expression equivalence reduces to comparing variable frequency multisets. Traverse both trees, count variables, compare.
