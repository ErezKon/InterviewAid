# 3653. XOR After Range Multiplication Queries I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/xor-after-range-multiplication-queries-i](https://leetcode.com/problems/xor-after-range-multiplication-queries-i)
**Companies:** Amazon, Infosys

---

## Problem Description

You are given an integer array `nums` of length `n` and a 2D integer array `queries` of size `q`, where `queries[i] = [l_i, r_i, k_i, v_i]`.

For each query, you must apply the following operations in order:

- Set `idx = l_i`.
- While `idx <= r_i`:

- Update: `nums[idx] = (nums[idx] * v_i) % (10^9 + 7)`
- Set `idx += k_i`.

Return the **bitwise XOR** of all elements in `nums` after processing all queries.

**Constraints:**
- `1 <= n == nums.length <= 10^3`
- `1 <= nums[i] <= 10^9`
- `1 <= q == queries.length <= 10^3`
- `queries[i] = [l_i, r_i, k_i, v_i]`
- `0 <= l_i <= r_i < n`
- `1 <= k_i <= n`
- `1 <= v_i <= 10^5`

## Examples

**Example 1:**
```
Input: nums = [1,1,1], queries = [[0,2,1,4]]
Output: 4
Explanation:
  A single query [0, 2, 1, 4] multiplies every element from index 0 through index 2 by 4.
  The array changes from [1, 1, 1] to [4, 4, 4].
  The XOR of all elements is 4 ^ 4 ^ 4 = 4.
```

**Example 2:**
```
Input: nums = [2,3,1,5,4], queries = [[1,4,2,3],[0,2,1,2]]
Output: 31
Explanation:
  The first query [1, 4, 2, 3] multiplies the elements at indices 1 and 3 by 3, transforming the array to [2, 9, 1, 15, 4].
  The second query [0, 2, 1, 2] multiplies the elements at indices 0, 1, and 2 by 2, resulting in [4, 18, 2, 15, 4].
  Finally, the XOR of all elements is 4 ^ 18 ^ 2 ^ 15 ^ 4 = 31.
```

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
    // Re-compute by traversing children when needed (deferred)

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
Time: O((n + q)·log n) where `q` is number of operations (segment-tree updates and queries). 
Space: O(n) for the tree.

## Follow-Up Questions
1. How would you adapt the solution if updates were addition instead of multiplication?
2. Can the problem be solved using a Binary Indexed Tree with range updates?
3. What changes are needed if the query asks for XOR of a sub-array instead of the whole array?

## Key Takeaway
A lazy-propagation segment tree lets you combine range multiplication updates with global XOR queries efficiently, keeping both operations logarithmic.
