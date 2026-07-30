# 1206. Design Skiplist

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/design-skiplist](https://leetcode.com/problems/design-skiplist)
**Companies:** Amazon, Ebay, Google, Meta, Microsoft, Optiver, Pure Storage, Twitter

---

## Problem Description

Design a skiplist supporting `search(target)`, `add(num)`, and `erase(num)` without using built-in libraries. Expected O(log n) per operation.

---

## Examples

**Example 1:**
```
skiplist = Skiplist()
skiplist.add(1)
skiplist.add(2)
skiplist.add(3)
skiplist.search(0) → false
skiplist.search(1) → true
skiplist.erase(1) → true   // 1 is removed
skiplist.search(1) → false
```
*Explanation:* After adding three numbers, searching for 0 returns false, searching for 1 returns true, erasing 1 succeeds, and subsequent search for 1 fails.

**Example 2:**
```
skiplist.add(5)
skiplist.add(5)
skiplist.erase(5) → true   // removes one occurrence
skiplist.search(5) → true   // another 5 remains
```
*Explanation:* Duplicate values are allowed; erase removes only one instance.

---

## Approach: Probabilistic Multi-Level Linked List ✅

```text
CLASS SkiplistNode:
    val ← integer value
    forward[] ← array of next pointers for each level

CLASS Skiplist:
    CONSTRUCTOR:
        head ← SkiplistNode(-1, maxLevel=16)
        level ← 0

    FUNCTION search(target):
        curr ← head
        FOR i ← level DOWN TO 0:
            WHILE curr.forward[i] IS NOT NULL AND curr.forward[i].val < target:
                curr ← curr.forward[i]
        curr ← curr.forward[0]
        RETURN curr IS NOT NULL AND curr.val == target

    FUNCTION add(num):
        update[0..maxLevel] ← head
        curr ← head
        FOR i ← level DOWN TO 0:
            WHILE curr.forward[i] IS NOT NULL AND curr.forward[i].val < num:
                curr ← curr.forward[i]
            update[i] ← curr
        newLevel ← randomLevel()
        node ← SkiplistNode(num, newLevel)
        FOR i ← 0 TO newLevel:
            node.forward[i] ← update[i].forward[i]
            update[i].forward[i] ← node
        IF newLevel > level:
            level ← newLevel

    FUNCTION erase(num):
        update[0..maxLevel] ← head
        curr ← head
        FOR i ← level DOWN TO 0:
            WHILE curr.forward[i] IS NOT NULL AND curr.forward[i].val < num:
                curr ← curr.forward[i]
            update[i] ← curr
        target ← curr.forward[0]
        IF target IS NULL OR target.val != num:
            RETURN false
        FOR i ← 0 TO level:
            IF update[i].forward[i] != target:
                BREAK
            update[i].forward[i] ← target.forward[i]
        WHILE level > 0 AND head.forward[level] IS NULL:
            level ← level - 1
        RETURN true
```

---

## Walkthrough

Consider inserting the sequence `[1, 2, 3]`.

1. **Insert 1:** `randomLevel()` returns 0. Node 1 is linked at level 0.
2. **Insert 2:** `randomLevel()` returns 1. Update pointers at levels 0 and 1; node 2 becomes reachable from head at level 1, skipping node 1.
3. **Insert 3:** `randomLevel()` returns 0. Node 3 is linked after node 2 at level 0.

When searching for `2`, the algorithm starts at the highest level (1), moves from head to node 2 directly, then checks level 0 to confirm. Deleting `2` updates forward pointers at both levels, restoring the skiplist structure.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(log n) expected for `search`, `add`, and `erase` |
| **Space** | O(n) expected for storing nodes and forward pointers |

---

## Follow-Up Questions

1. How would you modify the skiplist to support a `countLessThan(x)` operation?
2. What changes are needed to make the skiplist thread‑safe for concurrent reads and writes?
3. Could you adapt the structure to store key‑value pairs like a map?

---

## Key Takeaway

> **Skiplist = randomized balanced structure. Coin‑flip level promotion gives expected O(log n) height with no rotations. Track `update[]` pointers during descent to splice nodes in or out at every level.**