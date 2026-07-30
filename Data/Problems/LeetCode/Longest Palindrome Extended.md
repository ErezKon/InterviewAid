# Palindrome Problem Collection

---

## Problem Description
The file aggregates a taxonomy of classic palindrome‑related LeetCode problems, grouping them by operation such as checking, finding the longest palindrome, counting substrings, partitioning, linked‑list checks, and constructing palindrome pairs. It serves as a reference guide for developers to locate relevant problems and common solution patterns.

## Examples
| Category | Example Problem | Brief Goal |
|----------|----------------|-----------|
| Check | Valid Palindrome (125) | Determine if a string reads the same forward and backward, ignoring non‑alphanumeric characters. |
| Find longest | Longest Palindromic Substring (5) | Return the longest contiguous substring that is a palindrome. |
| Count | Palindromic Substrings (647) | Count all distinct palindromic substrings in the input string. |

## Approach
The core insight is that many palindrome problems share the **Expand Around Center** technique: treat each character (and the gap between characters) as a potential palindrome center and expand outward while characters match.

```text
FUNCTION expandAroundCenter(s, left, right):
    // Expand while characters match and indices stay within bounds
    WHILE left >= 0 AND right < LENGTH(s) AND s[left] == s[right]:
        left ← left - 1
        right ← right + 1
    RETURN (left + 1, right - 1)  // inclusive bounds of the palindrome
```
Other categories (e.g., partitioning) rely on backtracking or dynamic programming, but the taxonomy helps pick the right pattern quickly.

## Walkthrough
Consider the string "ababa" for the **Find longest** category:
1. Treat each index as a center and call `expandAroundCenter`.
2. For center at index 2 (character 'a'), expansion yields bounds (0, 4) → "ababa".
3. No longer palindrome exists, so the result is "ababa".

## Complexity Analysis
*Expand Around Center* runs in **O(n²)** time in the worst case (checking each of the 2n‑1 centers) and uses **O(1)** extra space.
Other categories may have different complexities (e.g., DP for longest subsequence is O(n²) time, O(n) space).

## Follow‑Up Questions
1. How would you adapt the expand‑around‑center method to handle Unicode characters?
2. Can you improve the longest palindromic substring search to **O(n)** using Manacher’s algorithm?
3. How does the DP solution for longest palindromic subsequence differ from the substring variant?

## Key Takeaway
Most palindrome problems boil down to expanding around potential centers; recognizing the right category lets you apply the optimal algorithm quickly.
