# 2315. Count Asterisks

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-asterisks](https://leetcode.com/problems/count-asterisks)
**Companies:** Google

---

## 1. Problem Description

Given a string `s` with `|` (pipe) characters forming pairs, count the `*` characters that are **not** between any pair of pipes.

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

**Example 1:**
```
Input: s = "l|*e*et|c**o|*de|"
Output: 2
Explanation: The asterisks between the first and second `|` and between the third and fourth `|` are ignored. The remaining two asterisks are counted.
```

**Example 2:**
```
Input: s = "*|**|*"
Output: 2
Explanation: Only the first and last asterisks are outside any pipe pair.
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
2. Can you solve the problem in a single regular‑expression pass?
3. What if the input also contains other special characters that should be ignored?

---

## Key Takeaway

> Toggle a boolean on each `|` to track whether we're inside or outside a pipe pair. Only count `*` when outside.
