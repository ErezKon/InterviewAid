# 710. Random Pick with Blacklist

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/random-pick-with-blacklist](https://leetcode.com/problems/random-pick-with-blacklist)
**Companies:** Amazon, Google, Uber

---

## Problem Description
Design a class that, given an integer `n` and a list `blacklist` of distinct integers in the range `[0, n-1]`, supports a method `pick()` which returns a random integer from the set `[0, n-1] \ blacklist`. Each valid integer must be returned with equal probability. The constructor may perform preprocessing, but `pick()` should run in O(1) time.

## Examples
**Example 1:**
```
Solution obj = new Solution(7, [2,3,5])
obj.pick() // could return any of {0,1,4,6} uniformly
obj.pick() // independent random choice
```
**Example 2:**
```
Solution obj = new Solution(3, [])
obj.pick() // returns 0, 1, or 2 uniformly
```

## Approach
**Hash Mapping – Remap Blacklisted Indices**
Treat the allowed numbers as a pool of size `size = n - len(blacklist)`. For each blacklisted number `b` that falls within the first `size` positions, map it to a non‑blacklisted number from the tail `[size, n)`. Store these mappings in a hash table.
When `pick()` is called:
1. Generate a random integer `r` in `[0, size-1]`.
2. If `r` is a key in the map, return `map[r]`; otherwise return `r`.
The preprocessing runs in O(|blacklist|) time, and each `pick()` is O(1).

```text
CLASS RandomPickWithBlacklist:
    CONSTRUCTOR(n, blacklist):
        SET size ← n - LENGTH(blacklist)
        SET blackSet ← SET(blacklist)
        SET mapping ← DICTIONARY()
        SET j ← n - 1
        FOR b IN blacklist:
            IF b < size:
                WHILE j IN blackSet:
                    SET j ← j - 1
                SET mapping[b] ← j
                SET j ← j - 1

    FUNCTION pick():
        SET randIdx ← RANDOM_INTEGER(0, size - 1)
        RETURN mapping.GET(randIdx, randIdx)
```

## Walkthrough
For `n = 7`, `blacklist = [2,3,5]`:
- `size = 4` (allowed numbers count).
- Blacklisted numbers `< size` are `2` and `3`.
- Tail numbers not in blacklist are `4` and `6`.
- Map `2 → 6`, `3 → 4`.
Calling `pick()` generates `randIdx` in `[0,3]`. If it is `2` or `3`, the map redirects to `6` or `4`; otherwise it returns the index itself, yielding a uniform selection among `{0,1,4,6}`.

## Complexity Analysis
Time: O(|blacklist|) preprocessing; O(1) per `pick()`.
Space: O(|blacklist|) for the hash map.

## Follow‑Up Questions
1. How would you adapt the solution if `pick()` needed to support removal of returned numbers?
2. Can the approach be extended to handle multiple blacklists for different ranges?
3. What are the trade‑offs of using a balanced tree instead of a hash map for deterministic ordering?

## Key Takeaway
By remapping blacklisted indices in the first part of the range to valid indices in the tail, we achieve constant‑time uniform random selection without storing the entire allowed set.
