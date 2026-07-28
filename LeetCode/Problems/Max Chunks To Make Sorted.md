# 769. Max Chunks To Make Sorted

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/max-chunks-to-make-sorted](https://leetcode.com/problems/max-chunks-to-make-sorted)
**Companies:** Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Poshmark

---

## 1. Problem Description

Split a permutation of `[0, n-1]` into maximum chunks such that sorting each chunk gives the sorted array.

---

## 2. Examples

**Example 1:**
```
Input: arr = [1,0,2,3,4]
Output: 2
Explanation: Split into [1,0] and [2,3,4]. Sorting each chunk yields [0,1,2,3,4].
```

**Example 2:**
```
Input: arr = [4,3,2,1,0]
Output: 1
Explanation: Only one chunk can be formed because the maximum element seen so far never equals the index until the end.
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
