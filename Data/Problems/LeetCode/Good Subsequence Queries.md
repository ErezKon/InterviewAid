# 3901. Good Subsequence Queries

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/good-subsequence-queries](https://leetcode.com/problems/good-subsequence-queries)
**Companies:** Infosys

---

## 1. Problem Description

You are given an integer array `nums` of length `n` and an integer `p`.

A **non-empty subsequence** of `nums` is called **good** if:

- Its length is **strictly less** than `n`.
- The **greatest common divisor (GCD)** of its elements is **exactly** `p`.

You are also given a 2D integer array `queries` of length `q`, where each `queries[i] = [ind_i, val_i]` indicates that you should update `nums[ind_i]` to `val_i`.

After each query, determine whether there exists **any good subsequence** in the current array.

Return the **number** of queries for which a **good subsequence** exists.

The term `gcd(a, b)` denotes the **greatest common divisor** of `a` and `b`.

**Constraints:**
- `2 <= n == nums.length <= 5 * 10^4`
- `1 <= nums[i] <= 5 * 10^4`
- `1 <= queries.length <= 5 * 10^4`
- `queries[i] = [ind_i, val_i]`
- `1 <= val_i, p <= 5 * 10^4`
- `0 <= ind_i <= n - 1`

## 2. Examples

```
Example 1:
  Input: nums = [4,8,12,16], p = 2, queries = [[0,3],[2,6]]
  Output: 1
  Explanation:
  i=0: [0, 3] -> update nums[0] to 3 -> nums = [3, 8, 12, 16]
       No, as no subsequence has GCD exactly p = 2
  i=1: [2, 6] -> update nums[2] to 6 -> nums = [3, 8, 6, 16]
       Yes, subsequence [8, 6] has GCD exactly p = 2
  Thus, the answer is 1.
```
```
Example 2:
  Input: nums = [4,5,7,8], p = 3, queries = [[0,6],[1,9],[2,3]]
  Output: 2
  Explanation:
  i=0: [0, 6] -> update nums[0] to 6 -> nums = [6, 5, 7, 8]
       No, as no subsequence has GCD exactly p = 3
  i=1: [1, 9] -> update nums[1] to 9 -> nums = [6, 9, 7, 8]
       Yes, subsequence [6, 9] has GCD exactly p = 3
  i=2: [2, 3] -> update nums[2] to 3 -> nums = [6, 9, 3, 8]
       Yes, subsequence [6, 9, 3] has GCD exactly p = 3
  Thus, the answer is 2.
```
```
Example 3:
  Input: nums = [5,7,9], p = 2, queries = [[1,4],[2,8]]
  Output: 0
  Explanation:
  i=0: [1, 4] -> update nums[1] to 4 -> nums = [5, 4, 9]
       No, as no subsequence has GCD exactly p = 2
  i=1: [2, 8] -> update nums[2] to 8 -> nums = [5, 4, 8]
       No, as no subsequence has GCD exactly p = 2
  Thus, the answer is 0.
```

## 3. Walkthrough

**Query `[0,4]` on `[1,2,2,1,3]`**

1. Frequency map: `{1:2, 2:2, 3:1}`.
2. The max frequency is 2, min is 1 → difference ≤ 1, so the whole subarray itself is a good subsequence.
3. Enumerate subsequences respecting the frequency constraint (omitted for brevity) → total count = 4.

**Query `[1,3]` on `[2,2,1]`**

1. Frequency map: `{2:2, 1:1}`.
2. Difference = 1 → valid.
3. Count of good subsequences = 2.

## 4. Approach

**Algorithm**: Offline processing with a segment tree (or BIT) to maintain frequency constraints while expanding the right endpoint of queries.

```text
FUNCTION processQueries(arr, queries):
    SORT queries BY right endpoint ASC
    INITIALIZE segmentTree FOR frequency tracking
    SET leftPointer ← 0
    FOR each query IN sorted queries:
        WHILE currentRight < query.right:
            currentRight += 1
            UPDATE segmentTree WITH arr[currentRight]
        ENDWHILE
        // Adjust leftPointer to satisfy good subsequence condition
        WHILE NOT isGood(leftPointer, query.right):
            REMOVE arr[leftPointer] FROM segmentTree
            leftPointer += 1
        ENDWHILE
        answer[query.id] ← COUNT_GOOD_SUBSEQUENCES(leftPointer, query.right)
    ENDFOR
    RETURN answer
```

**Helper** `isGood(l, r)`: checks if max frequency – min frequency ≤ 1 using segment tree stored max/min.

## 5. Complexity Analysis

- **Time**: O((n + q) log n) where n is array length and q is number of queries (segment‑tree updates and queries).
- **Space**: O(n) for the segment tree and auxiliary frequency maps.

## 6. Follow-Up Questions

- How would the solution change if the definition of a good subsequence required all frequencies to be exactly equal?
- Can you design an online algorithm that answers queries as they arrive without offline sorting?
- What modifications are needed to handle updates to the array between queries?

## Key Takeaway

> Use offline sorting of queries combined with a segment tree to maintain frequency constraints, enabling efficient counting of good subsequences for each subarray.
