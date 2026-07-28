# 3901. Good Subsequence Queries

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/good-subsequence-queries](https://leetcode.com/problems/good-subsequence-queries)
**Companies:** Infosys

---

## 1. Problem Description

Given an array and queries `[l, r]`, count "good" subsequences in each subarray. A subsequence is good if all element frequencies differ by at most 1. (Hard problem)

## 2. Examples

| Array | Queries | Output |
|-------|---------|--------|
| `[1,2,2,1,3]` | `[[0,4],[1,3]]` | `[4,2]` |
| `[5,5,5,5]` | `[[0,3]]` | `[1]` |

*Explanation*: For the first query, good subsequences are those where the counts of each distinct number differ by at most one.

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
