# 1923. Longest Common Subpath

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-common-subpath](https://leetcode.com/problems/longest-common-subpath)
**Companies:** Amazon

---

## 1. Problem Description

There is a country of `n` cities numbered from `0` to `n - 1`. In this country, there is a road connecting **every pair** of cities.

There are `m` friends numbered from `0` to `m - 1` who are traveling through the country. Each one of them will take a path consisting of some cities. Each path is represented by an integer array that contains the visited cities in order. The path may contain a city **more than once**, but the same city will not be listed consecutively.

Given an integer `n` and a 2D integer array `paths` where `paths[i]` is an integer array representing the path of the `i^th` friend, return *the length of the **longest common subpath** that is shared by **every** friend's path, or *`0`* if there is no common subpath at all*.

A **subpath** of a path is a contiguous sequence of cities within that path.

**Constraints:**
- `1 <= n <= 10^5`
- `m == paths.length`
- `2 <= m <= 10^5`
- `sum(paths[i].length) <= 10^5`
- `0 <= paths[i][j] < n`
- The same city is not listed multiple times consecutively in `paths[i]`.

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
Input: n = 5, paths = [[0,1,2,3,4],
                       [2,3,4],
                       [4,0,1,2,3]]
Output: 2
Explanation: The longest common subpath is [2,3].
```

**Example 2:**
```
Input: n = 3, paths = [[0],[1],[2]]
Output: 0
Explanation: There is no common subpath shared by the three paths.
```

**Example 3:**
```
Input: n = 5, paths = [[0,1,2,3,4],
                       [4,3,2,1,0]]
Output: 1
Explanation: The possible longest common subpaths are [0], [1], [2], [3], and [4]. All have a length of 1.
```

---

## 4. Walkthrough

| Step | Action | Result |
|------|--------|--------|
| 1 | Set low = 0, high = min length of all paths |
| 2 | Mid = (low+high)//2, compute rolling hashes of length Mid for each path |
| 3 | Intersect hash sets; if non-empty, a common subpath exists → set low = Mid+1 |
| 4 | Else set high = Mid-1 |
| 5 | Continue until low > high; answer = high |

The binary search narrows the maximum feasible length, while rolling hash provides O(1) subpath comparison.

---

## 5. Complexity Analysis

- **Time:** O(n·L·log L) — binary search over length with O(n·L) hashing per iteration.
- **Space:** O(L) for hash sets of the current length.

---

## 6. Follow-Up Questions

- How would you adapt the solution if the paths were given as strings of characters instead of integer city IDs?
- Can you reduce the time complexity using suffix automata or suffix arrays?
- What changes are needed if we need the actual subpath(s) rather than just the length?

---

## Key Takeaway

> Binary search the answer length. For each candidate, compute rolling hashes of all subpaths per friend, then intersect sets. Use double hashing to avoid collisions.
