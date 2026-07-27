# Palindrome Problem Collection

Related: #5, #9, #125, #131, #234, #336, #516, #647, #680

---

## Palindrome Taxonomy

| Category | Problems |
|----------|---------|
| **Check** | #9 Palindrome Number, #125 Valid Palindrome, #680 Valid Palindrome II |
| **Find longest** | #5 Longest Palindromic Substring, #516 Longest Palindromic Subsequence |
| **Count** | #647 Palindromic Substrings |
| **Partition** | #131 Palindrome Partitioning, #132 Min Cut |
| **Linked List** | #234 Palindrome Linked List |
| **Construction** | #336 Palindrome Pairs |

### Expand Around Center Template (for substrings)

```
FUNCTION expandAroundCenter(s, left, right):
    WHILE left >= 0 AND right < n AND s[left] == s[right]:
        left -= 1
        right += 1
    RETURN (left + 1, right - 1)
```

Check 2n-1 centers (n single + n-1 between pairs).
