# 1923. Longest Common Subpath

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-common-subpath](https://leetcode.com/problems/longest-common-subpath)
**Companies:** Amazon

---

## 1. Problem Description

Given `n` friends walking through cities, find the longest subpath common to all friends' paths.

---

## 2. Approach: Binary Search + Rolling Hash — O(n·L·log L) ✅

```
// Binary search on path length
// For each candidate length, use rolling hash on each friend's path
// Intersect hash sets across all friends
// If intersection non-empty → length is feasible
```

| Time | Space |
|------|-------|
| O(n · L · log L) | O(L) |

---

## 3. Examples

**Example 1:**
```
Input: n = 3, paths = [[0,1,2,3,4],[2,3,4,5,6],[1,2,3,4,7]]
Output: 3
Explanation: The subpath [2,3,4] appears in all three paths and is the longest such subpath.
```

**Example 2:**
```
Input: n = 2, paths = [[0,1,2],[3,4,5]]
Output: 0
Explanation: No common subpath exists.
```

---

## 4. Walkthrough

| Step | Action | Result |
|------|--------|--------|
| 1 | Set low = 0, high = min length of all paths |
| 2 | Mid = (low+high)//2, compute rolling hashes of length Mid for each path |
| 3 | Intersect hash sets; if non‑empty, a common subpath exists → set low = Mid+1 |
| 4 | Else set high = Mid-1 |
| 5 | Continue until low > high; answer = high |

The binary search narrows the maximum feasible length, while rolling hash provides O(1) subpath comparison.

---

## 5. Complexity Analysis

- **Time:** O(n·L·log L) — binary search over length with O(n·L) hashing per iteration.
- **Space:** O(L) for hash sets of the current length.

---

## 6. Follow‑Up Questions

- How would you adapt the solution if the paths were given as strings of characters instead of integer city IDs?
- Can you reduce the time complexity using suffix automata or suffix arrays?
- What changes are needed if we need the actual subpath(s) rather than just the length?

---

## Key Takeaway

> Binary search the answer length. For each candidate, compute rolling hashes of all subpaths per friend, then intersect sets. Use double hashing to avoid collisions.
