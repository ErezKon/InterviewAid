# 2288. Apply Discount to Prices

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/apply-discount-to-prices](https://leetcode.com/problems/apply-discount-to-prices)
**Companies:** Amazon

---

## 1. Problem Description

Given a `sentence` where some words represent prices (start with `'$'` followed by a non‑negative number), apply a `discount`% to each price and format the result with exactly two decimal places. Return the modified sentence.

---

## 2. Examples

**Example 1:**
```
Input: sentence = "there are $100 and $200 items", discount = 20
Output: "there are $80.00 and $160.00 items"
Explanation: $100 → 100 * 0.8 = 80.00, $200 → 200 * 0.8 = 160.00.
```
**Example 2:**
```
Input: sentence = "no price here", discount = 10
Output: "no price here"
Explanation: No word starts with '$', so the sentence is unchanged.
```

---

## 3. Approach: Split + Parse + Format — O(n) ✅

```text
FUNCTION discountPrices(sentence, discount):
    SET words ← SPLIT(sentence, " ")
    FOR i ← 0 TO LENGTH(words) - 1:
        SET word ← words[i]
        IF word STARTS WITH '$' AND LENGTH(word) > 1:
            SET numberPart ← SUBSTRING(word, 1)
            IF numberPart IS NUMERIC:
                SET price ← PARSE_FLOAT(numberPart)
                SET newPrice ← price * (100 - discount) / 100
                SET words[i] ← "$" + FORMAT(newPrice, 2 decimal places)
    RETURN JOIN(words, " ")
```

---

## 4. Walkthrough

| Step | Word | Action | Result |
|------|------|--------|--------|
| 1 | "$100" | Recognized as price, parse 100, apply 20% discount → 80.00 | "$80.00" |
| 2 | "and" | Not a price, keep unchanged | "and" |
| 3 | "$200" | Parse 200, apply discount → 160.00 | "$160.00" |

The function rebuilds the sentence from the transformed word list.

---

## 5. Complexity Analysis

- **Time:** O(n) where n is the number of characters in the sentence (each word examined once).
- **Space:** O(n) for the list of words created by splitting the sentence.

---

## Follow-Up Questions

- How would you modify the solution to handle prices with commas (e.g., "$1,000")?
- Can you process the sentence in a single pass without splitting into an array?

---

## Key Takeaway

> Careful string parsing: validate that the token after `$` is entirely numeric (no letters, no empty), then apply discount and format to 2 decimal places.
