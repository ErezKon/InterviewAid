# 2288. Apply Discount to Prices

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/apply-discount-to-prices](https://leetcode.com/problems/apply-discount-to-prices)
**Companies:** Amazon

---

## 1. Problem Description

Given a `sentence` where some words represent prices (start with `'$'` followed by a non-negative number), apply a `discount`% to each price and format with exactly 2 decimal places. Return the modified sentence.

---

## 2. Approach: Split + Parse + Format — O(n) ✅

```
FUNCTION discountPrices(sentence, discount):
    words = sentence.SPLIT(" ")
    FOR i, word IN enumerate(words):
        IF word[0] == '$' AND len(word) > 1 AND word[1:] is a valid number:
            price = PARSE_FLOAT(word[1:])
            newPrice = price * (100 - discount) / 100
            words[i] = "$" + FORMAT(newPrice, 2 decimal places)
    RETURN " ".JOIN(words)
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Careful string parsing: validate that the token after `$` is entirely numeric (no letters, no empty), then apply discount and format to 2 decimal places.
