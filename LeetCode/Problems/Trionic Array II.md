# 3640. Trionic Array II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/trionic-array-ii](https://leetcode.com/problems/trionic-array-ii)
**Companies:** Amazon, Bloomberg, Google, Infosys, Meta, Microsoft

---

## Problem Description
A *trionic array* supports three operations on an integer array `arr` of length `n`:
1. **Update(i, val)** – set `arr[i] = val`.
2. **Query(l, r)** – return the sum of elements from index `l` to `r` inclusive.
3. **Reset()** – set all elements of `arr` to `0`.
In this hard version, you must support an additional operation:
4. **RangeUpdate(l, r, delta)** – add `delta` to every element in the sub‑array `arr[l..r]`.
All operations must run in logarithmic time.

## Examples
**Example 1:**
```
TrionicArray obj = new TrionicArray([0,0,0,0])
obj.update(1,5)            // arr = [0,5,0,0]
obj.rangeUpdate(0,2,3)     // arr = [3,8,3,0]
obj.query(1,3)             // returns 8+3+0 = 11
obj.reset()                // arr = [0,0,0,0]
```

## Approach
Use a **segment tree with lazy propagation** to handle range updates and range sum queries efficiently.
- Each node stores the sum of its segment.
- Lazy value stores a pending addition to be applied to the node’s children.
- `Update` and `RangeUpdate` are point and range updates respectively, both O(log n).
- `Query` aggregates sums from relevant segments, also O(log n).
- `Reset` can be implemented by setting the root sum to 0 and marking a lazy reset flag, or by rebuilding the tree in O(n).

**Pseudocode**
```text
CLASS SegmentTreeNode:
    FUNCTION __init__(left, right):
        SET leftIdx ← left
        SET rightIdx ← right
        SET sum ← 0
        SET lazyAdd ← 0
        SET leftChild ← null
        SET rightChild ← null

FUNCTION build(node, arr):
    IF node.leftIdx = node.rightIdx:
        SET node.sum ← arr[node.leftIdx]
        RETURN
    SET mid ← (node.leftIdx + node.rightIdx) // 2
    SET node.leftChild ← NEW SegmentTreeNode(node.leftIdx, mid)
    SET node.rightChild ← NEW SegmentTreeNode(mid+1, node.rightIdx)
    CALL build(node.leftChild, arr)
    CALL build(node.rightChild, arr)
    SET node.sum ← node.leftChild.sum + node.rightChild.sum

FUNCTION push(node):
    IF node.lazyAdd ≠ 0:
        FOR child IN [node.leftChild, node.rightChild]:
            SET child.sum ← child.sum + (child.rightIdx - child.leftIdx + 1) * node.lazyAdd
            SET child.lazyAdd ← child.lazyAdd + node.lazyAdd
        SET node.lazyAdd ← 0

FUNCTION rangeUpdate(node, l, r, delta):
    IF r < node.leftIdx OR l > node.rightIdx:
        RETURN
    IF l ≤ node.leftIdx AND node.rightIdx ≤ r:
        SET node.sum ← node.sum + (node.rightIdx - node.leftIdx + 1) * delta
        SET node.lazyAdd ← node.lazyAdd + delta
        RETURN
    CALL push(node)
    CALL rangeUpdate(node.leftChild, l, r, delta)
    CALL rangeUpdate(node.rightChild, l, r, delta)
    SET node.sum ← node.leftChild.sum + node.rightChild.sum

FUNCTION pointUpdate(node, idx, val):
    IF node.leftIdx = node.rightIdx = idx:
        SET node.sum ← val
        RETURN
    CALL push(node)
    IF idx ≤ node.leftChild.rightIdx:
        CALL pointUpdate(node.leftChild, idx, val)
    ELSE:
        CALL pointUpdate(node.rightChild, idx, val)
    SET node.sum ← node.leftChild.sum + node.rightChild.sum

FUNCTION query(node, l, r):
    IF r < node.leftIdx OR l > node.rightIdx:
        RETURN 0
    IF l ≤ node.leftIdx AND node.rightIdx ≤ r:
        RETURN node.sum
    CALL push(node)
    RETURN query(node.leftChild, l, r) + query(node.rightChild, l, r)

CLASS TrionicArray:
    FUNCTION __init__(initial):
        SET n ← LENGTH(initial)
        SET root ← NEW SegmentTreeNode(0, n-1)
        CALL build(root, initial)
    FUNCTION update(i, val):
        CALL pointUpdate(root, i, val)
    FUNCTION rangeUpdate(l, r, delta):
        CALL rangeUpdate(root, l, r, delta)
    FUNCTION query(l, r):
        RETURN query(root, l, r)
    FUNCTION reset():
        // Rebuild tree with zeros
        CALL build(root, ARRAY of n zeros)
```

## Walkthrough
For `arr = [0,0,0,0]`:
1. Build tree → all sums 0.
2. `update(1,5)`: leaf at index 1 set to 5, ancestors updated.
3. `rangeUpdate(0,2,3)`: lazy add 3 to segment covering indices 0‑2; affected sums become 3,8,3.
4. `query(1,3)`: combines node for index 1 (8) and segment 2‑3 (3+0) → 11.
5. `reset()`: rebuild with zeros.

## Complexity Analysis
- Update / RangeUpdate / Query: O(log n) time.
- Space: O(n) for the segment tree nodes.

## Follow‑Up Questions
1. How would you modify the structure to support range minimum queries instead of sums?
2. Can you implement a persistent segment tree to query historical versions?
3. What changes are needed if the array size can change dynamically (insert/delete)?

## Key Takeaway
Lazy‑propagated segment trees enable logarithmic point updates, range additions, and range sum queries on an array, satisfying the hard version’s performance requirements.
