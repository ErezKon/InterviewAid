# 1531. String Compression II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/string-compression-ii](https://leetcode.com/problems/string-compression-ii)
**Companies:** Amazon, Github, Google, Microsoft, Toptal

---

## Problem Description
Given a string `s` consisting of lowercase letters and an integer `k`, you may delete at most `k` characters from `s`. After deletions, the string is compressed using the following run‑length encoding: each group of consecutive identical characters is replaced by the character followed by the length of the group (the length is omitted if it is 1). Return the minimum possible length of the compressed string.

## Examples
- **Input:** `s = "aaabcccd", k = 2` **Output:** `4` // Delete two `'c'`s to get `"aaabdd"` → compressed as `"a3bd2"` length 4.
- **Input:** `s = "aaaaaaaaaaa", k = 0` **Output:** `3` // Compressed as `"a11"`.
- **Input:** `s = "aabbaa", k = 2` **Output:** `2` // Delete two `'b'`s → `"aaaa"` → `"a4"`.

## Approach
**Algorithm:** Dynamic Programming with memoization.
- **Insight 1:** For each position `i` and remaining deletions `k`, we decide either to delete `s[i]` or keep it and form a group of identical characters.
- **Insight 2:** While extending a group, we track how many characters are the same (`same`) and how many different characters we would need to delete (`diff`). The encoded length of a group depends on the count (`1` → 1 char, `2‑9` → 2 chars, `10‑99` → 3 chars, etc.).
- **State:** `dp(i, k)` = minimum compressed length for suffix starting at `i` with at most `k` deletions.
- **Transition:**
  1. Delete `s[i]`: `dp(i+1, k-1)`.
  2. Keep `s[i]` and extend a group to `j` while deleting at most `k` non‑matching chars: `encodedLen(same) + dp(j+1, k - diff)`.
- **Base Cases:** `i == n` → 0; `k < 0` → ∞.

### Pseudocode
```text
FUNCTION getLengthOfOptimalCompression(s, k):
    n ← LENGTH(s)
    CREATE memo map
    RETURN dp(0, k)

FUNCTION dp(i, k):
    IF k < 0: RETURN INF
    IF i = n: RETURN 0
    IF (i, k) IN memo: RETURN memo[(i, k)]
    // Option 1: delete current character
    best ← dp(i+1, k-1)
    same ← 0
    diff ← 0
    FOR j ← i TO n-1:
        IF s[j] = s[i]:
            same ← same + 1
        ELSE:
            diff ← diff + 1
        IF diff > k: BREAK
        best ← MIN(best, encodedLen(same) + dp(j+1, k - diff))
    memo[(i, k)] ← best
    RETURN best

FUNCTION encodedLen(count):
    IF count = 1: RETURN 1          // just the character
    ELSE IF count < 10: RETURN 2    // char + single digit
    ELSE IF count < 100: RETURN 3   // char + two digits
    ELSE: RETURN 4                  // char + three digits (max length ≤ 100)
```

## Walkthrough
Consider `s = "aaabcccd", k = 2`.
1. Start `dp(0,2)`. Deleting first `'a'` leads to `dp(1,1)`.
2. Keeping `'a'` and extending to index 2 gives `same=3, diff=0`, encoded length = 2 (`a3`). Recurse `dp(3,2)` on remaining `"bcccd"`.
3. At `dp(3,2)`, best is to delete `'b'` (cost `dp(4,1)`) and then form a group of `'c'`s (delete one `'c'` to make `same=3`). Final length = 2 (for `a3`) + 2 (for `c3`) = 4.
Thus the optimal compressed length is 4.

## Complexity Analysis
- **Time:** O(n²·k) – for each state `(i,k)` we scan forward up to `n` characters.
- **Space:** O(n·k) for memoization table.

## Follow-Up Questions
- How would the solution change if deletions could be performed anywhere after compression (i.e., you could delete characters from the compressed string)?
- Can the DP be optimized to O(n·k) using smarter grouping techniques?
- What if the alphabet size is large (e.g., Unicode characters)?

## Key Takeaway
Model the problem as a DP over positions and remaining deletions, enumerating possible groups while accounting for deletions needed to form them.
