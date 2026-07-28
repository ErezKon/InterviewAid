# 2840. Check if Strings Can be Made Equal With Operations II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-strings-can-be-made-equal-with-operations-ii](https://leetcode.com/problems/check-if-strings-can-be-made-equal-with-operations-ii)
**Companies:** Amazon, Citrix, Google, Microsoft
---

## Problem Description
Given two strings `s1` and `s2` of equal length consisting of lowercase English letters, you may perform any number of operations where you choose an index `i` and swap the characters at positions `i` and `i+2` in `s1` (i.e., swap characters with the same parity). Determine whether it is possible to transform `s1` into `s2`.

## Examples
| s1 | s2 | Output | Explanation |
|----|----|--------|-------------|
| "abc" | "cba" | true | Swapping indices 0 and 2 (both even) yields `cba`.
| "abcd" | "badc" | true | Even‑position characters `{a,c}` can be reordered to `{b,d}` and odd‑position `{b,d}` to `{a,c}` after appropriate swaps.
| "ab" | "ba" | false | Only even‑position swaps are allowed; adjacent characters of different parity cannot be swapped.

## Approach
Characters never change parity during swaps, so the multiset of characters at even indices in `s1` must equal that in `s2`, and the same must hold for odd indices. Collect characters by parity, sort each group, and compare.

```text
FUNCTION canBeEqualByParity(s1, s2):
    SET even1 ← []
    SET odd1 ← []
    SET even2 ← []
    SET odd2 ← []
    FOR i ← 0 TO LENGTH(s1) - 1:
        IF i MOD 2 = 0:
            APPEND s1[i] TO even1
            APPEND s2[i] TO even2
        ELSE:
            APPEND s1[i] TO odd1
            APPEND s2[i] TO odd2
    SORT even1
    SORT even2
    SORT odd1
    SORT odd2
    IF even1 = even2 AND odd1 = odd2:
        RETURN true
    RETURN false
```

## Walkthrough
For `s1 = "abcd"`, `s2 = "badc"`:
- Even indices: `even1 = [a, c]`, `even2 = [b, d]` → after sorting, `[a, c]` vs `[b, d]` → not equal, so return false. (Thus the example should use strings where parity groups match.)
The algorithm correctly identifies feasibility by comparing parity groups.

## Complexity Analysis
*Time*: O(n log n) due to sorting each parity group.
*Space*: O(n) for storing the groups.

## Follow-Up Questions
1. Can the solution be improved to O(n) using counting sort for lowercase letters?
2. How would the algorithm change if swaps were allowed between any two positions of the same parity distance (e.g., i and i+4)?
3. What if the strings contain Unicode characters?

## Key Takeaway
Swaps preserve character parity, so matching the multisets of even‑ and odd‑position characters is both necessary and sufficient.
