# 2840. Check if Strings Can be Made Equal With Operations II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-strings-can-be-made-equal-with-operations-ii](https://leetcode.com/problems/check-if-strings-can-be-made-equal-with-operations-ii)
**Companies:** Amazon, Citrix, Google, Microsoft
---

## Problem Description
You are given two strings `s1` and `s2`, both of length `n`, consisting of **lowercase** English letters.

You can apply the following operation on **any** of the two strings **any** number of times:

- Choose any two indices `i` and `j` such that `i < j` and the difference `j - i` is **even**, then **swap** the two characters at those indices in the string.

Return `true` *if you can make the strings* `s1` *and* `s2` *equal, and* `false` *otherwise*.

**Constraints:**
- `n == s1.length == s2.length`
- `1 <= n <= 10^5`
- `s1` and `s2` consist only of lowercase English letters.

## Examples
```
Example 1:
  Input: s1 = "abcdba", s2 = "cabdab"
  Output: true
  Explanation: We can apply the following operations on s1:
  - Choose the indices i = 0, j = 2. The resulting string is s1 = "cbadba".
  - Choose the indices i = 2, j = 4. The resulting string is s1 = "cbbdaa".
  - Choose the indices i = 1, j = 5. The resulting string is s1 = "cabdab" = s2.
```

```
Example 2:
  Input: s1 = "abe", s2 = "bea"
  Output: false
  Explanation: It is not possible to make the two strings equal.
```

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
