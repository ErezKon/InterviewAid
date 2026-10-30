# 1256. Encode Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/encode-number](https://leetcode.com/problems/encode-number)
**Companies:** Quora

---

## Problem Description

> *Note: the Approach below (base-26 letters) solves an invented problem. The official encoding is the binary representation of `num + 1` with its leading `1` removed (e.g. `23 → 24 = 11000₂ → "1000"`).*

> *Note: premium problem — statement verified via doocs/leetcode.*

Given a non-negative integer `num`, Return its *encoding* string.

The encoding is done by converting the integer to a string using a secret function that you should deduce from the following table:

![img](https://fastly.jsdelivr.net/gh/doocs/leetcode@main/solution/1200-1299/1256.Encode%20Number/images/encode_number.png)

**Constraints:**
- `0 <= num <= 10^9`

## Examples

**Example 1:**
```
Input: num = 23
Output: "1000"
```

**Example 2:**
```
Input: num = 107
Output: "101100"
```

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
