# 572. Subtree of Another Tree

**Difficulty:** 🟢 Easy
**Acceptance:** 48.0%
**LeetCode:** [https://leetcode.com/problems/subtree-of-another-tree](https://leetcode.com/problems/subtree-of-another-tree)
**Companies:** Amazon, Bloomberg, Compass, Ebay, Google, Jump Trading, Meta, Microsoft

---

## 1. Problem Description

Given the roots of two binary trees `root` and `subRoot`, determine whether `subRoot` is a subtree of `root`. A subtree matches if both structure and node values are identical.

---

## 2. Approach: Recursive Tree Comparison — O(m·n) ✅

```text
FUNCTION isSubtree(root, subRoot):
    IF root == null: RETURN false
    IF isSame(root, subRoot): RETURN true
    RETURN isSubtree(root.left, subRoot) OR isSubtree(root.right, subRoot)

FUNCTION isSame(t1, t2):
    IF t1 == null AND t2 == null: RETURN true
    IF t1 == null OR t2 == null: RETURN false
    RETURN t1.val == t2.val
        AND isSame(t1.left, t2.left)
        AND isSame(t1.right, t2.right)
```

---

## 3. Examples

| root | subRoot | Output |
|------|---------|--------|
| `[3,4,5,1,2]` | `[4,1,2]` | `true` |
| `[3,4,5,1,2]` | `[4,1,3]` | `false` |

---

## 4. Walkthrough

For the first example:

1. Start at root `3`. `isSame(3,4)` → false.
2. Recurse left to node `4`. `isSame(4,4)` → values match, check children:
   - Left children `1` vs `1` → match.
   - Right children `2` vs `2` → match.
3. All nodes match, so `isSubtree` returns true.

---

## 5. Complexity Analysis

- **Time:** O(m·n) – each node of `root` may trigger a full comparison of `subRoot`.
- **Space:** O(h) – recursion stack, where `h` is the height of `root`.

---

## 6. Follow-Up Questions

- How to improve to O(m + n) using tree serialization and KMP/Rabin‑Karp?
- How to handle large trees without recursion (iterative DFS/BFS)?

---

## Key Takeaway

> The straightforward recursive solution checks every possible root position and verifies structural equality with a helper that compares two trees node‑by‑node.
