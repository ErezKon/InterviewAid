# 2288. Apply Discount to Prices

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/apply-discount-to-prices](https://leetcode.com/problems/apply-discount-to-prices)
**Companies:** Amazon

---

## 1. Problem Description

A **sentence** is a string of single-space separated words where each word can contain digits, lowercase letters, and the dollar sign `'$'`. A word represents a **price** if it is a sequence of digits preceded by a dollar sign.

- For example, `"$100"`, `"$23"`, and `"$6"` represent prices while `"100"`, `"$"`, and `"$1e5"` do not.

You are given a string `sentence` representing a sentence and an integer `discount`. For each word representing a price, apply a discount of `discount%` on the price and **update** the word in the sentence. All updated prices should be represented with **exactly two** decimal places.

Return *a string representing the modified sentence*.

Note that all prices will contain **at most** `10` digits.

**Constraints:**
- `1 ≤ sentence.length ≤ 10⁵`
- `sentence` consists of lowercase English letters, digits, `' '`, and `'$'`.
- `sentence` does not have leading or trailing spaces.
- All words in `sentence` are separated by a single space.
- All prices will be **positive** numbers without leading zeros.
- All prices will have **at most** `10` digits.
- `0 ≤ discount ≤ 100`

---

## 2. Examples

```
Example 1:
  Input: sentence = "there are $1 $2 and 5$ candies in the shop", discount = 50
  Output: "there are $0.50 $1.00 and 5$ candies in the shop"
  Explanation:
  The words which represent prices are "$1" and "$2".
  - A 50% discount on "$1" yields "$0.50", so "$1" is replaced by "$0.50".
  - A 50% discount on "$2" yields "$1". Since we need to have exactly 2 decimal places after a price, we replace "$2" with "$1.00".

Example 2:
  Input: sentence = "1 2 $3 4 $5 $6 7 8$ $9 $10$", discount = 100
  Output: "1 2 $0.00 4 $0.00 $0.00 7 8$ $0.00 $10$"
  Explanation:
  Applying a 100% discount on any price will result in 0.
  The words representing prices are "$3", "$5", "$6", and "$9".
  Each of them is replaced by "$0.00".
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
