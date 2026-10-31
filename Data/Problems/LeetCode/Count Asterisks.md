# 2315. Count Asterisks

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-asterisks](https://leetcode.com/problems/count-asterisks)
**Companies:** Google

---

## 1. Problem Description

You are given a string `s`, where every **two** consecutive vertical bars `'|'` are grouped into a **pair**. In other words, the 1st and 2nd `'|'` make a pair, the 3rd and 4th `'|'` make a pair, and so forth.

Return *the number of* `'*'` *in* `s`*, **excluding** the* `'*'` *between each pair of* `'|'`.

**Note** that each `'|'` will belong to **exactly** one pair.

**Constraints:**
- `1 <= s.length <= 1000`
- `s` consists of lowercase English letters, vertical bars `'|'`, and asterisks `'*'`.
- `s` contains an **even** number of vertical bars `'|'`.

---

## 2. Approach: Toggle Flag — O(n) ✅

```
FUNCTION countAsterisks(s):
    insidePipes = false
    count = 0
    FOR ch IN s:
        IF ch == '|':
            insidePipes = NOT insidePipes
        ELSE IF ch == '*' AND NOT insidePipes:
            count += 1
    RETURN count
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Examples

```
Example 1:
  Input: s = "l|*e*et|c**o|*de|"
  Output: 2
  Explanation: The considered characters are: "l|*e*et|c**o|*de|" -> "l" and "c**o" (outside pairs).
  The characters between the first and second '|' are excluded from the answer.
  Also, the characters between the third and fourth '|' are excluded from the answer.
  There are 2 asterisks considered. Therefore, we return 2.
```

```
Example 2:
  Input: s = "iamprogrammer"
  Output: 0
  Explanation: In this example, there are no asterisks in s. Therefore, we return 0.
```

```
Example 3:
  Input: s = "yo|uar|e**|b|e***au|tifu|l"
  Output: 5
  Explanation: The considered characters are "yo", "e**", "e***au" and "l" (outside pairs).
  There are 5 asterisks considered. Therefore, we return 5.
```

---

## 4. Walkthrough

| Step | Character | insidePipes | Count |
|------|-----------|-------------|-------|
| 1 | `*` | false | 1 |
| 2 | `|` | true | 1 |
| 3 | `*` | true | 1 |
| 4 | `e` | true | 1 |
| 5 | `*` | true | 1 |
| 6 | `t` | true | 1 |
| 7 | `|` | false | 1 |
| 8 | `c` | false | 1 |
| 9 | `*` | false | 2 |
|10 | `*` | false | 3 |
|11 | `o` | false | 3 |
|12 | `|` | true | 3 |
|13 | `*` | true | 3 |
|14 | `d` | true | 3 |
|15 | `e` | true | 3 |
|16 | `|` | false | 3 |
The final count after ignoring asterisks inside pipe pairs is 2.

---

## 5. Complexity Analysis

- **Time:** O(n) – single pass through the string.
- **Space:** O(1) – only a boolean flag and a counter are used.

---

## 6. Follow-Up Questions

1. How would you modify the algorithm if pipes could be nested?
2. Can you solve the problem in a single regular-expression pass?
3. What if the input also contains other special characters that should be ignored?

---

## Key Takeaway

> Toggle a boolean on each `|` to track whether we're inside or outside a pipe pair. Only count `*` when outside.
