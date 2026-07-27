# 318. Maximum Product of Word Lengths

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Google
---

## Problem Description
Return the maximum product of lengths of two words that share **no common letters**.

## Key Insight
> Represent each word's character set as a **26-bit bitmask**. Two words share no letters iff `masks[i] & masks[j] == 0`. Check all pairs.

## Approach
```
FUNCTION maxProduct(words)
    masks ← [0] × len(words)
    FOR i, w IN enumerate(words) DO
        FOR c IN w DO masks[i] ← masks[i] | (1 << (ord(c) - ord('a')))
    result ← 0
    FOR all pairs (i, j) DO
        IF masks[i] & masks[j] = 0 THEN
            result ← MAX(result, len(words[i]) × len(words[j]))
    RETURN result
END FUNCTION
```

## Complexity Analysis
| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n² + L)** — n² pairs + L total chars for masks |
| Space  | **O(n)** — bitmasks |

## Key Takeaway
> **Bitmask for character sets** — O(1) disjointness check via bitwise AND. Classic technique for letter-set problems.
