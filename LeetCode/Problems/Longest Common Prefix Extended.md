# 14. Longest Common Prefix — Extended

See also: [Longest Common Prefix.md](Longest%20Common%20Prefix.md)

**Companies:** Accenture, Adobe, Alten, Amazon, American Express, Apple, Barclays, Bloomberg, Capgemini, Caterpillar, Cme Group, Deloitte, Deutsche Bank, Disney, Epam Systems, Ericsson, Fidelity, Fractal Analytics, Google, Hashedin, Hrt, Hsbc, Ibm, Infosys, Jane Street, Kotak Mahindra Bank, Maersk, Meta, Microsoft, Natwest, Nokia, Nvidia, Opentext, Oracle, Oyo, Palo Alto Networks, Persistent Systems, Phonepe, Publicis Sapient, Pubmatic, Pwc, Qualcomm, Quora, Revolut, Roblox, Samsung, Sap, Sigmoid, Target, Tcs, Tiktok, Turing, Uber, Virtusa, Visa, Walmart Labs, Wells Fargo, Wipro, Yahoo, Yelp, Zoho, Zopsmart
---

## Problem Description
Given an array of strings, return the longest common prefix (LCP) shared by all strings. If there is no common prefix, return an empty string.

## Examples
**Example 1:**
```
Input: ["flower","flow","flight"]
Output: "fl"
```
**Example 2:**
```
Input: ["dog","racecar","car"]
Output: ""
```

## Approach
Multiple strategies exist; the vertical scan (character by character) is simplest and runs in O(S) where S is total characters.
1. Find the shortest string length `minLen`.
2. For each index `i` from 0 to `minLen-1`:
   - Take the character `c` from the first string.
   - Compare `c` with the character at position `i` of every other string.
   - If any mismatch, return the prefix up to `i`.
3. If loop completes, return the prefix of length `minLen`.

```text
FUNCTION longestCommonPrefix(strs):
    IF strs IS EMPTY: RETURN ""
    SET minLen ← MINIMUM length of strings in strs
    FOR i ← 0 TO minLen - 1:
        SET c ← strs[0][i]
        FOR s IN strs:
            IF s[i] ≠ c:
                RETURN SUBSTRING(strs[0], 0, i)
    RETURN SUBSTRING(strs[0], 0, minLen)
```

## Walkthrough
| Step | i | c | Comparison result | Prefix so far |
|------|---|---|-------------------|--------------|
| 1 | 0 | 'f' | all strings have 'f' | "f" |
| 2 | 1 | 'l' | all strings have 'l' | "fl" |
| 3 | 2 | 'o' vs 'i' (flight) → mismatch | return "fl" |

## Complexity Analysis
- **Time:** O(S) – each character examined at most once.
- **Space:** O(1) extra space (ignoring input and output).

## Follow-Up Questions
1. How would you adapt the solution for a large dataset that cannot fit in memory?
2. Can you solve the problem using a Trie data structure and what would be the trade‑offs?
3. How would you modify the algorithm to find the longest common suffix instead?

## Key Takeaway
Scanning columns of characters until a mismatch yields the longest common prefix in linear time.
