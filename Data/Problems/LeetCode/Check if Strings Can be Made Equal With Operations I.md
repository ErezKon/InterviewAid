# 2839. Check if Strings Can be Made Equal With Operations I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-strings-can-be-made-equal-with-operations-i](https://leetcode.com/problems/check-if-strings-can-be-made-equal-with-operations-i)

**Companies:** Citrix, Google, Microsoft
---

## Problem Description
You are given two strings `s1` and `s2`, both of length `4`, consisting of **lowercase** English letters.

You can apply the following operation on any of the two strings **any** number of times:

- Choose any two indices `i` and `j` such that `j - i = 2`, then **swap** the two characters at those indices in the string.

Return `true` *if you can make the strings* `s1` *and* `s2` *equal, and* `false` *otherwise*.

**Constraints:**
- `s1.length == s2.length == 4`
- `s1` and `s2` consist only of lowercase English letters.

## Examples
```
Example 1:
  Input: s1 = "abcd", s2 = "cdab"
  Output: true
  Explanation: We can do the following operations on s1:
  - Choose the indices i = 0, j = 2. The resulting string is s1 = "cbad".
  - Choose the indices i = 1, j = 3. The resulting string is s1 = "cdab" = s2.
```

```
Example 2:
  Input: s1 = "abcd", s2 = "dacb"
  Output: false
  Explanation: It is not possible to make the two strings equal.
```

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
Even-position swaps restrict characters to their parity groups, so matching the multisets of each parity is both necessary and sufficient.
