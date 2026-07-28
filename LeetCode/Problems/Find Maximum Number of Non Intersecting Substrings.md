# 3557. Find Maximum Number of Non Intersecting Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-maximum-number-of-non-intersecting-substrings](https://leetcode.com/problems/find-maximum-number-of-non-intersecting-substrings)
**Companies:** Bloomberg

---

## Problem Description
Given a string `s` consisting of lowercase English letters, you may select a set of substrings such that no two selected substrings intersect (share any index). Each selected substring must satisfy that for every character `c` appearing in it, all occurrences of `c` in the original string `s` are contained within that substring. Return the maximum possible number of such non‑intersecting substrings.

## Examples
**Example 1**
```
Input: s = "adefaddaccc"
Output: 2
Explanation: Choose substrings "adefadda" (covers a,d,e,f) and "ccc".
```
**Example 2**
```
Input: s = "abab"
Output: 1
Explanation: The whole string is the only valid substring covering a and b.
```

## Approach
First, compute for each character its first and last occurrence. Then, for each position `i`, expand a candidate interval to include the full range of every character seen so far. If the interval closes (i reaches the maximum last index of characters inside), it forms a valid substring. Collect all such intervals, sort by end index, and greedily pick non‑overlapping ones.

### Pseudocode
```text
FUNCTION maxNonIntersectingSubstrings(s):
    SET first ← map with default INF
    SET last  ← map with default -1
    FOR i ← 0 TO LENGTH(s)-1:
        SET ch ← s[i]
        SET first[ch] ← MIN(first[ch], i)
        SET last[ch]  ← MAX(last[ch], i)
    SET intervals ← []
    FOR i ← 0 TO LENGTH(s)-1:
        SET start ← i
        SET end   ← last[s[i]]
        SET j ← i
        WHILE j ≤ end:
            SET ch ← s[j]
            IF first[ch] < start:
                SET start ← first[ch]
                SET j ← start   // restart scanning from new start
                SET end ← MAX(end, last[ch])
            ELSE:
                SET end ← MAX(end, last[ch])
                INCREMENT j
        IF start == i:   // interval closed correctly
            APPEND [start, end] TO intervals
    SORT intervals BY end ASCENDING
    SET count ← 0
    SET prevEnd ← -1
    FOR each [l, r] IN intervals:
        IF l > prevEnd:
            INCREMENT count
            SET prevEnd ← r
    RETURN count
```

## Walkthrough
For `s = "adefaddaccc"` the algorithm discovers intervals `[0,7]` ("adefadda") and `[8,10]` ("ccc"). Selecting both yields the maximum count `2`.

## Complexity Analysis
- **Time:** O(n) to compute first/last positions plus O(n) to build intervals and O(k log k) to sort intervals (k ≤ n).
- **Space:** O(n) for the maps and interval list.

## Follow‑Up Questions
1. How would the solution change if overlapping substrings were allowed but you wanted to maximize total length?
2. Can this be extended to uppercase letters or Unicode characters?
3. What is the effect of using a segment tree to avoid sorting intervals?

## Key Takeaway
By expanding intervals to fully contain all occurrences of their characters, the problem reduces to selecting the maximum number of non‑overlapping intervals via a greedy schedule.
