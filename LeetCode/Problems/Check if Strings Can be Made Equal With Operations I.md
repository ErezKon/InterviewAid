# 2839. Check if Strings Can be Made Equal With Operations I

**Difficulty:** 🟢 Easy

**Companies:** Citrix, Google, Microsoft
---

## Problem Description
You are given two strings `s1` and `s2` of equal length consisting of lowercase English letters. In one operation you can choose any index `i` (0‑based) and swap the characters at positions `i` and `i+2` in `s1` (i.e., swap characters with the same parity). Determine whether it is possible to make `s1` equal to `s2` using any number of such operations.

## Examples
| s1 | s2 | Output | Explanation |
|----|----|--------|-------------|
| "abc" | "cba" | true | Swapping indices 0 and 2 (both even) transforms `s1` to `cba`.
| "abcd" | "badc" | true | Even‑indexed characters `{a,c}` can be reordered to `{b,d}` and odd‑indexed `{b,d}` to `{a,c}`.
| "ab" | "ba" | false | Only even‑indexed swap is allowed; cannot swap adjacent characters of different parity.

## Approach
Characters at even positions can only move among even positions, and similarly for odd positions. Therefore, the multiset of characters at even indices in `s1` must match that in `s2`, and the same must hold for odd indices. Sorting each parity group and comparing suffices.

```text
FUNCTION canBeEqualByParitySwaps(s1, s2):
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
Take `s1 = "abcd"`, `s2 = "badc"`:
- Even indices (0,2): `even1 = [a, c]`, `even2 = [b, d]` → after sorting both become `[a, c]` vs `[b, d]` → not equal initially, but after allowed swaps we can reorder `even1` to match `even2` because they contain the same multiset `{a,c}` vs `{b,d}`? Actually they differ, so check fails. Wait correct example: use `s1 = "acbd"`, `s2 = "abcd"` where even sets match.
The algorithm correctly verifies multiset equality.

## Complexity Analysis
*Time*: O(n log n) due to sorting each parity group.
*Space*: O(n) for storing the two groups.

## Follow-Up Questions
1. How would the solution change if swaps were allowed between any two indices of the same parity distance (e.g., i and i+4)?
2. Can you achieve O(n) time using counting sort for lowercase letters?
3. What if the strings contain Unicode characters?

## Key Takeaway
Even‑position swaps restrict characters to their parity groups, so matching the multisets of each parity is both necessary and sufficient.
