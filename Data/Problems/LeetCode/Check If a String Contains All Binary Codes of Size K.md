# 1461. Check If a String Contains All Binary Codes of Size K

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-a-string-contains-all-binary-codes-of-size-k](https://leetcode.com/problems/check-if-a-string-contains-all-binary-codes-of-size-k)
**Companies:** Amazon, Google, Grammarly, Meta, Microsoft

---

## Problem Description
Given a binary string `s` and an integer `k`, return `true` *if every binary code of length* `k` *is a substring of* `s`. Otherwise, return `false`.

**Constraints:**
- `1 <= s.length <= 5 * 10^5`
- `s[i]` is either `'0'` or `'1'`.
- `1 <= k <= 20`

## Examples
```
Example 1:
  Input: s = "00110110", k = 2
  Output: true
  Explanation: The binary codes of length 2 are "00", "01", "10" and "11". They can be all found as substrings at indices 0, 1, 3 and 2 respectively.
```

```
Example 2:
  Input: s = "0110", k = 1
  Output: true
  Explanation: The binary codes of length 1 are "0" and "1", it is clear that both exist as a substring.
```

```
Example 3:
  Input: s = "0110", k = 2
  Output: false
  Explanation: The binary code "00" is of length 2 and does not exist in the array.
```

## Approach
Use a sliding window of size `k` to extract each substring, store it in a hash set, and stop early if the set reaches size `2^k`.

```text
FUNCTION hasAllCodes(s, k):
    SET required ← 2 ^ k
    SET seen ← EMPTY SET
    FOR i ← 0 TO LENGTH(s) - k:
        SET code ← SUBSTRING(s, i, i + k)
        ADD code TO seen
        IF SIZE(seen) == required:
            RETURN true
    RETURN false
```

## Walkthrough
| i | window | seen set size |
|---|--------|---------------|
|0|"00"|1|
|1|"01"|2|
|2|"11"|3|
|3|"10"|4 → required reached, return true |
The algorithm stops as soon as all codes are observed.

## Complexity Analysis
- **Time:** O(N) where N = length of `s` (each window processed once).
- **Space:** O(2^k) for the hash set, bounded by at most 2^20 ≈ 1 048 576 entries.

## Follow-Up Questions
1. How would you implement the solution using bit manipulation to avoid storing strings?
2. Can you solve the problem in O(1) additional space by using a rolling integer representation?
3. How would the approach change if the alphabet were larger than binary?

## Key Takeaway
A sliding window combined with a hash set efficiently checks for the presence of all fixed-length substrings.
