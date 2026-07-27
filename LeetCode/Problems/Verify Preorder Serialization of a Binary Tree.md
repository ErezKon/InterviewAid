# 331. Verify Preorder Serialization of a Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/verify-preorder-serialization-of-a-binary-tree](https://leetcode.com/problems/verify-preorder-serialization-of-a-binary-tree)
**Companies:** Google

---

## Approach: Slot Counting — O(n) ✅

```
FUNCTION isValidSerialization(preorder):
    slots = 1

    FOR node IN preorder.SPLIT(','):
        slots -= 1    // consume one slot
        IF slots < 0: RETURN false
        IF node != '#':
            slots += 2    // non-null adds two children slots

    RETURN slots == 0
```

Start with 1 slot. Each node consumes 1 slot. Non-null nodes create 2 new slots.
