# 3088. Make String Anti-palindrome

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/make-string-anti-palindrome](https://leetcode.com/problems/make-string-anti-palindrome)
**Companies:** Intuit

---

## 1. Problem Description

We call a string `s` of **even** length `n` an **anti-palindrome** if for each index `0 <= i < n`, `s[i] != s[n - i - 1]`.

Given a string `s`, your task is to make `s` an **anti-palindrome** by doing **any** number of operations (including zero).

In one operation, you can select two characters from `s` and swap them.

Return *the resulting string. If multiple strings meet the conditions, return the lexicographically smallest one. If it can't be made into an anti-palindrome, return* `"-1"`*.*

**Constraints:**

- `2 <= s.length <= 10^5`
- `s.length % 2 == 0`
- `s` consists only of lowercase English letters.

---

## 2. Examples

```
Example 1:
  Input: s = "abca"
  Output: "aabc"
  Explanation: "aabc" is an anti-palindrome string since s[0] != s[3] and s[1] != s[2]. Also, it is a rearrangement of "abca".
```

```
Example 2:
  Input: s = "abba"
  Output: "aabb"
  Explanation: "aabb" is an anti-palindrome string since s[0] != s[3] and s[1] != s[2]. Also, it is a rearrangement of "abba".
```

```
Example 3:
  Input: s = "cccd"
  Output: "-1"
  Explanation: You can see that no matter how you rearrange the characters of "cccd", either s[0] == s[3] or s[1] == s[2]. So it can not form an anti-palindrome string.
```

---

## 3. Approach: Sort + Greedy Fix — O(n log n)

```text
FUNCTION makeAntiPalindrome(s):
    n ← LENGTH(s)
    IF n MOD 2 == 1:
        RETURN ""   // odd length can never be anti-palindromic
    // Count frequencies
    freq ← ARRAY[26] OF 0
    FOR ch IN s:
        freq[INDEX(ch)] ← freq[INDEX(ch)] + 1
    // If any character appears more than n/2 times, impossible
    FOR count IN freq:
        IF count > n/2:
            RETURN ""
    // Sort characters to obtain lexicographically smallest base
    sortedChars ← SORT(s)
    // Split into two halves
    firstHalf ← sortedChars[0 : n/2]
    secondHalf ← sortedChars[n/2 : n]
    // Reverse second half to maximize differences
    secondHalf ← REVERSE(secondHalf)
    // Build result by pairing opposite positions
    result ← ARRAY OF n CHARACTERS
    FOR i FROM 0 TO n/2 - 1:
        result[i] ← firstHalf[i]
        result[n-1-i] ← secondHalf[i]
    // If any pair still equal, perform local swaps within second half
    FOR i FROM 0 TO n/2 - 1:
        IF result[i] == result[n-1-i]:
            // Find j where result[n-1-j] != result[i]
            FOR j FROM i+1 TO n/2 - 1:
                IF result[n-1-j] != result[i]:
                    SWAP(result[n-1-i], result[n-1-j])
                    BREAK
    RETURN STRING_FROM_ARRAY(result)
```

---

## 4. Walkthrough

Take `s = "abccba"` (n = 6).
1. Frequencies are all ≤ 3, so possible.
2. Sorted characters → `['a','a','b','b','c','c']`.
3. First half = `['a','a','b']`; second half = `['b','c','c']` → reverse → `['c','c','b']`.
4. Pairing:
   - i=0 → result[0]='a', result[5]='c'
   - i=1 → result[1]='a', result[4]='c'
   - i=2 → result[2]='b', result[3]='b'
5. Pair (2,3) has equal chars `'b'`. Swap result[3] with result[4] (which is `'c'`). Final string: `abcabc`.
All mirrored positions now differ.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n log n) – sorting dominates | O(n) – for the character array and result |

---

## 6. Follow-Up Questions

- How would the algorithm change if the string could contain Unicode characters?
- Can we construct the anti-palindrome in linear time using counting sort for limited alphabets?
- What is the minimal number of swaps required to transform the original string into the anti-palindrome?

---

## Key Takeaway

> Sort the characters, split into two halves, and greedily ensure each mirrored pair differs; if a pair matches, swap within the second half. This yields the lexicographically smallest anti-palindrome when possible.
