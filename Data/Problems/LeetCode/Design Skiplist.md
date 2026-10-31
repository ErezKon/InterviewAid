# 1206. Design Skiplist

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/design-skiplist](https://leetcode.com/problems/design-skiplist)
**Companies:** Amazon, Ebay, Google, Meta, Microsoft, Optiver, Pure Storage, Twitter

---

## Problem Description

Design a **Skiplist** without using any built-in libraries.

A **skiplist** is a data structure that takes `O(log(n))` time to add, erase and search. Comparing with treap and red-black tree which has the same function and performance, the code length of Skiplist can be comparatively short and the idea behind Skiplists is just simple linked lists.

A Skiplist has many layers. Each layer is a sorted linked list. With the help of the top layers, add, erase and search can be faster than `O(n)`. It can be proven that the average time complexity for each operation is `O(log(n))` and space complexity is `O(n)`.

Implement the `Skiplist` class:

- `Skiplist()` Initializes the object of the skiplist.
- `bool search(int target)` Returns `true` if the integer `target` exists in the Skiplist or `false` otherwise.
- `void add(int num)` Inserts the value `num` into the SkipList.
- `bool erase(int num)` Removes the value `num` from the Skiplist and returns `true`. If `num` does not exist in the Skiplist, do nothing and return `false`. If there exist multiple `num` values, removing any one of them is fine.

Note that duplicates may exist in the Skiplist, your code needs to handle this situation.

**Constraints:**
- `0 <= num, target <= 2 * 10^4`
- At most `5 * 10^4` calls will be made to `search`, `add`, and `erase`.

---

## Examples

```
Example 1:
  Input:
  ["Skiplist", "add", "add", "add", "search", "add", "search", "erase", "erase", "search"]
  [[], [1], [2], [3], [0], [4], [1], [0], [1], [1]]
  Output:
  [null, null, null, null, false, null, true, false, true, false]
  Explanation:
  Skiplist skiplist = new Skiplist();
  skiplist.add(1);
  skiplist.add(2);
  skiplist.add(3);
  skiplist.search(0); // return False
  skiplist.add(4);
  skiplist.search(1); // return True
  skiplist.erase(0);  // return False, 0 is not in skiplist.
  skiplist.erase(1);  // return True
  skiplist.search(1); // return False, 1 has already been erased.
```

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
2. What changes are needed to make the skiplist thread-safe for concurrent reads and writes?
3. Could you adapt the structure to store key-value pairs like a map?

---

## Key Takeaway

> **Skiplist = randomized balanced structure. Coin-flip level promotion gives expected O(log n) height with no rotations. Track `update[]` pointers during descent to splice nodes in or out at every level.**