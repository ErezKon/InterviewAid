# 2271. Maximum White Tiles Covered by a Carpet

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-white-tiles-covered-by-a-carpet](https://leetcode.com/problems/maximum-white-tiles-covered-by-a-carpet)
**Companies:** Google, Lti

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a 2D integer array `tiles` where `tiles[i] = [l_i, r_i]` represents that every tile `j` in the range `l_i <= j <= r_i` is colored white.

You are also given an integer `carpetLen`, the length of a single carpet that can be placed **anywhere**.

Return *the **maximum** number of white tiles that can be covered by the carpet*.

**Constraints:**
- `1 <= tiles.length <= 5 * 10^4`
- `tiles[i].length == 2`
- `1 <= l_i <= r_i <= 10^9`
- `1 <= carpetLen <= 10^9`
- The `tiles` are **non-overlapping**.

---

## Examples

**Example 1:**
```
Input: tiles = [[1,5],[10,11],[12,18],[20,25],[30,32]], carpetLen = 10
Output: 9
Explanation: Place the carpet starting on tile 10.
It covers 9 white tiles, so we return 9.
Note that there may be other places where the carpet covers 9 white tiles.
It can be shown that the carpet cannot cover more than 9 white tiles.
```

**Example 2:**
```
Input: tiles = [[10,11],[1,1]], carpetLen = 2
Output: 2
Explanation: Place the carpet starting on tile 10.
It covers 2 white tiles, so we return 2.
```

---

## Key Insight

> The optimal carpet placement always starts at the **left edge** of some tile range. Sort tiles by left endpoint, then use a **sliding window** with prefix sums to compute coverage for each candidate start position.

---

## Approach

```
FUNCTION maximumWhiteTiles(tiles, carpetLen):
    SORT tiles BY left endpoint
    n ← LEN(tiles)
    
    // Build prefix sum of tile lengths
    prefix ← ARRAY[n+1] filled with 0
    FOR i ← 0 TO n-1 DO
        prefix[i+1] ← prefix[i] + (tiles[i][1] - tiles[i][0] + 1)
    
    result ← 0
    j ← 0
    
    FOR i ← 0 TO n-1 DO
        // Carpet starts at tiles[i][0], ends at tiles[i][0] + carpetLen - 1
        carpetEnd ← tiles[i][0] + carpetLen - 1
        
        // Advance j to find the last tile group partially/fully covered
        WHILE j < n AND tiles[j][0] ≤ carpetEnd DO
            j ← j + 1
        // j is now one past the last fully-coverable tile start
        
        // Full tiles covered: prefix[j-1] - prefix[i]
        // Partial coverage of tile at j-1 if it extends beyond carpet
        fullCover ← prefix[j] - prefix[i]
        
        // If the last tile (j-1) extends beyond carpet, subtract overflow
        IF j > 0 AND tiles[j-1][1] > carpetEnd THEN
            overflow ← tiles[j-1][1] - carpetEnd
            fullCover ← fullCover - overflow
        
        result ← MAX(result, fullCover)
    
    RETURN result
```

---

## Walkthrough

```
tiles = [[1,5],[10,11],[12,18],[20,25]], carpetLen = 10
Sorted: [[1,5],[10,11],[12,18],[20,25]]
Prefix: [0, 5, 7, 14, 20]

i=0: carpet [1,10], carpetEnd=10
  j advances to 2 (tiles[2][0]=12 > 10)
  fullCover = prefix[2]-prefix[0] = 7
  tiles[1][1]=11 > 10 → overflow=1, fullCover=7-1=6
  result=6

i=1: carpet [10,19], carpetEnd=19
  j advances to 3 (tiles[3][0]=20 > 19)
  fullCover = prefix[3]-prefix[1] = 14-5 = 9
  tiles[2][1]=18 ≤ 19 → no overflow
  result=9

Return 9 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + sliding window + prefix sum | **O(n log n)** | **O(n)** |

---

## Follow-Up Questions

1. **Why must the carpet start at a tile's left edge?** If the carpet doesn't start at a tile edge, shifting it left until it aligns can only increase or maintain coverage.
2. **Can binary search replace the sliding window?** Yes — binary search for the rightmost tile start ≤ `carpetEnd`, but two-pointer is simpler and same complexity.
3. **What if tiles overlap?** Merge overlapping tiles first, then apply the same algorithm.

---

## Key Takeaway

> **Sort + prefix sum + sliding window** is the template for "place a fixed-length window to maximize coverage of intervals" — always anchor the window at an interval boundary.

---
