# 682. Baseball Game

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/baseball-game](https://leetcode.com/problems/baseball-game)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Turing
---

## Problem Description
You are keeping the scores for a baseball game with strange rules. At the beginning of the game, you start with an empty record.

You are given a list of strings `operations`, where `operations[i]` is the `iᵗʰ` operation you must apply to the record and is one of the following:

- An integer `x`.
  - Record a new score of `x`.
- `'+'`.
  - Record a new score that is the sum of the previous two scores.
- `'D'`.
  - Record a new score that is the double of the previous score.
- `'C'`.
  - Invalidate the previous score, removing it from the record.

Return *the sum of all the scores on the record after applying all the operations*.

The test cases are generated such that the answer and all intermediate calculations fit in a **32-bit** integer and that all operations are valid.

**Constraints:**
- `1 ≤ operations.length ≤ 1000`
- `operations[i]` is `"C"`, `"D"`, `"+"`, or a string representing an integer in the range `[-3 * 10⁴, 3 * 10⁴]`.
- For operation `"+"`, there will always be at least two previous scores on the record.
- For operations `"C"` and `"D"`, there will always be at least one previous score on the record.

## Examples
```
Example 1:
  Input: ops = ["5","2","C","D","+"]
  Output: 30
  Explanation:
  "5" - Add 5 to the record, record is now [5].
  "2" - Add 2 to the record, record is now [5, 2].
  "C" - Invalidate and remove the previous score, record is now [5].
  "D" - Add 2 * 5 = 10 to the record, record is now [5, 10].
  "+" - Add 5 + 10 = 15 to the record, record is now [5, 10, 15].
  The total sum is 5 + 10 + 15 = 30.

Example 2:
  Input: ops = ["5","-2","4","C","D","9","+","+"]
  Output: 27
  Explanation:
  "5" - Add 5 to the record, record is now [5].
  "-2" - Add -2 to the record, record is now [5, -2].
  "4" - Add 4 to the record, record is now [5, -2, 4].
  "C" - Invalidate and remove the previous score, record is now [5, -2].
  "D" - Add 2 * -2 = -4 to the record, record is now [5, -2, -4].
  "9" - Add 9 to the record, record is now [5, -2, -4, 9].
  "+" - Add -4 + 9 = 5 to the record, record is now [5, -2, -4, 9, 5].
  "+" - Add 9 + 5 = 14 to the record, record is now [5, -2, -4, 9, 5, 14].
  The total sum is 5 + -2 + -4 + 9 + 5 + 14 = 27.

Example 3:
  Input: ops = ["1","C"]
  Output: 0
  Explanation:
  "1" - Add 1 to the record, record is now [1].
  "C" - Invalidate and remove the previous score, record is now [].
  Since the record is empty, the total sum is 0.
```

## Approach
Use a stack to keep track of valid scores. Iterate through `operations` and apply the rules, pushing or popping as needed. At the end, sum the stack.

```text
FUNCTION calPoints(operations):
    SET stack ← []
    FOR op IN operations:
        IF op == "+":
            SET last ← stack[LEN(stack)-1]
            SET secondLast ← stack[LEN(stack)-2]
            APPEND last + secondLast TO stack
        ELSE IF op == "D":
            APPEND 2 * stack[LEN(stack)-1] TO stack
        ELSE IF op == "C":
            POP stack
        ELSE:
            APPEND INT(op) TO stack
    RETURN SUM(stack)
```

## Walkthrough
| op | stack after op |
|----|----------------|
|"5"|[5]|
|"2"|[5,2]|
|"C"|[5]|
|"D"|[5,10]|
|"+"|[5,10,15]|
Sum = 30.

## Complexity Analysis
- **Time:** O(n) where n = number of operations.
- **Space:** O(n) for the stack (worst case all operations are scores).

## Follow-Up Questions
1. How would you compute the total without storing the entire stack?
2. Can you extend the problem to support an operation that removes the last two scores?
3. What if the operations are streamed and you must output the running total after each step?

## Key Takeaway
A stack efficiently handles the undo and aggregation operations required by the baseball game scoring rules.
