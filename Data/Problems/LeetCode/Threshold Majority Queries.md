# 3636. Threshold Majority Queries

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/threshold-majority-queries](https://leetcode.com/problems/threshold-majority-queries)
**Companies:** Adobe, Amazon, Google, Meta

---

## Problem Description
You are given an integer array `arr` of length `n`. For each query `[l, r, threshold]` (0‑based indices, inclusive), determine whether there exists an element that occurs **strictly more** than `threshold` times in the sub‑array `arr[l..r]`. If such an element exists, return it; otherwise return `-1`. Multiple queries are to be answered efficiently.

## Examples
| Query `(l, r, t)` | Sub‑array | Result | Explanation |
|-------------------|-----------|--------|-------------|
| `(0, 5, 2)` | `[1,2,1,1,3,2]` | `1` | `1` appears 3 > 2 times. |
| `(2, 4, 1)` | `[1,1,3]` | `1` | `1` appears 2 > 1 times. |
| `(1, 3, 2)` | `[2,1,1]` | `-1` | No element exceeds the threshold. |

## Approach
**Segment Tree + Boyer‑Moore Candidate + Binary Search** – Build a segment tree where each node stores a *candidate* for majority element and its relative count using the Boyer‑Moore voting algorithm. For a query, combine candidates from O(log n) nodes to obtain a global candidate. Then verify the candidate by counting its actual occurrences using pre‑computed position lists (binary search).

```text
FUNCTION buildTree(node, left, right):
    IF left = right:
        SET tree[node] ← (value ← arr[left], count ← 1)
        RETURN
    SET mid ← (left + right) / 2
    CALL buildTree(node*2, left, mid)
    CALL buildTree(node*2+1, mid+1, right)
    SET tree[node] ← merge(tree[node*2], tree[node*2+1])

FUNCTION merge(pairA, pairB):
    // Boyer‑Moore merge of two candidates
    IF pairA.value = pairB.value:
        RETURN (value ← pairA.value, count ← pairA.count + pairB.count)
    IF pairA.count > pairB.count:
        RETURN (value ← pairA.value, count ← pairA.count - pairB.count)
    RETURN (value ← pairB.value, count ← pairB.count - pairA.count)

FUNCTION query(node, left, right, ql, qr):
    IF ql ≤ left AND right ≤ qr:
        RETURN tree[node]
    SET mid ← (left + right) / 2
    IF qr ≤ mid:
        RETURN query(node*2, left, mid, ql, qr)
    IF ql > mid:
        RETURN query(node*2+1, mid+1, right, ql, qr)
    SET leftRes ← query(node*2, left, mid, ql, qr)
    SET rightRes ← query(node*2+1, mid+1, right, ql, qr)
    RETURN merge(leftRes, rightRes)

FUNCTION majorityQuery(l, r, threshold):
    SET candidatePair ← query(1, 0, n-1, l, r)
    SET cand ← candidatePair.value
    // Verify actual frequency using position map
    SET occ ← COUNT of indices in positions[cand] within [l, r] (binary search)
    IF occ > threshold:
        RETURN cand
    RETURN -1
```

## Walkthrough
Array `arr = [1,2,1,1,3,2]`, query `(0,5,2)`:
1. Segment tree returns candidate `1` with count 2.
2. Positions of `1` are `[0,2,3]`. Binary search finds 3 occurrences in `[0,5]`.
3. Since `3 > 2`, answer is `1`.

## Complexity Analysis
- **Pre‑processing:** O(n log n) to build the segment tree; O(n) to store positions of each value.
- **Per Query:** O(log n) to obtain candidate + O(log n) for binary‑search verification → O(log n) total.
- **Space:** O(n) for the tree and position lists.

## Follow‑Up Questions
1. How would you handle updates to the array (point modifications)?
2. Can you answer queries with a *range mode* (most frequent element) instead of a threshold?
3. What if the array is extremely large and must be stored on disk?

## Key Takeaway
Combining Boyer‑Moore voting within a segment tree yields a fast majority‑candidate for any range, and a secondary verification step using binary search confirms whether the candidate truly exceeds the given threshold.