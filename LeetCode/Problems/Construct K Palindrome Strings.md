# 1400. Construct K Palindrome Strings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-k-palindrome-strings](https://leetcode.com/problems/construct-k-palindrome-strings)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Uber

---

## Problem Description
Given a string `s` consisting of lowercase English letters and an integer `k`, determine whether it is possible to rearrange the characters of `s` to form **exactly** `k` non‑empty palindrome strings. Return `true` if possible, otherwise `false`.

## Examples
**Example 1:**
```
s = "annabelle", k = 2
Output: true
Explanation: One possible split is "anna" and "belle", both palindromes.
```
**Example 2:**
```
s = "leetcode", k = 3
Output: false
Explanation: At least 4 odd‑count characters are needed, which exceeds k.
```
**Example 3:**
```
s = "a", k = 1
Output: true
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
