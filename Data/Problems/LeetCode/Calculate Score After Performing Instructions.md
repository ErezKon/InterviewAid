# 3522. Calculate Score After Performing Instructions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/calculate-score-after-performing-instructions](https://leetcode.com/problems/calculate-score-after-performing-instructions)
**Companies:** Apple

---

## 1. Problem Description

You are given two arrays, `instructions` and `values`, both of size `n`.

You need to simulate a process based on the following rules:

- You start at the first instruction at index `i = 0` with an initial score of 0.
- If `instructions[i]` is `"add"`:
  - Add `values[i]` to your score.
  - Move to the next instruction `(i + 1)`.
- If `instructions[i]` is `"jump"`:
  - Move to the instruction at index `(i + values[i])` without modifying your score.

The process ends when you either:

- Go out of bounds (i.e., `i < 0 or i >= n`), or
- Attempt to revisit an instruction that has been previously executed. The revisited instruction is not executed.

Return your score at the end of the process.

**Constraints:**
- `n == instructions.length == values.length`
- `1 <= n <= 10^5`
- `instructions[i]` is either `"add"` or `"jump"`.
- `-10^5 <= values[i] <= 10^5`

## 2. Examples

```
Example 1:
  Input: instructions = ["jump","add","add","jump","add","jump"], values = [2,1,3,1,-2,-3]
  Output: 1
  Explanation: Simulate the process starting at instruction 0:
  - At index 0: Instruction is "jump", move to index 0 + 2 = 2.
  - At index 2: Instruction is "add", add values[2] = 3 to your score and move to index 3. Your score becomes 3.
  - At index 3: Instruction is "jump", move to index 3 + 1 = 4.
  - At index 4: Instruction is "add", add values[4] = -2 to your score and move to index 5. Your score becomes 1.
  - At index 5: Instruction is "jump", move to index 5 + (-3) = 2.
  - At index 2: Already visited. The process ends.
```

```
Example 2:
  Input: instructions = ["jump","add","add"], values = [3,1,1]
  Output: 0
  Explanation: Simulate the process starting at instruction 0:
  - At index 0: Instruction is "jump", move to index 0 + 3 = 3.
  - At index 3: Out of bounds. The process ends.
```

```
Example 3:
  Input: instructions = ["jump"], values = [0]
  Output: 0
  Explanation: Simulate the process starting at instruction 0:
  - At index 0: Instruction is "jump", move to index 0 + 0 = 0.
  - At index 0: Already visited. The process ends.
```

## 3. Approach: Simulation — O(n) ✅

```text
FUNCTION calculateScore(instructions, values):
    SET score ← 0
    SET i ← 0
    WHILE 0 <= i < LENGTH(instructions):
        IF instructions[i] == "add":
            SET score ← score + values[i]
            SET i ← i + 1
        ELSE: // "jump"
            SET i ← i + values[i]
    RETURN score
```

## 4. Walkthrough

| Step | i | instruction | action | score |
|------|---|-------------|--------|-------|
| 1 | 0 | add | score += 5 | 5 |
| 2 | 1 | jump (2) | i += 2 → 3 (out) | 5 |

The pointer moves forward until it leaves the array, guaranteeing termination.

## 5. Complexity Analysis

- **Time:** O(n) – each index visited at most once.
- **Space:** O(1) – only constant extra variables.

## 6. Follow-Up Questions
- How would you handle circular jumps that could cause infinite loops?
- Can you extend the simulation to support "multiply" instructions that multiply the score?
- What if the jump values could be negative?

---

## Key Takeaway

> Direct simulation following the instruction pointer. Each index is visited at most once (guaranteed termination).