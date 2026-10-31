# 1268. Search Suggestions System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/search-suggestions-system](https://leetcode.com/problems/search-suggestions-system)
**Companies:** Adobe, Amazon, Anduril, Bloomberg, Citadel, Docusign, Doordash, Google, Meesho, Meta, Microsoft, Oracle, Paypal, Salesforce, Snapchat, Squarepoint Capital, Tiktok, Twilio, Uber, Ubs, Wix

---

## Problem Description

You are given an array of strings `products` and a string `searchWord`.

Design a system that suggests at most three product names from `products` after each character of `searchWord` is typed. Suggested products should have common prefix with `searchWord`. If there are more than three products with a common prefix return the three lexicographically minimums products.

Return *a list of lists of the suggested products after each character of* `searchWord` *is typed*.

**Constraints:**

- `1 <= products.length <= 1000`
- `1 <= products[i].length <= 3000`
- `1 <= sum(products[i].length) <= 2 * 10^4`
- All the strings of `products` are **unique**.
- `products[i]` consists of lowercase English letters.
- `1 <= searchWord.length <= 1000`
- `searchWord` consists of lowercase English letters.

---

## Approach 1: Sort + Binary Search — O(n log n + m·log n) ✅

```text
FUNCTION suggestedProducts(products, searchWord):
    // sort products lexicographically
    SORT products
    SET result ← []
    SET prefix ← ""
    FOR char IN searchWord:
        SET prefix ← prefix + char
        // binary search for first product >= prefix
        SET idx ← BINARY_SEARCH_LEFT(products, prefix)
        SET suggestions ← []
        FOR i FROM idx TO MIN(idx + 2, LENGTH(products) - 1):
            IF products[i].STARTSWITH(prefix):
                APPEND products[i] TO suggestions
        APPEND suggestions TO result
    RETURN result
```

## Approach 2: Trie

Build a trie from the product list. At each node store up to three lexicographically smallest products that share the prefix. While traversing the trie for each character of the search word, collect the stored suggestions.

---

## Examples

```
Example 1:
  Input: products = ["mobile","mouse","moneypot","monitor","mousepad"], searchWord = "mouse"
  Output: [["mobile","moneypot","monitor"],["mobile","moneypot","monitor"],["mouse","mousepad"],["mouse","mousepad"],["mouse","mousepad"]]
  Explanation: products sorted lexicographically = ["mobile","moneypot","monitor","mouse","mousepad"].
  After typing m and mo all products match and we show user ["mobile","moneypot","monitor"].
  After typing mou, mous and mouse the system suggests ["mouse","mousepad"].
```

```
Example 2:
  Input: products = ["havana"], searchWord = "havana"
  Output: [["havana"],["havana"],["havana"],["havana"],["havana"],["havana"]]
  Explanation: The only word "havana" will be always suggested while typing the search word.
```

---

## Walkthrough

Consider `products = ["mobile","mouse","moneypot","monitor","mousepad"]` and `searchWord = "mouse"`.
1. After sorting: `["mobile","moneypot","monitor","mouse","mousepad"]`.
2. Prefix `"m"`: binary search finds index 0. First three products starting with `"m"` are `mobile, moneypot, monitor`.
3. Prefix `"mo"`: index 0 again, first three are `mobile, moneypot, monitor`.
4. Prefix `"mou"`: index 3, suggestions are `mouse, mousepad`.
5. Prefix `"mous"`: same index 3, suggestions unchanged.
6. Prefix `"mouse"`: same index 3, suggestions unchanged.
The result aggregates these suggestion lists for each typed character.

---

## Complexity Analysis

- **Time:** Sorting O(n log n) + for each of m characters binary search O(log n) and up to 3 checks → O(n log n + m·log n).
- **Space:** O(n) for storing sorted products (Trie version uses O(total characters)).

---

## Key Takeaway

> Sorting plus binary search (or a trie) yields up to three lexicographically smallest suggestions for each prefix efficiently.
