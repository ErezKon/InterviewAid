# 3174. Clear Digits

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/clear-digits](https://leetcode.com/problems/clear-digits)
**Companies:** Amazon, Bloomberg, Flexera, Google, Meta

---

## Problem Description
You are given a string `s`.

Your task is to remove **all** digits by doing this operation repeatedly:

- Delete the *first* digit and the **closest** **non-digit** character to its *left*.

Return the resulting string after removing all digits.

**Note** that the operation *cannot* be performed on a digit that does not have any non-digit character to its left.

**Constraints:**
- `1 <= s.length <= 100`
- `s` consists only of lowercase English letters and digits.
- The input is generated such that it is possible to delete all digits.

## Examples
```
Example 1:
  Input: s = "abc"
  Output: "abc"
  Explanation: There is no digit in the string.
```

```
Example 2:
  Input: s = "cb34"
  Output: ""
  Explanation: First, we apply the operation on s[2], and s becomes "c4".
  Then we apply the operation on s[1], and s becomes "".
```

## Approach
**Stack Simulation** – Iterate through characters, pushing letters onto a stack. When a digit is seen and the stack is non‑empty, pop the top letter (the one to delete) and ignore the digit. After processing, join the stack contents.

```text
FUNCTION clearDigits(s):
    SET stack ← []
    FOR c IN s:
        IF c IS DIGIT AND stack NOT EMPTY:
            POP(stack)               // delete previous character
        ELSE:
            PUSH(stack, c)           // keep letter
    RETURN JOIN(stack)
```

## Walkthrough
| Step | Char | Stack after step |
|------|------|------------------|
| 1    | a    | [a] |
| 2    | b    | [a, b] |
| 3    | c    | [a, b, c] |
| 4    | 1    | [a, b]   // pop c |
| 5    | d    | [a, b, d] |
| 6    | 2    | [a, d]   // pop b |

Resulting string: "ad".

## Complexity Analysis
- **Time:** O(n) – each character processed once.
- **Space:** O(n) – stack holds at most n characters.

## Follow‑Up Questions
- How would you adapt the algorithm if digits could delete more than one preceding character?
- Can the solution be performed in‑place without extra stack space?
- What if the input contains uppercase letters or other symbols?

## Key Takeaway
A stack efficiently models the “delete previous character” operation, giving a linear‑time solution.
