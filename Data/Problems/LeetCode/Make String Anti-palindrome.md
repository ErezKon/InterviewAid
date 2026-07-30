# 3088. Make String Anti-palindrome

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/make-string-anti-palindrome](https://leetcode.com/problems/make-string-anti-palindrome)
**Companies:** Intuit

---

## 1. Problem Description

Rearrange characters of a given string so that for every index `i`, the character at position `i` differs from the character at the mirrored position `n-1-i`. Return the lexicographically smallest such anti‑palindromic string, or an empty string if it cannot be formed.

---

## 2. Examples

**Example 1:**
```
Input: s = "abccba"
Output: "abcabc"
Explanation: After sorting we get "aabbcc". Swapping the second half yields "abcabc", which satisfies s[i] != s[5-i] for all i.
```

**Example 2:**
```
Input: s = "aaab"
Output: ""
Explanation: The most frequent character 'a' appears 3 times (> n/2 = 2), making an anti‑palindrome impossible.
```

---

## 3. Approach: Sort + Greedy Fix — O(n log n)

```text
FUNCTION makeAntiPalindrome(s):
    n ← LENGTH(s)
    IF n MOD 2 == 1:
        RETURN ""   // odd length can never be anti‑palindromic
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

## 6. Follow‑Up Questions

- How would the algorithm change if the string could contain Unicode characters?
- Can we construct the anti‑palindrome in linear time using counting sort for limited alphabets?
- What is the minimal number of swaps required to transform the original string into the anti‑palindrome?

---

## Key Takeaway

> Sort the characters, split into two halves, and greedily ensure each mirrored pair differs; if a pair matches, swap within the second half. This yields the lexicographically smallest anti‑palindrome when possible.
