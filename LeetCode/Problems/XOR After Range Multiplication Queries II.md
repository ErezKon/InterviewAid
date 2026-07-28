# 3655. XOR After Range Multiplication Queries II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/xor-after-range-multiplication-queries-ii](https://leetcode.com/problems/xor-after-range-multiplication-queries-ii)
**Companies:** Amazon, Infosys

---

## Problem Description
Given an integer array `arr` of length `n`, support two operations:
1. Multiply every element in a sub‑array `[l, r]` by an integer `val` (mod `10^9+7`).
2. Query the XOR of a sub‑array `[l, r]` after applying all previous updates.
Process a sequence of mixed updates and queries and return the results of the XOR queries.

## Examples
**Example 1:**
Input: `arr = [1,2,3,4]`, operations = `[["multiply",0,2,2],["xor",1,3]]`
Output: `[5]`
Explanation: After multiplying indices 0‑2 by 2, array becomes `[2,4,6,4]`. XOR of sub‑array `[1,3]` = `4 ^ 6 ^ 4 = 5`.

**Example 2:**
Input: `arr = [5,5,5]`, operations = `[["xor",0,2],["multiply",0,2,3],["xor",0,2]]`
Output: `[5,0]`

## Approach
Use a segment tree with lazy propagation storing:
- `xorVal`: XOR of the segment.
- `lazyMul`: pending multiplication factor.
When applying multiplication to a node, propagate to children and recompute `xorVal` from leaves because XOR does not distribute over multiplication.

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
    // Defer actual xor update until children are visited

FUNCTION push(node):
    IF node.lazyMul ≠ 1:
        applyMul(node.left, node.lazyMul)
        applyMul(node.right, node.lazyMul)
        node.lazyMul ← 1
        // After pushing, recompute children's xorVals by traversing down when needed

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

FUNCTION query(node, l, r, ql, qr):
    IF ql > r OR qr < l: RETURN 0
    IF ql ≤ l AND r ≤ qr:
        RETURN node.xorVal
    push(node)
    mid ← (l+r)//2
    leftXor ← query(node.left, l, mid, ql, qr)
    rightXor ← query(node.right, mid+1, r, ql, qr)
    RETURN leftXor XOR rightXor
```

## Walkthrough
| Step | Operation | Array (conceptual) | Query Result |
|------|-----------|--------------------|--------------|
| 1 | Multiply [0,2] by 2 | `[2,4,6,4]` | – |
| 2 | XOR [1,3] | – | `5` |

## Complexity Analysis
Time: O((n + q)·log n) for building, updates, and queries.
Space: O(n) for the segment tree.

## Follow‑Up Questions
1. How would you handle addition updates instead of multiplication?
2. Can a Binary Indexed Tree be adapted for this problem with range multiplication and XOR queries?
3. What changes are needed if the modulus is removed and values may overflow?

## Key Takeaway
Lazy‑propagation segment trees allow efficient combination of range multiplication updates with sub‑array XOR queries despite the non‑linear interaction between multiplication and XOR.
