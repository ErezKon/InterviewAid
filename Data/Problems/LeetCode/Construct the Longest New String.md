# 2745. Construct the Longest New String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-the-longest-new-string](https://leetcode.com/problems/construct-the-longest-new-string)
**Companies:** Guidewire, Microsoft

---

## 1. Problem Description

You are given three integers `x`, `y`, and `z`.

You have `x` strings equal to `"AA"`, `y` strings equal to `"BB"`, and `z` strings equal to `"AB"`. You want to choose some (possibly all or none) of these strings and concatenate them in some order to form a new string. This new string must not contain `"AAA"` or `"BBB"` as a substring.

Return *the maximum possible length of the new string*.

A **substring** is a contiguous **non-empty** sequence of characters within a string.

**Constraints:**
- `1 <= x, y, z <= 50`

---

## 2. Examples

```
Example 1:
  Input: x = 2, y = 5, z = 1
  Output: 12
  Explanation: We can concatenate the strings "BB", "AA", "BB", "AA", "BB", and "AB" in that order. Then, our new string is "BBAABBAABBAB".
    That string has length 12, and we can show that it is impossible to construct a string of longer length.
```
```
Example 2:
  Input: x = 3, y = 2, z = 2
  Output: 14
  Explanation: We can concatenate the strings "AB", "AB", "AA", "BB", "AA", "BB", and "AA" in that order. Then, our new string is "ABABAABBAABBAA".
    That string has length 14, and we can show that it is impossible to construct a string of longer length.
```

---

## 3. Key Insight

> `"AB"` can be placed freely between any pair. `"AA"` and `"BB"` must alternate: `AA BB AA BB...`. We can use `min(x, y)` pairs of AA+BB, plus one extra of whichever has more, plus all `z` copies of `"AB"`.

---

## 4. Approach: Math — O(1) ✅

```
FUNCTION longestString(x, y, z):
    // AA and BB must alternate, use min(x,y) of each plus 1 extra
    pairs = MIN(x, y)
    result = pairs * 2  // pairs of (AA, BB)
    IF x != y:
        result += 1  // one extra AA or BB
    result += z  // all AB can be used
    RETURN result * 2  // each string has length 2
```

| Time | Space |
|------|-------|
| O(1) | O(1) |

---

## 5. Walkthrough

Consider `x = 2, y = 3, z = 1`.

- `pairs = MIN(2,3) = 2` → we can place two AA and two BB alternating.
- Since `y > x`, add one extra BB.
- Add the single AB.
- Total strings = `pairs*2 + 1(extra) + z = 2*2 + 1 + 1 = 6`.
- Length = `6 * 2 = 12` characters.

The constructed string could be: `AA BB AA BB AB` (order of AB can be anywhere).

---

## 6. Complexity Analysis

| Time | Space |
|------|-------|
| O(1) | O(1) |

---

## 7. Follow-Up Questions

- How would the solution change if the forbidden substrings were "AAAA" and "BBBB"?
- What if each string type had a different length?
- Can you extend the approach to handle more than three string types with similar constraints?

---

## Key Takeaway

> AA and BB must alternate (at most |diff| ≤ 1). AB strings are neutral connectors that can always be included. Total length = `(min(x,y)*2 + (1 if x≠y else 0) + z) * 2`.
