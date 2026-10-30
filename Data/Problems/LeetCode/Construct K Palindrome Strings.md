# 1400. Construct K Palindrome Strings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-k-palindrome-strings](https://leetcode.com/problems/construct-k-palindrome-strings)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Uber

---

## Problem Description
Given a string `s` and an integer `k`, return `true` if you can use all the characters in `s` to construct **non-empty** `k` palindrome strings or `false` otherwise.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists of lowercase English letters.
- `1 <= k <= 10^5`

## Examples
```
Example 1:
  Input: s = "annabelle", k = 2
  Output: true
  Explanation: You can construct two palindromes using all characters in s.
    Some possible constructions "anna" + "elble", "anbna" + "elle", "anellena" + "b"
```
```
Example 2:
  Input: s = "leetcode", k = 3
  Output: false
  Explanation: It is impossible to construct 3 palindromes using all the characters of s.
```
```
Example 3:
  Input: s = "true", k = 4
  Output: true
  Explanation: The only possible solution is to put each character in a separate string.
```

## Approach
Count character frequencies. A palindrome can contain at most one character with an odd count. Therefore the minimum number of palindromes required equals the number of characters with odd frequency (`oddCount`). The construction is possible iff `oddCount ≤ k ≤ len(s)`.

```text
FUNCTION canConstruct(s, k):
    IF k > LEN(s):
        RETURN false
    SET freqMap ← MAP each character in s to its count
    SET oddCount ← 0
    FOR each count IN freqMap VALUES:
        IF count MOD 2 = 1:
            SET oddCount ← oddCount + 1
    RETURN oddCount ≤ k
```

## Walkthrough
| Step | char | freq | oddCount |
|------|------|------|----------|
| after counting | a:2, n:2, n:2, a:2, b:1, e:2, l:2, l:2, e:2 | — | 1 (b) |
| k = 2 | — | — | oddCount=1 ≤ 2 → true |

## Complexity Analysis
- **Time:** `O(|s|)` – one pass to count characters.
- **Space:** `O(1)` – at most 26 entries for lowercase letters.

## Follow‑Up Questions
1. How would the solution change if the string could contain uppercase letters or Unicode characters?
2. Can you extend the algorithm to output one possible set of `k` palindrome strings?
3. What if each palindrome must have length at least `m`?

## Key Takeaway
The number of required palindromes is dictated by the count of odd‑frequency characters; ensuring this count does not exceed `k` guarantees a feasible construction.
