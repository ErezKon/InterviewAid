# 653. Two Sum IV - Input is a BST

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/two-sum-iv-input-is-a-bst](https://leetcode.com/problems/two-sum-iv-input-is-a-bst)
**Companies:** Amazon, Bloomberg, Cisco, Goldman Sachs, Google, Meta, Microsoft, Samsung

---

## Approach: Inorder + Two Pointers — O(n) ✅

```
FUNCTION findTarget(root, k):
    // Inorder → sorted array
    sorted = inorder(root)
    lo, hi = 0, len(sorted) - 1
    WHILE lo < hi:
        sum = sorted[lo] + sorted[hi]
        IF sum == k: RETURN true
        ELSE IF sum < k: lo += 1
        ELSE: hi -= 1
    RETURN false
```

Or use HashSet during DFS: O(n) time, O(n) space.
