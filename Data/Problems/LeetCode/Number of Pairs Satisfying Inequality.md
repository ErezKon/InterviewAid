# 2426. Number of Pairs Satisfying Inequality

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-pairs-satisfying-inequality](https://leetcode.com/problems/number-of-pairs-satisfying-inequality)
**Companies:** Amazon, Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Merge Sort / BIT — O(n log n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given two **0-indexed** integer arrays `nums1` and `nums2`, each of size `n`, and an integer `diff`. Find the number of **pairs** `(i, j)` such that:

- `0 <= i < j <= n - 1` **and**
- `nums1[i] - nums1[j] <= nums2[i] - nums2[j] + diff`.

Return* the **number of pairs** that satisfy the conditions.*

**Constraints:**
- `n == nums1.length == nums2.length`
- `2 <= n <= 10^5`
- `-10^4 <= nums1[i], nums2[i] <= 10^4`
- `-10^4 <= diff <= 10^4`

---

## 2. Key Insight

> Transform each index `i` into a single value `a[i] = nums1[i] - nums2[i]`. The condition becomes `a[i] <= a[j] + diff` for `i < j`. This is a classic “count of pairs with bounded difference” problem that can be solved with a modified merge-sort counting step or a Binary Indexed Tree (Fenwick) after coordinate compression.

---

## 3. Approach: Merge Sort / BIT — O(n log n) ✅

```text
FUNCTION countPairs(nums1, nums2, diff):
    n ← LENGTH(nums1)
    a ← ARRAY of size n
    FOR i FROM 0 TO n-1:
        a[i] ← nums1[i] - nums2[i]

    // Use merge sort to count pairs where a[i] <= a[j] + diff (i < j)
    RETURN mergeCount(a, 0, n-1, diff)

FUNCTION mergeCount(arr, left, right, diff):
    IF left >= right: RETURN 0
    mid ← (left + right) // 2
    count ← mergeCount(arr, left, mid, diff) + mergeCount(arr, mid+1, right, diff)

    // Count cross pairs
    j ← mid + 1
    FOR i FROM left TO mid:
        WHILE j ≤ right AND arr[i] > arr[j] + diff:
            j ← j + 1
        count ← count + (right - j + 1)

    // Standard merge to keep array sorted
    temp ← []
    p ← left
    q ← mid + 1
    WHILE p ≤ mid AND q ≤ right:
        IF arr[p] ≤ arr[q]:
            APPEND arr[p] TO temp; p ← p + 1
        ELSE:
            APPEND arr[q] TO temp; q ← q + 1
    WHILE p ≤ mid: APPEND arr[p] TO temp; p ← p + 1
    WHILE q ≤ right: APPEND arr[q] TO temp; q ← q + 1
    COPY temp BACK TO arr[left..right]
    RETURN count
```

*Alternatively*, compress the values of `a[i]` and `a[i] + diff`, then iterate from right to left inserting `a[i]` into a BIT and querying the count of values `≤ a[i] + diff`.

---

## 4. Examples

**Example 1:**
```
Input: nums1 = [3,2,5], nums2 = [2,2,1], diff = 1
Output: 3
Explanation: There are 3 pairs that satisfy the conditions:
1. i = 0, j = 1: 3 - 2 <= 2 - 2 + 1. Since i < j and 1 <= 1, this pair satisfies the conditions.
2. i = 0, j = 2: 3 - 5 <= 2 - 1 + 1. Since i < j and -2 <= 2, this pair satisfies the conditions.
3. i = 1, j = 2: 2 - 5 <= 2 - 1 + 1. Since i < j and -3 <= 2, this pair satisfies the conditions.
Therefore, we return 3.
```

**Example 2:**
```
Input: nums1 = [3,-1], nums2 = [-2,2], diff = -1
Output: 0
Explanation: Since there does not exist any pair that satisfies the conditions, we return 0.
```

---

## 5. Walkthrough

**Example 1** (`nums1 = [3,2,5]`, `nums2 = [2,2,1]`, `diff = 1`)

1. Compute `a = [3-2, 2-2, 5-1] = [1,0,4]`.
2. Run `mergeCount` on `[1,0,4]`.
   - Split into `[1,0]` and `[4]`.
   - Recursively sort and count left part:
     * Split `[1,0]` → `[1]` and `[0]`.
     * No cross pairs inside singletons.
     * Merge `[1]` and `[0]` while counting: for `i=0` (`1`), advance `j` while `1 > 0 + diff (1) ?` false, so count adds `right - j + 1 = 1` → one valid pair `(0,1)`.
   - Merge left sorted `[0,1]` with right `[4]`:
     * For `i=0` (`0`), `0 > 4 + diff?` false, count adds `1` (pair `(0,2)`).
     * For `i=1` (`1`), `1 > 4 + diff?` false, count adds `1` (pair `(1,2)`).
3. Total count = 3 (plus any counted earlier) = 4.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — merge sort or BIT operations |
| **Space** | O(n) — auxiliary array for merging |

---

## 7. Follow-Up Questions

1. How would you adapt the solution if `diff` could be negative?
2. Can the problem be solved in O(n) using a sliding window after sorting?
3. How would you extend the approach to count triples `(i, j, k)` with a similar inequality?

---

## 8. Key Takeaway

> **Reduce two-array inequality to a single-array bound and count with merge sort or BIT.** The transformation `a[i] = nums1[i] - nums2[i]` simplifies the condition to `a[i] ≤ a[j] + diff`.
