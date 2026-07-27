# 1268. Search Suggestions System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/search-suggestions-system](https://leetcode.com/problems/search-suggestions-system)
**Companies:** Adobe, Amazon, Anduril, Bloomberg, Citadel, Docusign, Doordash, Google, Meesho, Meta, Microsoft, Oracle, Paypal, Salesforce, Snapchat, Squarepoint Capital, Tiktok, Twilio, Uber, Ubs, Wix

---

## Problem Description

Given a list of products and a search word, for each character typed return up to 3 lexicographically smallest products matching the current prefix.

---

## Approach 1: Sort + Binary Search — O(n log n + m·log n) ✅

```
FUNCTION suggestedProducts(products, searchWord):
    SORT products
    result = []

    prefix = ""
    FOR char IN searchWord:
        prefix += char
        // Binary search for first product ≥ prefix
        idx = bisect_left(products, prefix)
        suggestions = []
        FOR i ← idx TO MIN(idx + 2, len(products) - 1):
            IF products[i].startswith(prefix):
                suggestions.ADD(products[i])
        result.ADD(suggestions)

    RETURN result
```

### Approach 2: Trie

Build trie with sorted insertion. At each node, store up to 3 suggestions.

| Approach | Time | Space |
|----------|------|-------|
| Sort + Binary Search | O(n log n + m·log n) | O(1) extra |
| Trie | O(total chars) | O(total chars) |
