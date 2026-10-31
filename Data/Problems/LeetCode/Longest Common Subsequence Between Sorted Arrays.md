# 1940. Longest Common Subsequence Between Sorted Arrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-common-subsequence-between-sorted-arrays](https://leetcode.com/problems/longest-common-subsequence-between-sorted-arrays)
**Companies:** Google

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given an array of integer arrays `arrays` where each `arrays[i]` is sorted in **strictly increasing** order, return *an integer array representing the **longest common subsequence** among **all** the arrays*.

A **subsequence** is a sequence that can be derived from another sequence by deleting some elements (possibly none) without changing the order of the remaining elements.

**Constraints:**
- `2 <= arrays.length <= 100`
- `1 <= arrays[i].length <= 100`
- `1 <= arrays[i][j] <= 100`
- `arrays[i]` is sorted in **strictly increasing** order.

---

## 2. Approach: Count Intersection — O(n·L) ✅

Since arrays are sorted, common elements appear in all arrays. Count occurrences across arrays.

```
FUNCTION longestCommonSubseq(arrays):
    // Count frequency of each element across all arrays
    count ← empty map
    FOR arr IN arrays:
        FOR num IN arr:
            SET count[num] ← count.get(num, 0) + 1
    // Collect elements present in every array
    RETURN sorted [num FOR num, c IN count.items() IF c = length(arrays)]
```

| Time | Space |
|------|-------|
| O(total elements) | O(total elements) |

---

## 3. Examples

**Example 1:**
```
Input: arrays = [[1,3,4],
                 [1,4,7,9]]
Output: [1,4]
Explanation: The longest common subsequence in the two arrays is [1,4].
```

**Example 2:**
```
Input: arrays = [[2,3,6,8],
                 [1,2,3,5,6,7,10],
                 [2,3,4,6,9]]
Output: [2,3,6]
Explanation: The longest common subsequence in all three arrays is [2,3,6].
```

**Example 3:**
```
Input: arrays = [[1,2,3,4,5],
                 [6,7,8]]
Output: []
Explanation: There is no common subsequence between the two arrays.
```

---

## 4. Walkthrough

| Step | Action | Result |
|------|--------|--------|
| 1 | Initialize empty frequency map | {}
| 2 | Iterate first array, update counts → {1:1,2:1,3:1,4:1}
| 3 | Iterate second array, update counts → {1:1,2:2,3:2,4:1,5:1,6:1}
| 4 | Iterate third array, update counts → {1:1,2:3,3:3,4:1,5:1,6:1,7:1,8:1}
| 5 | Filter keys with count = 3 (number of arrays) → [2,3]
| 6 | Return sorted result | [2,3]
```

---

## 5. Complexity Analysis

- **Time:** O(total elements) – each element is visited once.
- **Space:** O(total distinct elements) for the frequency map.

---

## 6. Follow-Up Questions

- How would the solution change if the arrays could contain duplicate values?
- Can you solve the problem with O(1) extra space assuming the arrays are read-only?
- What if the arrays are not sorted? Which algorithm would you use then?

---

## Key Takeaway

> Since arrays are sorted and contain distinct elements, the common subsequence is exactly the set intersection. Elements in all arrays form the answer (sorted order preserved).
