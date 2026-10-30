# 2430. Maximum Deletions on a String

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-deletions-on-a-string](https://leetcode.com/problems/maximum-deletions-on-a-string)
**Companies:** De Shaw

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: DP + LCP — O(n²)](#approach-dp--lcp--on²-)
- [Complexity Analysis](#complexity-analysis)
- [Examples](#examples)
- [Walkthrough](#walkthrough)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a string `s` consisting of only lowercase English letters. In one operation, you can:

- Delete **the entire string** `s`, or
- Delete the **first** `i` letters of `s` if the first `i` letters of `s` are **equal** to the following `i` letters in `s`, for any `i` in the range `1 <= i <= s.length / 2`.

For example, if `s = "ababc"`, then in one operation, you could delete the first two letters of `s` to get `"abc"`, since the first two letters of `s` and the following two letters of `s` are both equal to `"ab"`.

Return *the **maximum** number of operations needed to delete all of *`s`.

**Constraints:**
- `1 <= s.length <= 4000`
- `s` consists only of lowercase English letters.

---

## Key Insight

> `dp[i]` = max deletions starting from index i. For each length `len` (1 to remaining/2), check if `s[i..i+len-1] == s[i+len..i+2*len-1]`. If so, `dp[i] = max(dp[i], dp[i+len] + 1)`. Precompute LCP (Longest Common Prefix) to speed up equality checks.

---

## Approach: DP + LCP — O(n²) ✅

```text
FUNCTION deleteString(s):
    n ← LENGTH(s)
    // Precompute LCP[i][j] = length of longest common prefix of s[i:] and s[j:]
    lcp ← MATRIX(n+1, n+1) FILLED WITH 0
    FOR i ← n - 1 DOWNTO 0:
        FOR j ← n - 1 DOWNTO 0:
            IF s[i] = s[j]:
                lcp[i][j] ← lcp[i+1][j+1] + 1
    dp ← ARRAY(n) FILLED WITH 1    // base: delete entire remaining string
    FOR i ← n - 1 DOWNTO 0:
        FOR length ← 1 TO (n - i) / 2:
            IF lcp[i][i + length] ≥ length:
                dp[i] ← MAX(dp[i], dp[i + length] + 1)
    RETURN dp[0]
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP + LCP | **O(n²)** | O(n²) |

---

## Examples

**Example 1:**
```
Input: s = "abcabcdabc"
Output: 2
Explanation: - Delete the first 3 letters ("abc") since the next 3 letters are equal. Now, s = "abcdabc".
- Delete all the letters.
We used 2 operations so return 2. It can be proven that 2 is the maximum number of operations needed.
Note that in the second operation we cannot delete "abc" again because the next occurrence of "abc" does not happen in the next 3 letters.
```

**Example 2:**
```
Input: s = "aaabaab"
Output: 4
Explanation: - Delete the first letter ("a") since the next letter is equal. Now, s = "aabaab".
- Delete the first 3 letters ("aab") since the next 3 letters are equal. Now, s = "aab".
- Delete the first letter ("a") since the next letter is equal. Now, s = "ab".
- Delete all the letters.
We used 4 operations so return 4. It can be proven that 4 is the maximum number of operations needed.
```

**Example 3:**
```
Input: s = "aaaaa"
Output: 5
Explanation: In each operation, we can delete the first letter of s.
```

---

## Walkthrough

Consider the first example `"abcabcabc"`:
| Step | Remaining String | Action |
|------|------------------|--------|
| 1 | abcabcabc | Prefix `"abc"` equals next `"abc"` → delete first 3 chars |
| 2 | abcabc | Prefix `"abc"` equals next `"abc"` → delete first 3 chars |
| 3 | abc | No further equal prefix, delete whole string |
The DP computes the optimal deletions by checking all possible prefix lengths using the pre‑computed LCP table.

---

## Follow-Up Questions
- How would the solution change if deletions could be performed on any equal substring, not just prefixes?
- Can the LCP pre‑computation be optimized to O(n) using suffix arrays or Z‑algorithm?
- How would you adapt the algorithm for a streaming input where the string is received character by character?

---

## Key Takeaway

> **Precompute LCP array to enable O(1) substring equality checks.** Then DP from right to left, trying all valid prefix lengths.
