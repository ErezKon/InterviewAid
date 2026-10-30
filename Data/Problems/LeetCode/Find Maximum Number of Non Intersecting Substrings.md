# 3557. Find Maximum Number of Non Intersecting Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-maximum-number-of-non-intersecting-substrings](https://leetcode.com/problems/find-maximum-number-of-non-intersecting-substrings)
**Companies:** Bloomberg

---

## Problem Description
> *Note: statement verified against the official LeetCode page. The old description/Approach (substrings that contain all occurrences of their characters — that is #1520) belong to a different problem; the official solution is a greedy scan keeping the last positions of each letter and cutting as soon as a length ≥ 4 substring with equal ends closes.*

You are given a string `word`.

Return the **maximum** number of non-intersecting **substrings** of `word` that are at **least** four characters long and start and end with the same letter.

**Constraints:**
- `1 <= word.length <= 2 * 10^5`
- `word` consists only of lowercase English letters.

## Examples
```
Example 1:
  Input: word = "abcdeafdef"
  Output: 2
  Explanation: The two substrings are "abcdea" and "fdef".
```

```
Example 2:
  Input: word = "bcdaaaab"
  Output: 1
  Explanation: The only substring is "aaaa". Note that we cannot also choose "bcdaaaab" since it intersects with the other substring.
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
