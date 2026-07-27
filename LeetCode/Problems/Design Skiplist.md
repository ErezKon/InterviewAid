# 1206. Design Skiplist

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/design-skiplist](https://leetcode.com/problems/design-skiplist)
**Companies:** Amazon, Ebay, Google, Meta, Microsoft, Optiver, Pure Storage, Twitter

---

## Problem Description

Design a skiplist supporting `search(target)`, `add(num)`, and `erase(num)` without using built-in libraries. Expected O(log n) per operation.

---

## Key Insight

A skiplist is a stack of sorted linked lists. Each node is promoted to the next level with probability 1/2, giving expected O(log n) levels. Searching descends levels, skipping large gaps at high levels.

---

## Approach: Probabilistic Multi-Level Linked List ✅

```
CLASS SkiplistNode:
    val, forward[]    // forward[i] = next node at level i

CLASS Skiplist:
    CONSTRUCTOR:
        head = SkiplistNode(-1, maxLevel=16)
        level = 0

    FUNCTION search(target):
        curr = head
        FOR i ← level DOWN TO 0:
            WHILE curr.forward[i] AND curr.forward[i].val < target:
                curr = curr.forward[i]
        curr = curr.forward[0]
        RETURN curr AND curr.val == target

    FUNCTION add(num):
        update = [head] * (maxLevel + 1)
        curr = head
        FOR i ← level DOWN TO 0:
            WHILE curr.forward[i] AND curr.forward[i].val < num:
                curr = curr.forward[i]
            update[i] = curr
        // Random level
        newLevel = randomLevel()
        node = SkiplistNode(num, newLevel)
        FOR i ← 0 TO newLevel:
            node.forward[i] = update[i].forward[i]
            update[i].forward[i] = node

    FUNCTION erase(num):
        // Similar to search, track update pointers, remove one occurrence
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(log n) expected search/add/erase |
| **Space** | O(n) expected |

---

## Key Takeaway

> **Skiplist = randomized balanced structure. Coin-flip level promotion gives expected O(log n) height with no rotations. Track `update[]` pointers during descent to splice nodes in or out at every level.**
