# 272. Closest Binary Search Tree Value II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/closest-binary-search-tree-value-ii](https://leetcode.com/problems/closest-binary-search-tree-value-ii)
**Companies:** Amazon, Google, Linkedin

---

```
FUNCTION closestKValues(root, target, k):
    // Inorder traversal + sliding window or two stacks
    values = inorder(root)
    // Binary search for closest, then expand window
    lo = bisect_left(values, target) - 1; hi = lo + 1
    result = []
    WHILE len(result) < k:
        IF lo < 0: result.ADD(values[hi]); hi += 1
        ELSE IF hi >= len(values): result.ADD(values[lo]); lo -= 1
        ELSE IF ABS(values[lo] - target) <= ABS(values[hi] - target):
            result.ADD(values[lo]); lo -= 1
        ELSE: result.ADD(values[hi]); hi += 1
    RETURN result
```
