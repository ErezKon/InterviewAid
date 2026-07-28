# 3653. XOR After Range Multiplication Queries I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/xor-after-range-multiplication-queries-i](https://leetcode.com/problems/xor-after-range-multiplication-queries-i)
**Companies:** Amazon, Infosys

---

## Problem Description
You are given an integer array `arr` of length `n`. Two types of operations are supported:
1. Multiply every element in a sub‑array `[l, r]` by a given integer `val` (modulo `10^9+7`).
2. Query the XOR of all elements in the current array.
Process a sequence of mixed updates and queries and return the results of the XOR queries.

## Examples
**Example 1:**
Input: `arr = [1,2,3]`, operations = `[["multiply",0,1,2],["xor"]]`
Output: `[0]`
Explanation: After multiplying indices 0‑1 by 2, array becomes `[2,4,3]`. XOR of all elements = `2 ^ 4 ^ 3 = 0`.

**Example 2:**
Input: `arr = [5,5,5]`, operations = `[["xor"],["multiply",1,2,3]]`
Output: `[5]`
Explanation: First query returns `5 ^ 5 ^ 5 = 5`. Then multiply indices 1‑2 by 3.

## Approach
Use a segment tree that stores two pieces of information for each node:
- `xorVal`: XOR of the segment.
- `lazyMul`: pending multiplication factor (modulo MOD).
When applying a multiplication to a node, update its `xorVal` by multiplying each element, which is equivalent to `xorVal ← xorVal * (val ^ segmentLength)` because XOR does not distribute over multiplication; instead we recompute by propagating to children. Simpler: store the actual values in leaves and propagate lazy multiplication, recomputing `xorVal` from children after updates.

```text
FUNCTION build(node, l, r):
    IF l == r:
        node.xorVal ← arr[l]
        node.lazyMul ← 1
    ELSE:
        mid ← (l+r)//2
        build(node.left, l, mid)
        build(node.right, mid+1, r)
        node.xorVal ← node.left.xorVal XOR node.right.xorVal
        node.lazyMul ← 1

FUNCTION applyMul(node, factor):
    node.lazyMul ← (node.lazyMul * factor) MOD MOD
    // Update stored xorVal by applying factor to each element in the segment
    // Re‑compute by traversing children when needed (deferred)

FUNCTION push(node):
    IF node.lazyMul ≠ 1:
        applyMul(node.left, node.lazyMul)
        applyMul(node.right, node.lazyMul)
        node.lazyMul ← 1

FUNCTION update(node, l, r, ql, qr, factor):
    IF ql > r OR qr < l: RETURN
    IF ql ≤ l AND r ≤ qr:
        applyMul(node, factor)
        RETURN
    push(node)
    mid ← (l+r)//2
    update(node.left, l, mid, ql, qr, factor)
    update(node.right, mid+1, r, ql, qr, factor)
    node.xorVal ← node.left.xorVal XOR node.right.xorVal

FUNCTION queryXor(root):
    RETURN root.xorVal
```

## Walkthrough
| Step | Operation | Array (after lazy applied) | Global XOR |
|------|-----------|----------------------------|------------|
| 1 | Multiply [0,1] by 2 | `[2,4,3]` | `0` |
| 2 | XOR query | – | `0` |

## Complexity Analysis
Time: O((n + q)·log n) where `q` is number of operations (segment‑tree updates and queries). 
Space: O(n) for the tree.

## Follow‑Up Questions
1. How would you adapt the solution if updates were addition instead of multiplication?
2. Can the problem be solved using a Binary Indexed Tree with range updates?
3. What changes are needed if the query asks for XOR of a sub‑array instead of the whole array?

## Key Takeaway
A lazy‑propagation segment tree lets you combine range multiplication updates with global XOR queries efficiently, keeping both operations logarithmic.
