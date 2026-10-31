# 3337. Total Characters in String After Transformations II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/total-characters-in-string-after-transformations-ii](https://leetcode.com/problems/total-characters-in-string-after-transformations-ii)
**Companies:** Google, Meta

---

## Problem Description

You are given a string `s` consisting of lowercase English letters, an integer `t` representing the number of **transformations** to perform, and an array `nums` of size 26. In one **transformation**, every character in `s` is replaced according to the following rules:

- Replace `s[i]` with the **next** `nums[s[i] - 'a']` consecutive characters in the alphabet. For example, if `s[i] = 'a'` and `nums[0] = 3`, the character `'a'` transforms into the next 3 consecutive characters ahead of it, which results in `"bcd"`.
- The transformation **wraps** around the alphabet if it exceeds `'z'`. For example, if `s[i] = 'y'` and `nums[24] = 3`, the character `'y'` transforms into the next 3 consecutive characters ahead of it, which results in `"zab"`.

Return the length of the resulting string after **exactly** `t` transformations.

Since the answer may be very large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists only of lowercase English letters.
- `1 <= t <= 10^9`
- `nums.length == 26`
- `1 <= nums[i] <= 25`

## Examples

**Example 1:**
```
Input: s = "abcyy", t = 2, nums = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2]
Output: 7
Explanation:
First Transformation (t = 1):
'a' becomes 'b' as nums[0] == 1
'b' becomes 'c' as nums[1] == 1
'c' becomes 'd' as nums[2] == 1
'y' becomes 'z' as nums[24] == 1
'y' becomes 'z' as nums[24] == 1
String after the first transformation: "bcdzz"
Second Transformation (t = 2):
'b' becomes 'c' as nums[1] == 1
'c' becomes 'd' as nums[2] == 1
'd' becomes 'e' as nums[3] == 1
'z' becomes 'ab' as nums[25] == 2
'z' becomes 'ab' as nums[25] == 2
String after the second transformation: "cdeabab"
Final Length of the string: The string is "cdeabab", which has 7 characters.
```

**Example 2:**
```
Input: s = "azbk", t = 1, nums = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
Output: 8
Explanation:
First Transformation (t = 1):
'a' becomes 'bc' as nums[0] == 2
'z' becomes 'ab' as nums[25] == 2
'b' becomes 'cd' as nums[1] == 2
'k' becomes 'lm' as nums[10] == 2
String after the first transformation: "bcabcdlm"
Final Length of the string: The string is "bcabcdlm", which has 8 characters.
```

## Approach
Only the **count of each letter** matters, not the order. One transformation is a linear map on the 26-entry count vector: every copy of letter `c` produces one copy of each of the letters `c+1, c+2, ..., c+nums[c]` (mod 26). Encode this as a 26×26 matrix `M` with `M[c][(c+k) mod 26] = 1` for `k = 1..nums[c]`.

If `cnt` is the row vector of letter frequencies in `s`, then after `t` transformations the frequencies are `cnt · M^t`. Since `t` can be up to 10^9, compute `M^t` by **binary (fast) exponentiation** with all arithmetic mod 10^9+7, then sum all entries of `cnt · M^t`.

**Pseudocode**
```text
FUNCTION lengthAfterTransformations(s, t, nums):
    MOD ← 10^9 + 7
    M ← 26×26 zero matrix
    FOR c ← 0 TO 25
        FOR k ← 1 TO nums[c]
            M[c][(c + k) MOD 26] ← M[c][(c + k) MOD 26] + 1
    R ← 26×26 identity matrix
    WHILE t > 0                      // fast exponentiation
        IF t is odd
            R ← R × M  (mod MOD)
        M ← M × M  (mod MOD)
        t ← t DIV 2
    cnt ← frequency of each letter in s
    ans ← 0
    FOR i ← 0 TO 25
        FOR j ← 0 TO 25
            ans ← (ans + cnt[i] * R[i][j]) MOD MOD
    RETURN ans
```

## Walkthrough
Example 1: `s = "abcyy"`, `t = 2`, `nums[25] = 2`, all others 1. Applying the count vector update `cnt ← cnt · M` twice (what `M^2` does):

| Step | Non-zero counts | Total |
|------|-----------------|-------|
| Start | a:1, b:1, c:1, y:2 | 5 |
| After t=1 (each letter shifts by 1) | b:1, c:1, d:1, z:2 | 5 |
| After t=2 (z → a,b since nums[25]=2) | c:1, d:1, e:1, a:2, b:2 | 7 |

Sum of the final vector = **7**, matching the expected output.

## Complexity Analysis
- Time: O(n + 26³ · log t) — counting letters in `s`, then O(log t) matrix multiplications of 26×26 matrices.
- Space: O(26²) = O(1) for the matrices.

## Follow-Up Questions
1. In Part I every letter maps to one letter except `'z'` (→ `"ab"`); how does a simple O(26·t) DP suffice there, and why does it fail here for t up to 10^9?
2. Instead of matrix exponentiation, could you use the characteristic polynomial (Kitamasa / Cayley-Hamilton) to speed up the computation?
3. How would you return the count of a specific letter after `t` transformations rather than the total length?

## Key Takeaway
When a process acts independently on each item and only counts matter, model one step as a linear transformation on the count vector and apply it `t` times with fast matrix exponentiation.
