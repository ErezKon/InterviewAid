# 873. Length of Longest Fibonacci Subsequence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/length-of-longest-fibonacci-subsequence](https://leetcode.com/problems/length-of-longest-fibonacci-subsequence)
**Companies:** Amazon, Baidu, Bloomberg, Goldman Sachs, Google, Meta, Microsoft

---

## 1. Problem Description

A sequence `x_1, x_2, ..., x_n` is *Fibonacci-like* if:

- `n >= 3`
- `x_i + x_{i+1} == x_{i+2}` for all `i + 2 <= n`

Given a **strictly increasing** array `arr` of positive integers forming a sequence, return *the **length** of the longest Fibonacci-like subsequence of* `arr`. If one does not exist, return `0`.

A **subsequence** is derived from another sequence `arr` by deleting any number of elements (including none) from `arr`, without changing the order of the remaining elements. For example, `[3, 5, 8]` is a subsequence of `[3, 4, 5, 6, 7, 8]`.

**Constraints:**
- `3 <= arr.length <= 1000`
- `1 <= arr[i] < arr[i + 1] <= 10^9`

---

## 2. Examples

```
Example 1:
  Input: arr = [1,2,3,4,5,6,7,8]
  Output: 5
  Explanation: The longest subsequence that is fibonacci-like: [1,2,3,5,8].
```

```
Example 2:
  Input: arr = [1,3,7,11,12,14,18]
  Output: 3
  Explanation: The longest subsequence that is fibonacci-like: [1,11,12], [3,11,14] or [7,11,18].
```

---

## 3. Approach: DP with Hash Map — O(n²) ✅

```text
FUNCTION lenLongestFibSubseq(arr):
    // Map each value to its index for O(1) look‑up
    SET indexMap ← {value: idx FOR idx, value IN ENUMERATE(arr)}
    SET dp ← {}               // (i, j) → length of sequence ending with arr[i], arr[j]
    SET maxLen ← 0
    FOR j ← 0 TO length(arr) - 1:
        FOR i ← 0 TO j - 1:
            SET prev ← arr[j] - arr[i]
            // prev must be smaller than arr[i] to keep increasing order
            IF prev < arr[i] AND prev IN indexMap:
                SET k ← indexMap[prev]
                SET dp[(i, j)] ← dp.get((k, i), 2) + 1
                SET maxLen ← MAX(maxLen, dp[(i, j)])
    RETURN maxLen IF maxLen >= 3 ELSE 0
```

---

## 4. Walkthrough

Consider `arr = [1,2,3,5,8]`:

| i | j | prev = arr[j] - arr[i] | k (index of prev) | dp[(i,j)] |
|---|---|------------------------|-------------------|----------|
| 0 | 1 | 1 (arr[1]-arr[0])      | 0                 | 3 (2+1) |
| 1 | 2 | 1 (3-2)                | 0                 | 4 |
| 2 | 3 | 2 (5-3)                | 1                 | 5 |
| 3 | 4 | 3 (8-5)                | 2                 | 6 |

The longest length recorded is 5, matching the subsequence `[1,2,3,5,8]`.

---

## 5. Complexity Analysis

- **Time:** O(n²) – double loop over pairs of indices.
- **Space:** O(n²) – DP table storing lengths for each pair.

---

## 6. Follow-Up Questions

- How would you modify the algorithm to return the actual subsequence, not just its length?
- Can the solution be improved for very large arrays using a different data structure?
- What if the input array is not strictly increasing?

---

## 7. Key Takeaway

> Use DP on index pairs with a hash map for fast predecessor lookup; each pair extends a Fibonacci‑like sequence by one element.
