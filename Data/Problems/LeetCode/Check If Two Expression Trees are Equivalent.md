# 1612. Check If Two Expression Trees are Equivalent

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-two-expression-trees-are-equivalent](https://leetcode.com/problems/check-if-two-expression-trees-are-equivalent)
**Companies:** Google

---

## 1. Problem Description

A **[binary expression tree](https://en.wikipedia.org/wiki/Binary_expression_tree)** is a kind of binary tree used to represent arithmetic expressions. Each node of a binary expression tree has either zero or two children. Leaf nodes (nodes with 0 children) correspond to operands (variables), and internal nodes (nodes with two children) correspond to the operators. In this problem, we only consider the `'+'` operator (i.e. addition).

You are given the roots of two binary expression trees, `root1` and `root2`. Return `true` *if the two binary expression trees are equivalent*. Otherwise, return `false`.

Two binary expression trees are equivalent if they **evaluate to the same value** regardless of what the variables are set to.

**Constraints:**
- The number of nodes in both trees are equal, odd and, in the range `[1, 4999]`.
- `Node.val` is `'+'` or a lower-case English letter.
- It's **guaranteed** that the tree given is a valid binary expression tree.

**Follow up:** What will you change in your solution if the tree also supports the `'-'` operator (i.e. subtraction)?

---

## 2. Examples

```
Example 1:
  Input: root1 = [x], root2 = [x]
  Output: true
```

```
Example 2:
  Input: root1 = [+,a,+,null,null,b,c], root2 = [+,+,a,b,c]
  Output: true
  Explanation: a + (b + c) == (b + c) + a
```

```
Example 3:
  Input: root1 = [+,a,+,null,null,b,c], root2 = [+,+,a,b,d]
  Output: false
  Explanation: a + (b + c) != (b + d) + a
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

Consider the trees from Example 2:

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
