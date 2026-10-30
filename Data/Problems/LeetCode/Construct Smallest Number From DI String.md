# 2375. Construct Smallest Number From DI String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-smallest-number-from-di-string](https://leetcode.com/problems/construct-smallest-number-from-di-string)
**Companies:** Amazon, Goldman Sachs, Google

---

## Problem Description
You are given a **0-indexed** string `pattern` of length `n` consisting of the characters `'I'` meaning **increasing** and `'D'` meaning **decreasing**.

A **0-indexed** string `num` of length `n + 1` is created using the following conditions:

- `num` consists of the digits `'1'` to `'9'`, where each digit is used **at most** once.
- If `pattern[i] == 'I'`, then `num[i] < num[i + 1]`.
- If `pattern[i] == 'D'`, then `num[i] > num[i + 1]`.

Return *the lexicographically **smallest** possible string* `num` *that meets the conditions.*

**Constraints:**
- `1 <= pattern.length <= 8`
- `pattern` consists of only the letters `'I'` and `'D'`.

## Examples
```
Example 1:
  Input: pattern = "IIIDIDDD"
  Output: "123549876"
  Explanation:
    At indices 0, 1, 2, and 4 we must have that num[i] < num[i+1].
    At indices 3, 5, 6, and 7 we must have that num[i] > num[i+1].
    Some possible values of num are "245639871", "135749862", and "123849765".
    It can be proven that "123549876" is the smallest possible num that meets the conditions.
    Note that "123414321" is not possible because the digit '1' is used more than once.
```
```
Example 2:
  Input: pattern = "DDD"
  Output: "4321"
  Explanation:
    Some possible values of num are "9876", "7321", and "8742".
    It can be proven that "4321" is the smallest possible num that meets the conditions.
```

## Approach
**Algorithm:** Stack‑based construction (O(n))
Iterate through the pattern, pushing sequential numbers onto a stack. Whenever the current character is `'I'` or the end of the pattern is reached, pop all elements from the stack and append them to the result. This yields the minimal lexicographic number satisfying the constraints.

```text
FUNCTION smallestNumber(pattern):
    SET stack ← []
    SET result ← []
    SET num ← 1
    FOR i ← 0 TO LENGTH(pattern):
        PUSH stack, num
        SET num ← num + 1
        IF i == LENGTH(pattern) OR pattern[i] = 'I':
            WHILE stack IS NOT EMPTY:
                SET digit ← POP stack
                APPEND result WITH STRING(digit)
    RETURN CONCATENATE(result)
```

## Walkthrough
For `pattern = "ID"`:
1. i=0, push 1; pattern[0]='I' → pop → result `"1"`.
2. i=1, push 2; pattern[1]='D' → continue.
3. i=2 (end), push 3; end reached → pop stack (3,2) → result `"132"`.

## Complexity Analysis
- **Time:** O(n) – each number is pushed and popped at most once.
- **Space:** O(n) – stack holds at most `n+1` numbers.

## Follow‑Up Questions
- How would you adapt the algorithm to handle patterns that include the character `'E'` meaning equal?
- Can you generate the *k‑th* smallest number that satisfies the pattern?
- What changes are needed if digits may be reused?

## Key Takeaway
Using a stack to delay output until an increase is required produces the lexicographically smallest number that respects the given increase/decrease pattern.