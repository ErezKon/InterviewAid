# 1533. Find the Index of the Large Integer

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-index-of-the-large-integer](https://leetcode.com/problems/find-the-index-of-the-large-integer)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Binary Search with Comparator API — O(log n) ✅](#4-approach-binary-search-with-comparator-api--olog-n-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

We have an integer array `arr`, where all the integers in `arr` are equal except for one integer which is **larger** than the rest of the integers. You will not be given direct access to the array, instead, you will have an **API** `ArrayReader` which have the following functions:

- `int compareSub(int l, int r, int x, int y)`: where `0 <= l, r, x, y < ArrayReader.length()`, `l <= r` and `x <= y`. The function compares the sum of sub-array `arr[l..r]` with the sum of the sub-array `arr[x..y]` and returns:
  - **1** if `arr[l]+arr[l+1]+...+arr[r] > arr[x]+arr[x+1]+...+arr[y]`.
  - **0** if `arr[l]+arr[l+1]+...+arr[r] == arr[x]+arr[x+1]+...+arr[y]`.
  - **-1** if `arr[l]+arr[l+1]+...+arr[r] < arr[x]+arr[x+1]+...+arr[y]`.
- `int length()`: Returns the size of the array.

You are allowed to call `compareSub()` **20 times** at most. You can assume both functions work in `O(1)` time.

Return *the index of the array `arr` which has the largest integer*.

**Constraints:**
- `2 <= arr.length <= 5 * 10⁵`
- `1 <= arr[i] <= 100`
- All elements of `arr` are equal except for one element which is larger than all other elements.

**Follow up:**
- What if there are two numbers in `arr` that are bigger than all other numbers?
- What if there is one number that is bigger than other numbers and one number that is smaller than other numbers?

---

## 2. Examples

```
Example 1:
  Input: arr = [7,7,7,7,10,7,7,7]
  Output: 4
  Explanation: The following calls to the API
  reader.compareSub(0, 0, 1, 1) // returns 0 this is a query comparing the sub-array (0, 0) with the
                                // sub array (1, 1), (i.e. compares arr[0] with arr[1]).
  Thus we know that arr[0] and arr[1] doesn't contain the largest element.
  reader.compareSub(2, 2, 3, 3) // returns 0, we can exclude arr[2] and arr[3].
  reader.compareSub(4, 4, 5, 5) // returns 1, thus for sure arr[4] is the largest element in the array.
  Notice that we made only 3 calls, so the answer is valid.

Example 2:
  Input: nums = [6,6,12]
  Output: 2
```

---

## 3. Key Insight

> Binary search: split the range in half, compare the two halves using the API. The half with the larger sum contains the special element. If the halves are equal-sized and sums are equal, the middle element (if odd length) is the answer.

---

## 4. Approach: Binary Search with Comparator API — O(log n) ✅

```
FUNCTION getIndex(reader):
    lo ← 0
    hi ← reader.length() - 1

    WHILE lo < hi DO
        mid ← (lo + hi) / 2
        // Make even-length halves
        IF (hi - lo + 1) % 2 == 1 THEN
            // Odd length: compare [lo..mid-1] vs [mid+1..hi]
            cmp ← reader.compareSub(lo, mid-1, mid+1, hi)
            IF cmp == 0 THEN RETURN mid
            ELSE IF cmp > 0 THEN hi ← mid - 1
            ELSE lo ← mid + 1
        ELSE
            // Even length: compare [lo..mid] vs [mid+1..hi]
            cmp ← reader.compareSub(lo, mid, mid+1, hi)
            IF cmp > 0 THEN hi ← mid
            ELSE lo ← mid + 1

    RETURN lo
```

---

## 5. Walkthrough

```
arr = [7, 7, 7, 7, 10, 7, 7, 7], n=8

lo=0, hi=7, mid=3 (even length)
  compare [0..3] vs [4..7]: sum 28 vs 31 → right is bigger → lo=4

lo=4, hi=7, mid=5 (even length)
  compare [4..5] vs [6..7]: sum 17 vs 14 → left is bigger → hi=5

lo=4, hi=5, mid=4 (even length)
  compare [4..4] vs [5..5]: sum 10 vs 7 → left is bigger → hi=4

lo=4 == hi=4 → RETURN 4 ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(log n) API calls |
| **Space** | O(1) |

---

## 7. Key Takeaway

> **Binary search with comparison oracle** — when you can compare two subarrays by sum, the larger half contains the outlier. Handle odd/even lengths carefully to avoid off-by-one errors.
