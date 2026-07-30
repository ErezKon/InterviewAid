# 1940. Longest Common Subsequence Between Sorted Arrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-common-subsequence-between-sorted-arrays](https://leetcode.com/problems/longest-common-subsequence-between-sorted-arrays)
**Companies:** Google

---

## 1. Problem Description

Given multiple sorted arrays, find the longest common subsequence across all of them.

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
Input: arrays = [[1,2,3,4],[2,3,5,6],[2,3,7,8]]
Output: [2,3]
Explanation: 2 and 3 appear in all three arrays, forming the longest common subsequence.
```

**Example 2:**
```
Input: arrays = [[1,5,9],[2,6,10],[3,7,11]]
Output: []
Explanation: No element is common to all arrays.
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

## 6. Follow‑Up Questions

- How would the solution change if the arrays could contain duplicate values?
- Can you solve the problem with O(1) extra space assuming the arrays are read‑only?
- What if the arrays are not sorted? Which algorithm would you use then?

---

## Key Takeaway

> Since arrays are sorted and contain distinct elements, the common subsequence is exactly the set intersection. Elements in all arrays form the answer (sorted order preserved).
