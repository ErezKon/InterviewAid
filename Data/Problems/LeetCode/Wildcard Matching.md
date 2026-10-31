# 44. Wildcard Matching

**Difficulty:** 🔴 Hard
**Acceptance:** 27.0%
**LeetCode:** [https://leetcode.com/problems/wildcard-matching](https://leetcode.com/problems/wildcard-matching)
**Companies:** Amazon, Atlassian, Bloomberg, Coupang, De Shaw, Google, Infosys, Instacart, Meta, Microsoft, Oracle, Snapchat, Tiktok, Twitter, Two Sigma, Walmart Labs, Zoho

---

## 1. Problem Description

Given an input string (`s`) and a pattern (`p`), implement wildcard pattern matching with support for `'?'` and `'*'` where:

- `'?'` Matches any single character.
- `'*'` Matches any sequence of characters (including the empty sequence).

The matching should cover the **entire** input string (not partial).

**Constraints:**
- `0 <= s.length, p.length <= 2000`
- `s` contains only lowercase English letters.
- `p` contains only lowercase English letters, `'?'` or `'*'`.

---

## 2. Examples

**Example 1:**
```
Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
```

**Example 2:**
```
Input: s = "aa", p = "*"
Output: true
Explanation: '*' matches any sequence.
```

**Example 3:**
```
Input: s = "cb", p = "?a"
Output: false
Explanation: '?' matches 'c', but the second letter is 'a', which does not match 'b'.
```

---

## 3. Approach

Dynamic Programming (DP) – build a table `dp[i][j]` indicating whether `s[0..i-1]` matches `p[0..j-1]`.

```text
FUNCTION isMatch(s, p):
    SET m ← LENGTH(s)
    SET n ← LENGTH(p)
    CREATE dp (m+1) × (n+1) boolean matrix
    SET dp[0][0] ← true
    FOR j ← 1 TO n:
        IF p[j-1] == '*':
            SET dp[0][j] ← dp[0][j-1]
    FOR i ← 1 TO m:
        FOR j ← 1 TO n:
            IF p[j-1] == s[i-1] OR p[j-1] == '?':
                SET dp[i][j] ← dp[i-1][j-1]
            ELSE IF p[j-1] == '*':
                SET dp[i][j] ← dp[i-1][j] OR dp[i][j-1]
    RETURN dp[m][n]
```

---

## 4. Walkthrough

Example 3: `s = "cb"`, `p = "?a"`.

| dp | j=0 (empty) | j=1 (`?`) | j=2 (`a`) |
|----|-------------|-----------|-----------|
| i=0 (empty) | true | false (`?` needs a char) | false |
| i=1 (`c`) | false | true (`?` matches `c`: dp[0][0]) | false (`a` ≠ `c`) |
| i=2 (`b`) | false | false (dp[1][0]) | false (`a` ≠ `b`) |

`dp[2][2] = false` → **Output: false**. For Example 2 (`"aa"`, `"*"`): dp[0][1] = true, then dp[1][1] = dp[0][1] = true and dp[2][1] = dp[1][1] = true → `true`. Example 1 (`"aa"`, `"a"`) ends with dp[2][1] = false.

---

## 5. Complexity Analysis

- **Time:** O(m·n) where *m* = len(s), *n* = len(p).
- **Space:** O(m·n) for the DP matrix (can be optimized to O(n)).

---

## 6. Follow-Up Questions

- How would you modify the algorithm to support `+` (one or more characters) as a wildcard?
- Can you achieve O(1) extra space by using two rolling arrays?
- What changes are needed for case-insensitive matching?

---

## Key Takeaway

> Wildcard matching reduces to a DP table with two cases for `*`: consume a character or match an empty sequence.
