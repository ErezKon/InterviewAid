# 43. Multiply Strings

**Difficulty:** 🟡 Medium
**Acceptance:** 41.0%
**LeetCode:** [https://leetcode.com/problems/multiply-strings](https://leetcode.com/problems/multiply-strings)
**Companies:** Amazon, Bloomberg, Bytedance, Epam Systems, Google, Makemytrip, Meta, Microsoft, Nielsen, Oracle, Palo Alto Networks, Pinterest, Roku, Tiktok, Twitter, Two Sigma, Zoho

---

## 1. Problem Description

Given two non-negative integers represented as strings, return their product as a string. Must not use BigInteger or convert directly to integer.

---

## 2. Approach: Grade School Multiplication — O(m·n) ✅

```text
FUNCTION multiply(num1, num2):
    IF num1 == "0" OR num2 == "0":
        RETURN "0"
    m ← LENGTH(num1)
    n ← LENGTH(num2)
    result ← ARRAY of (m + n) zeros
    FOR i ← m - 1 DOWN TO 0:
        FOR j ← n - 1 DOWN TO 0:
            product ← (num1[i] - '0') * (num2[j] - '0')
            p1 ← i + j       // tens position
            p2 ← i + j + 1   // ones position
            sum ← product + result[p2]
            result[p2] ← sum % 10
            result[p1] ← result[p1] + sum / 10
    // Convert result array to string, removing leading zeros
    WHILE result[0] == 0 AND LENGTH(result) > 1:
        REMOVE_FIRST(result)
    RETURN JOIN(result)
```

### Key Insight

`num1[i] * num2[j]` contributes to positions `i+j` and `i+j+1` in the result.

---

## 3. Examples

| num1 | num2 | Output |
|------|------|--------|
| "2" | "3" | "6" |
| "123" | "45" | "5535" |
| "0" | "999" | "0" |

---

## 4. Walkthrough

Take `num1 = "123"`, `num2 = "45"`.

1. Initialize `result` array of length `3+2 = 5` → `[0,0,0,0,0]`.
2. Multiply digit `3` (i=2) by `5` (j=1): product `15`. Add to `result[4]` → `result[4]=5`, carry `1` to `result[3]`.
3. Multiply `3` by `4` (j=0): product `12`. Add to `result[3]` (currently `1` from previous carry) → `13`. Set `result[3]=3`, carry `1` to `result[2]`.
4. Continue for digits `2` (i=1) and `1` (i=0) similarly, updating positions.
5. After all loops, `result` becomes `[0,5,5,3,5]`.
6. Remove leading zero and join → "5535".

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m · n) |
| **Space** | O(m + n) |

---

## Key Takeaway

> Simulate grade-school multiplication. The position formula `i+j` and `i+j+1` maps each digit product to the correct result positions. Process carries as you go.
