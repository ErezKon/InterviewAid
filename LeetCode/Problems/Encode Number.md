# 1256. Encode Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/encode-number](https://leetcode.com/problems/encode-number)
**Companies:** Quora

---

## Problem Description
Given a non‑negative integer `num`, encode it into a string using a base‑26 alphabetic representation where `0 → 'a'`, `1 → 'b'`, …, `25 → 'z'`. The most significant digit appears first. Constraints: `0 <= num <= 2^31 - 1`.

## Examples
- Input: `num = 0` → Output: `"a"`
- Input: `num = 25` → Output: `"z"`
- Input: `num = 26` → Output: `"ba"` (26 = 1·26 + 0 → 'b''a')

## Approach
Repeatedly divide the number by 26, recording the remainder as a character, and build the string in reverse order.

```text
FUNCTION EncodeNumber(num):
    IF num == 0:
        RETURN "a"
    SET chars ← []
    WHILE num > 0:
        SET rem ← num MOD 26
        SET ch ← CHAR('a' + rem)   // map 0‑25 to 'a'‑'z'
        PREPEND ch TO chars
        SET num ← num DIV 26
    RETURN JOIN(chars)
```

## Walkthrough
| Step | num | rem | ch | chars (built so far) |
|------|-----|-----|----|----------------------|
|1|26|0|a|[a]|
|2|1|1|b|[b, a] (prepend) |
Result `"ba"`.

## Complexity Analysis
- **Time:** O(log₍₂₆₎ n) – one iteration per digit.
- **Space:** O(log₍₂₆₎ n) for the output string.

## Follow-Up Questions
1. How would you modify the algorithm to use uppercase letters?
2. Can you encode negative numbers by prefixing a sign character?
3. What changes are needed if the base is 62 (including digits and letters)?

## Key Takeaway
Base conversion with remainder extraction works for any alphabetic base, producing the encoded string by prepending characters.
