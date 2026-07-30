# 1157. Online Majority Element In Subarray

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/online-majority-element-in-subarray](https://leetcode.com/problems/online-majority-element-in-subarray)
**Companies:** Nutanix

---

## Problem Description
Given an integer array `arr` of length `n`, you will receive a stream of queries. Each query provides a subarray range `[l, r]` (0‑based inclusive) and asks for an element that appears more than `(r‑l+1)/2` times in that subarray, i.e., the majority element. If no such element exists, return `-1`. Queries must be answered online – you cannot reorder them.

## Examples
**Example 1**
```
arr = [1,2,1,1,3]
queries = [[0,2],[1,4],[0,4]]
output = [1,-1,1]
```
- Subarray `[0,2]` → `[1,2,1]` has majority `1`.
- Subarray `[1,4]` → `[2,1,1,3]` has no majority.
- Subarray `[0,4]` → `[1,2,1,1,3]` majority is `1`.

## Approach
Use a **Segment Tree** where each node stores a candidate majority element and its relative count using the Boyer‑Moore voting principle. Merging two nodes combines candidates to produce a new candidate for the union interval. To answer a query, retrieve the candidate from the segment tree for `[l, r]` and then verify its actual frequency with a prefix‑sum map.

### Pseudocode
```text
FUNCTION build(node, start, end):
    IF start == end:
        SET tree[node] ← (arr[start], 1)
        RETURN
    SET mid ← (start + end) // 2
    CALL build(2*node, start, mid)
    CALL build(2*node+1, mid+1, end)
    SET tree[node] ← merge(tree[2*node], tree[2*node+1])

FUNCTION merge(pairA, pairB):
    // pair = (value, count)
    IF pairA.value == pairB.value:
        RETURN (pairA.value, pairA.count + pairB.count)
    IF pairA.count > pairB.count:
        RETURN (pairA.value, pairA.count - pairB.count)
    RETURN (pairB.value, pairB.count - pairA.count)

FUNCTION query(node, start, end, l, r):
    IF r < start OR end < l:
        RETURN (null, 0)
    IF l ≤ start AND end ≤ r:
        RETURN tree[node]
    SET mid ← (start + end) // 2
    SET left ← query(2*node, start, mid, l, r)
    SET right ← query(2*node+1, mid+1, end, l, r)
    RETURN merge(left, right)

FUNCTION majorityQuery(l, r):
    SET candidate ← query(1, 0, n-1, l, r).value
    IF candidate IS null:
        RETURN -1
    SET freq ← countOccurrences(candidate, l, r)
    IF freq > (r - l + 1) / 2:
        RETURN candidate
    RETURN -1
```

## Walkthrough
| Step | Action | Result |
|------|--------|--------|
|1|Build segment tree for `arr = [1,2,1,1,3]`|Each leaf stores its element as candidate|
|2|Query `[0,2]`|Merge nodes covering indices 0‑2 → candidate `1`|
|3|Verify frequency of `1` in `[0,2]` → 2 > 1.5|Return `1`|
|4|Query `[1,4]`|Candidate becomes `1` after merges|
|5|Count `1` in `[1,4]` → 2 ≤ 2|Return `-1`|

## Complexity Analysis
- Building segment tree: **O(n)** time, **O(n)** space.
- Each query: **O(log n)** to retrieve candidate + **O(k)** verification where `k` is occurrences (using prefix map, O(1) per check). Overall **O(log n)** amortized.

## Follow‑Up Questions
1. How would you adapt the solution for dynamic updates (changing array values)?
2. Can you solve the problem using **Mo's algorithm** for offline queries?
3. What if the threshold is a different fraction, e.g., > 30% of the subarray?

## Key Takeaway
A segment tree combined with Boyer‑Moore voting provides an online majority candidate in logarithmic time, and a simple frequency check confirms the true majority.
