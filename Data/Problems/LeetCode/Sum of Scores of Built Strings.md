# 2223. Sum of Scores of Built Strings

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sum-of-scores-of-built-strings](https://leetcode.com/problems/sum-of-scores-of-built-strings)
**Companies:** Amazon

---

## Problem Description

> *Note: the original description built by **appending**; the official problem **prepends**, so `s_i` is the length-`i` **suffix** of `s` and its score is `LCP(s_i, s)`. The Z-function Approach below (answer = `n + Σ_{i≥1} Z[i]`) is correct; the old examples (collapsed below) used the wrong definition.*

You are **building** a string `s` of length `n` **one** character at a time, **prepending** each new character to the **front** of the string. The strings are labeled from `1` to `n`, where the string with length `i` is labeled `s_i`.

- For example, for `s = "abaca"`, `s_1 == "a"`, `s_2 == "ca"`, `s_3 == "aca"`, etc.

The **score** of `s_i` is the length of the **longest common prefix** between `s_i` and `s_n` (Note that `s == s_n`).

Given the final string `s`, return *the **sum** of the **score** of every* `s_i`.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists of lowercase English letters.

## Examples

**Example 1:**
```
Input: s = "babab"
Output: 9
Explanation:
For s1 == "b", the longest common prefix is "b" which has a score of 1.
For s2 == "ab", there is no common prefix so the score is 0.
For s3 == "bab", the longest common prefix is "bab" which has a score of 3.
For s4 == "abab", there is no common prefix so the score is 0.
For s5 == "babab", the longest common prefix is "babab" which has a score of 5.
The sum of the scores is 1 + 0 + 3 + 0 + 5 = 9, so we return 9.
```

**Example 2:**
```
Input: s = "azbazbzaz"
Output: 14
Explanation:
For s2 == "az", the longest common prefix is "az" which has a score of 2.
For s6 == "azbzaz", the longest common prefix is "azb" which has a score of 3.
For s9 == "azbazbzaz", the longest common prefix is "azbazbzaz" which has a score of 9.
For all other si, the score is 0.
The sum of the scores is 2 + 3 + 9 = 14, so we return 14.
```

<!-- previous non-official examples (kept for the Walkthrough) -->
<details><summary>Old examples</summary>

**Old Example 1:**
```
Input: s = "abcdabc"
Output: 10
Explanation:
Prefixes and their scores:
"a" → 1 ("a" matches prefix "a")
"ab" → 1 ("a")
"abc" → 1 ("a")
"abcd" → 1 ("a")
"abcda" → 2 ("ab")
"abcdab" → 3 ("abc")
"abcdabc" → 7 (full string)
Sum = 1+1+1+1+2+3+7 = 16 (actual LeetCode answer is 10 due to definition; this example illustrates the concept).
```

**Example 2:**
```
Input: s = "zzzz"
Output: 10
Explanation: Scores are 1,2,3,4 → sum = 10.
```

</details>

## Approach
The score of each prefix corresponds to the length of the longest prefix of `s` that also appears starting at that position – exactly the definition of the **Z-function**. Computing the Z-array for `s` in linear time gives the score for every prefix (except the first, which contributes `n`). The answer is `n + Σ Z[i]` for `i = 1 … n-1`.

### Pseudocode
```text
FUNCTION sumOfScores(s):
    n ← LENGTH(s)
    z ← ARRAY of size n filled with 0
    l ← 0, r ← 0
    FOR i ← 1 TO n-1:
        IF i ≤ r:
            z[i] ← MIN(r - i + 1, z[i - l])
        WHILE i + z[i] < n AND s[z[i]] = s[i + z[i]]:
            z[i] ← z[i] + 1
        IF i + z[i] - 1 > r:
            l ← i
            r ← i + z[i] - 1
    total ← n
    FOR i ← 1 TO n-1:
        total ← total + z[i]
    RETURN total
```

## Walkthrough
Consider `s = "zzzz"`:
| i | z[i] computation | z[i] |
|---|------------------|------|
|1|`s[0]` matches `s[1]` → extend while equal|3|
|2|within window `[1,3]`, copy min → 2|2|
|3|within window, copy min → 1|1|
Sum = n (4) + 3 + 2 + 1 = 10.

## Complexity Analysis
- **Time:** `O(n)` – single pass Z-algorithm.
- **Space:** `O(n)` for the Z-array (can be reduced to `O(1)` with on-the-fly accumulation).

## Follow-Up Questions
1. How would you modify the algorithm to return the scores for each prefix individually?
2. Can the same technique be applied to compute the sum of prefix function (KMP) values?
3. How would you handle the problem if the definition of score used the longest *proper* prefix-suffix?

## Key Takeaway
The Z-algorithm transforms the “longest prefix-suffix for every prefix” problem into a linear-time computation, allowing the sum of scores to be obtained by a simple accumulation of the Z-array.
