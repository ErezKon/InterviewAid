# 3640. Trionic Array II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/trionic-array-ii](https://leetcode.com/problems/trionic-array-ii)
**Companies:** Amazon, Bloomberg, Google, Infosys, Meta, Microsoft

---

## Problem Description

> *Note: statement verified via doocs/leetcode. The Approach/Walkthrough below implement an invented lazy segment tree. Correct idea: scan maximal rise–fall–rise pieces. For each piece the fixed core is `nums[p−1..q+1]` (last two of the first rise, the whole fall, first step of the last rise); add the best non-negative suffix sum extending left along the first rise and the best non-negative prefix sum extending right along the last rise. Restart from the valley `q`. O(n).*

You are given an integer array `nums` of length `n`.

A **trionic subarray** is a contiguous subarray `nums[l...r]` (with `0 <= l < r < n`) for which there exist indices `l < p < q < r` such that:

- `nums[l...p]` is **strictly** increasing,
- `nums[p...q]` is **strictly** decreasing,
- `nums[q...r]` is **strictly** increasing.

Return the **maximum** sum of any trionic subarray in `nums`.

**Constraints:**
- `4 <= n = nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`
- It is guaranteed that at least one trionic subarray exists.

## Examples

**Example 1:**
```
Input: nums = [0,-2,-1,-3,0,2,-1]
Output: -4
Explanation: Pick l = 1, p = 2, q = 3, r = 5:
- nums[l...p] = nums[1...2] = [-2, -1] is strictly increasing (-2 < -1).
- nums[p...q] = nums[2...3] = [-1, -3] is strictly decreasing (-1 > -3)
- nums[q...r] = nums[3...5] = [-3, 0, 2] is strictly increasing (-3 < 0 < 2).
- Sum = (-2) + (-1) + (-3) + 0 + 2 = -4.
```

**Example 2:**
```
Input: nums = [1,4,2,7]
Output: 14
Explanation: Pick l = 0, p = 1, q = 2, r = 3:
- nums[l...p] = nums[0...1] = [1, 4] is strictly increasing (1 < 4).
- nums[p...q] = nums[1...2] = [4, 2] is strictly decreasing (4 > 2).
- nums[q...r] = nums[2...3] = [2, 7] is strictly increasing (2 < 7).
- Sum = 1 + 4 + 2 + 7 = 14.
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
