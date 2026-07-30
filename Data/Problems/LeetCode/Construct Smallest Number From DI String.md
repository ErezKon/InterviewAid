# 2375. Construct Smallest Number From DI String

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Goldman Sachs, Google

---

## Problem Description
Given a string `pattern` consisting of characters `'I'` (increase) and `'D'` (decrease), construct the smallest positive integer (without leading zeros) that follows the pattern. The integer is formed by using the digits `1` to `9` exactly once each, in order, such that for each `i`:
- If `pattern[i] == 'I'`, then digit `i` < digit `i+1`.
- If `pattern[i] == 'D'`, then digit `i` > digit `i+1`.

## Examples
- Input: `pattern = "ID"` → Output: `132`. Explanation: 1 < 3 > 2 satisfies the pattern and is the smallest possible.
- Input: `pattern = "III"` → Output: `1234`.

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