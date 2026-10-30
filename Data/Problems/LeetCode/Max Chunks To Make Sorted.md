# 769. Max Chunks To Make Sorted

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/max-chunks-to-make-sorted](https://leetcode.com/problems/max-chunks-to-make-sorted)
**Companies:** Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Poshmark

---

## 1. Problem Description

You are given an integer array `arr` of length `n` that represents a permutation of the integers in the range `[0, n - 1]`.

We split `arr` into some number of **chunks** (i.e., partitions), and individually sort each chunk. After concatenating them, the result should equal the sorted array.

Return *the largest number of chunks we can make to sort the array*.

**Constraints:**

- `n == arr.length`
- `1 <= n <= 10`
- `0 <= arr[i] < n`
- All the elements of `arr` are **unique**.

---

## 2. Examples

```
Example 1:
  Input: arr = [4,3,2,1,0]
  Output: 1
  Explanation:
  Splitting into two or more chunks will not return the required result.
  For example, splitting into [4, 3], [2, 1, 0] will result in [3, 4, 0, 1, 2], which isn't sorted.
```

```
Example 2:
  Input: arr = [1,0,2,3,4]
  Output: 4
  Explanation:
  We can split into two chunks, such as [1, 0], [2, 3, 4].
  However, splitting into [1, 0], [2], [3], [4] is the highest number of chunks possible.
```

---

## 3. Approach: Track Max — O(n) ✅

```text
FUNCTION maxChunksToSorted(arr):
    chunks ← 0
    maxSoFar ← 0
    FOR i ← 0 TO LENGTH(arr) - 1:
        SET maxSoFar ← MAX(maxSoFar, arr[i])
        IF maxSoFar == i:
            SET chunks ← chunks + 1
    RETURN chunks
```

---

## 4. Walkthrough

Consider `arr = [1,0,2,3,4]`:
| i | arr[i] | maxSoFar | chunk boundary? |
|---|--------|----------|----------------|
| 0 | 1      | 1        | No (1 ≠ 0) |
| 1 | 0      | 1        | Yes (1 = 1) → chunk 1 |
| 2 | 2      | 2        | Yes (2 = 2) → chunk 2 |
| 3 | 3      | 3        | Yes (3 = 3) → chunk 3 |
| 4 | 4      | 4        | Yes (4 = 4) → chunk 4 |

The algorithm counts the boundaries where `maxSoFar` equals the current index, giving a total of 2 chunks for the first example.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 6. Follow-Up Questions

* How would the solution change if the array could contain duplicate values?
* Can the same idea be extended to the variant where elements are not limited to a permutation of 0..n-1?
* What is the minimum number of chunks needed to achieve a sorted array?

---

## 7. Key Takeaway

> In a permutation of 0..n-1, a chunk boundary at index `i` exists iff `max(arr[0..i]) == i`. This means all values 0..i are contained in arr[0..i].
