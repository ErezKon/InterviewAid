# 3636. Threshold Majority Queries

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/threshold-majority-queries](https://leetcode.com/problems/threshold-majority-queries)
**Companies:** Adobe, Amazon, Google, Meta

---

## Problem Description

> *Note: statement verified via doocs/leetcode. The Approach/Walkthrough below look for a strict majority with Boyer–Moore; the official problem asks for the **most frequent** element (smallest on ties) whose frequency is **at least** `threshold`, which is not a majority query. Correct idea: coordinate-compress values and use Mo's algorithm (or sqrt decomposition on values) maintaining frequencies and the current best (max frequency, smallest value); answer `-1` if the best frequency `< threshold`. O((n + q)·√n).*

You are given an integer array `nums` of length `n` and an array `queries`, where `queries[i] = [l_i, r_i, threshold_i]`.

Return an array of integers `ans` where `ans[i]` is equal to the element in the subarray `nums[l_i...r_i]` that appears **at least** `threshold_i` times, selecting the element with the **highest** frequency (choosing the **smallest** in case of a tie), or -1 if no such element *exists*.

**Constraints:**
- `1 <= nums.length == n <= 10^4`
- `1 <= nums[i] <= 10^9`
- `1 <= queries.length <= 5 * 10^4`
- `queries[i] = [l_i, r_i, threshold_i]`
- `0 <= l_i <= r_i < n`
- `1 <= threshold_i <= r_i - l_i + 1`

## Examples

**Example 1:**
```
Input: nums = [1,1,2,2,1,1], queries = [[0,5,4],[0,3,3],[2,3,2]]
Output: [1,-1,2]
Explanation:
| Query     | Sub-array          | Threshold | Frequency table | Answer |
|-----------|--------------------|-----------|-----------------|--------|
| [0, 5, 4] | [1, 1, 2, 2, 1, 1] | 4         | 1 → 4, 2 → 2    | 1      |
| [0, 3, 3] | [1, 1, 2, 2]       | 3         | 1 → 2, 2 → 2    | -1     |
| [2, 3, 2] | [2, 2]             | 2         | 2 → 2           | 2      |
```

**Example 2:**
```
Input: nums = [3,2,3,2,3,2,3], queries = [[0,6,4],[1,5,2],[2,4,1],[3,3,1]]
Output: [3,2,3,2]
Explanation:
| Query     | Sub-array             | Threshold | Frequency table | Answer |
|-----------|-----------------------|-----------|-----------------|--------|
| [0, 6, 4] | [3, 2, 3, 2, 3, 2, 3] | 4         | 3 → 4, 2 → 3    | 3      |
| [1, 5, 2] | [2, 3, 2, 3, 2]       | 2         | 2 → 3, 3 → 2    | 2      |
| [2, 4, 1] | [3, 2, 3]             | 1         | 3 → 2, 2 → 1    | 3      |
| [3, 3, 1] | [2]                   | 1         | 2 → 1           | 2      |
```

## Approach
**Segment Tree + Boyer‑Moore Candidate + Binary Search** – Build a segment tree where each node stores a *candidate* for majority element and its relative count using the Boyer‑Moore voting algorithm. For a query, combine candidates from O(log n) nodes to obtain a global candidate. Then verify the candidate by counting its actual occurrences using pre‑computed position lists (binary search).

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
1. Segment tree returns candidate `1` with count 2.
2. Positions of `1` are `[0,2,3]`. Binary search finds 3 occurrences in `[0,5]`.
3. Since `3 > 2`, answer is `1`.

## Complexity Analysis
- **Pre‑processing:** O(n log n) to build the segment tree; O(n) to store positions of each value.
- **Per Query:** O(log n) to obtain candidate + O(log n) for binary‑search verification → O(log n) total.
- **Space:** O(n) for the tree and position lists.

## Follow‑Up Questions
1. How would you handle updates to the array (point modifications)?
2. Can you answer queries with a *range mode* (most frequent element) instead of a threshold?
3. What if the array is extremely large and must be stored on disk?

## Key Takeaway
Combining Boyer‑Moore voting within a segment tree yields a fast majority‑candidate for any range, and a secondary verification step using binary search confirms whether the candidate truly exceeds the given threshold.
